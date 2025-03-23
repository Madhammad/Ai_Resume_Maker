import { errorHandler } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { User } from "./../../models/user.model.js";

export const updateUserControllerFn = async (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new Error("All field required");
  }

  // if (!req.user.isVerified) {
  //   throw new ApiError(400, "User is not verified");
  // }
try {
  
    const user = await User.findByIdAndUpdate(
      req.params?.userId,
      {
        $set: {
          name,
          email,
        },
      },
      { new: true }
    ).select("-password");
  
    return res
      .status(200)
      .json(new ApiResponse(200, user, "Account details updated successfully"));
} catch (error) {
  res.json({
    message : error.message || error ,
    error : true,
    success : false,
})
}
};
