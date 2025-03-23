import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/ApiError.js";


export const jwtVerify = async (req, _, next) => {
  const token = req.headers["authorization"]

  if (!token) {
    return next(errorHandler(400, 'Authorization header is missing'));
  }

  const bearerToken = token.split(' ')[1]

  // console.log(bearerToken)

  if (!bearerToken) {
    return next(errorHandler(400, 'Token is not avaible'));
  }


  const decoded = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET);


  if (!decoded) {
    return next(errorHandler(400, 'Decoded User not find'))
  }

  // console.log("decoded", decoded)

  const user = await User.findById(decoded._id);

  // console.log("user", user._id)

  req.user = user
  next();

};
