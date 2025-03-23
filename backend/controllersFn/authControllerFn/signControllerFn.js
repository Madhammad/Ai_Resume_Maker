
import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { errorHandler } from './../../utils/ApiError.js';

export const signControllerFn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(200, 'All fields are required'))
  }

  const user = await User.findOne({ email, isVerified: true });

  if (!user) {
    return next(errorHandler(200, 'User not found or not verified'));
  }

  const checkPassword = await user.isPasswordCorrect(password);

  if (!checkPassword) {
    return next(errorHandler(200, 'Invalid credentials'));
  }

  const token = await user.generateAccessToken();


  res.status(200).json(new ApiResponse(200, { token, user }, "user sign in successfully"))
};
