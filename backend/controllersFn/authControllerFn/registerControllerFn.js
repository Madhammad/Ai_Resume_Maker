import { User } from "../../models/user.model.js";
import { sendVerificationEmail } from "./../../email/emails.js";
import { getEmailSubject, verificationCodefn } from "./../../email/emailFns.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { errorHandler } from './../../utils/ApiError.js';

export const registerControllerFn = async (req, res, next) => {
  const { username, email, password } = req.body;

  if ([email, username, password].some((field) => field?.trim() === "")) {
    next(errorHandler(200, 'All fields are required'))
  }

  if (/\s/.test(username)) {
    return next(errorHandler(200, "Username cannot contain spaces"));
  }

  const user = await User.findOne({ $or: [{ username }, { email }], });

  const token = await user?.generateAccessToken();

  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();



  if (user && user.isVerified) {
    next(errorHandler(200, 'User already exist'))
  }

  // user avalible  but not verify
  if (user && !user.isVerified) {
    try {
      user.username = username;
      user.password = password;
      user.verificationToken = verificationToken;
      user.verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

      await user.save();

      try {
        await sendVerificationEmail(
          user.email,
          getEmailSubject("verification"),
          verificationCodefn(verificationToken)
        );
      } catch (error) {
        res.json({
          message: err.message || error,
          error: true,
          success: false,
        });
      }


      return res
        .status(200)
        .json(
          new ApiResponse(200, { user, token }, "Verification code sent to your email")
        );
    } catch (error) {
      res.json({
        message: error.message || error,
        error: true,
        success: false,
      });
    }
  }

  //new user creat

  const userNew = new User({
    email,
    username,
    password,
    verificationToken,
    verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  });

  await userNew.save();

  const newToken = await userNew?.generateAccessToken();

  await sendVerificationEmail(
    userNew.email,
    getEmailSubject("verification"),
    verificationCodefn(verificationToken)
  );



  res
    .status(201)
    .cookie("access_token", token, {
      httpOnly: true,
      secure: true,
    })
    .json(
      new ApiResponse(
        200,
        { user: userNew, token: newToken },
        "user are signup Successfully verify token sent to your Email  "
      )
    );
};
