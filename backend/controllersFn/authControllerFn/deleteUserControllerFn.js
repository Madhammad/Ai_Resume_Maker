import { User } from "../../models/user.model.js";
import { errorHandler } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const deleteUserControllerFn = async (req, res ) => {
  try {
    await User.findByIdAndDelete(req.params.userId);

    res
      .status(200)
      .clearCookie("access_token")
      .json(new ApiResponse(200, {}, "User delete successfully"));
  } catch(err) {
    res.json({
      message : err.message || err  ,
      error : true,
      success : false,
  })
  }
};
