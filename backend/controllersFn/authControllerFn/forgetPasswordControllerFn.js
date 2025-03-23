import { getEmailSubject, verificationCodefn } from "../../email/emailFns.js";
import { sendVerificationEmail } from "../../email/emails.js";
import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { errorHandler } from './../../utils/ApiError.js';

export const forgetPasswordControllerFn = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    next(errorHandler(200, 'User is not found'));
  }

  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  user.resetPasswordToken = verificationToken;
  user.resetPasswordExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

  await user.save();

  try {
    await sendVerificationEmail(
      user.email,
      getEmailSubject("verification"),
      verificationCodefn(verificationToken)
    );
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }

  return res
    .status(201)
    .json(new ApiResponse(200, {user,token:null}, "Verification code sent to your email"));
};
