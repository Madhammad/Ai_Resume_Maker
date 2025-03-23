import { Router } from "express";
import {
  deleteUserController,
  forgetPasswordController,
  passworChangeController,
  passwordresetVerifiyTokenController,
  registerController,
  resendVerifyController,
  resetPasseordController,
  signInController,
  signOutController,
  updateUserController,
  verifyController,
} from "../controllers/auth.controllers.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerController);

router.post("/verifyToken",jwtVerify, verifyController);
router.post("/signIn", signInController);
router.post("/resendVerifyToken", jwtVerify, resendVerifyController);

router.put("/updateUser/:userId", updateUserController);

router.delete("/deleteUser/:userId", jwtVerify, deleteUserController);

router.put("/passwordChange/:userId", passworChangeController);

router.post("/forgetPassword", forgetPasswordController);
router.post(
  "/passwordresetVerifiyToken/:userId",
  passwordresetVerifiyTokenController
);
router.post("/resetPassword/:userId", resetPasseordController);

router.post("/signOut", signOutController);

export default router;
