import { getEmailSubject, wellcomeEmailFn } from "../../email/emailFns.js";
import { sendVerificationEmail } from "../../email/emails.js";
import { User } from "../../models/user.model.js";
import { errorHandler } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const verifyControllerFn = async (req, res,next) => {
  const { code } = req.body;

  if (!code) {
    return next(errorHandler(200, 'Code is not correct'));
  }

  const user = await User.findOne({
    verificationToken: code,
  });

  if (!user) {
    return next(errorHandler(200, 'User not found'));
  }

  if (
    user?.verificationTokenExpiresAt &&
    user.verificationTokenExpiresAt < Date.now()
  ) {
    return next(errorHandler(200, 'User verification code is expired'));
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;

  await user.save();

  try {
    await sendVerificationEmail(
      user.email,
      getEmailSubject("welcome"),
      wellcomeEmailFn(user.name)
    );
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }

  return res.status(201).json(new ApiResponse(200, {user}, "user are verified"));
};
