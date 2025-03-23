import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const passworChangeControllerFn = async (req, res) => {
  const { oldPassword, password } = req.body;

  const user = await User.findById(req.params.userId);

  if (!user) {
    throw new Error("Already user exits.");
  }

  const checkPassword = await user.isPasswordCorrect(oldPassword);

  if (!checkPassword) {
    throw new Error("password is not correct");
  }

  user.password = password;

  await user.save();

  res
    .status(201)
    .json(new ApiResponse(200, {}, "user password is successfully update"));
};
