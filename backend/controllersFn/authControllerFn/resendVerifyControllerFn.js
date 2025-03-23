import { getEmailSubject, verificationCodefn } from "../../email/emailFns.js";
import { errorHandler } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { sendVerificationEmail } from "./../../email/emails.js";

export const resendVerifyControllerFn = async (req, res) => {
  const user = req.user;

  try {
    if (!user) {
      next(errorHandler(200, 'user is not found'));
    }

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
    user.verificationToken = verificationToken;

    await user.save();

    try {
      await sendVerificationEmail(
        user.email,
        getEmailSubject("verification"),
        verificationCodefn(verificationToken)
      );
    } catch (err) {
      res.json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }

    return res
      .status(201)
      .json(new ApiResponse(200, user, "Verification code sent to your email"));
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
