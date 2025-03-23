import { ApiResponse } from "../../utils/ApiResponse.js";

export const signOutControllerFn = async (_, res,next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json(new ApiResponse(200, {}, "User sign Out Successfully"));
  } catch(err) {
    res.json({
      message : err.message || err ,
      error : true,
      success : false,
  })
  }
};
