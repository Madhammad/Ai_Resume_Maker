// User.model.js

import mongoose from "mongoose";

// CV.model.js
const cvSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
    linkdin: String,
    headline: String
  },
  summary: {
    type: String
  },
  experience: [{
    jobTitle: String,
    company: String,
    duration: String,
    details: String
  }],
  projects: [{
    title: String,
    duration: String,
    details: String
  }],
  education: [{
    degree: String,
    institution: String,
    year: String
  }],
  certificates: [{
    name: String,
    institution: String,
    duration: String,
    year: String
  }],
  skills: [{
    name: String,
    level: Number
  }],

  languages: [{
    name: String,
    proficiency: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Beginner"
    }
  }],
  cvtemplate: {
    type: String,
    enum: ["modern", "classic", "professional", "creative"],
    default: "classic"
  },
  color: {
    bgcolor: String,
    textcolor: String
  },
  cvprojectImage: {
    secure_url: {
      type: String, // cloudinary url
    },
    public_id: {
      type: String, // cloudinary url
      default: null
    },
  },

  generatedContent: String,
  createdAt: { type: Date, default: Date.now }
});

export const CV = mongoose.model("CV", cvSchema);