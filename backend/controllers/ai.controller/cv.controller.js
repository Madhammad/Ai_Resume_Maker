
import { CV } from "../../models/cv.model.js";

import { errorHandler } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { deleteoldCloudinaryImage, uploadOnCloudinary } from "../../utils/cloudinary.config.js";




export const createCVcontroller = async (req, res, next) => {
  try {
    const projectImagePath = req.file?.path;

    let cloudnaryRes; // Declare it outside

    if (projectImagePath) {
      cloudnaryRes = await uploadOnCloudinary(projectImagePath, "cvprofileImage");

      if (!cloudnaryRes) {
        return next(errorHandler(400, "cloudinary image upload error"));
      }
    }

    const cvData = {
      personalInfo: JSON.parse(req.body.personalInfo),
      education: JSON.parse(req.body.education),
      certificates: JSON.parse(req.body.certificates),
      skills: JSON.parse(req.body.skills),
      projects: JSON.parse(req.body.projects),
      experience: JSON.parse(req.body.experience),
      languages: JSON.parse(req.body.languages),
      summary: req.body.summary,
      cvtemplate: req.body.cvtemplate.charAt(0) + req.body.cvtemplate.slice(1).toLowerCase(),
      color: JSON.parse(req.body.color),
      cvprojectImage: cloudnaryRes
        ? {
          secure_url: cloudnaryRes.secure_url,
          public_id: cloudnaryRes.public_id,
        }
        : undefined,
      user: req.user._id
    };

    const newCV = new CV(cvData);
    await newCV.save();

    res.status(200).json(new ApiResponse(200, { newCV }, "CV created successfully"));

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}



export const cvcontroller = async (req, res, next) => {
  try {
    const cv = await CV.findById(req.params.cvId);

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    res
      .status(201)
      .json(new ApiResponse(200, { cv }, "CV is successfully fetched"));
  } catch (error) {
    console.log(error);
    return next(errorHandler(400, 'cv controller error'));
  }
}

export const getUserCVs = async (req, res) => {
  try {
    const cvs = await CV.find({ user: req.user._id });
    res
      .status(201)
      .json(new ApiResponse(200, { cvs }, "CV is successfully fetched"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const deleteCVcontroller = async (req, res, next) => {
  try {
    const cv = await CV.findById(req.params.CVId);

    if (!cv) {
      return next(errorHandler(404, "project not found"))
    }

    if (!req.user.isAdminRole && cv.user.toString() !== req.user._id.toString()) {
      return next(errorHandler(403, "Unauthorized action"))
    };

    try {
      await deleteoldCloudinaryImage(cv?.cvprojectImage?.public_id)

    } catch (error) {
      console.error("Error deleting project image:", error);
      return next(errorHandler(500, "Failed to delete project image"))
    }

    await CV.deleteOne({ _id: cv._id });

    res.status(201).
      json(new ApiResponse(200, {}, "project is delete successfully"));
  } catch (error) {
    console.error("Error deleting project:", error)
    next(errorHandler(403, "Project delete error"));
  }
}


export const getAllcvController = async (req, res) => {

  try {
    const cvs = await CV.find();

    if (!cvs) {
      return res.status(404).json({ message: "CV not found" });
    }

    res
      .status(201)
      .json(new ApiResponse(200, { cvs }, "CV is successfully fetched"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }



}