import { User } from "../../models/user.model.js";
import { errorHandler } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const passwordresetVerifiyTokenControllerFn = async (req, res, next) => {
  const { code } = req.body;

  if (!code) {
    throw new Error("Code is not avaible");
  }
  const user = await User.findOne({
    resetPasswordToken: code,
  });

  if (!user) {
    next(errorHandler(200, 'user is not found'));
  }

  if (user.resetPasswordExpiresAt && user.resetPasswordExpiresAt < Date.now()) {
    throw new Error("code is expired");
  }

  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;

  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(200, user, "Reset password token verified"));
};
