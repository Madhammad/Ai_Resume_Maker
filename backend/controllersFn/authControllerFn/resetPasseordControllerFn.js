import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { errorHandler } from './../../utils/ApiError.js';

export const resetPasseordControllerFn = async (req, res, next) => {
  const { password } = req.body;

  const user = await User.findById(req.params.userId);

  if (!user) {
    next(errorHandler(200, 'User not found'));}

  if (password === user.password) {
    throw new Error("New password should be change");
  }

  user.password = password;

  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(200, user, "user password reset"));
};
