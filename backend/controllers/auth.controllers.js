import { deleteUserControllerFn } from "../controllersFn/authControllerFn/deleteUserControllerFn.js";
import { registerControllerFn } from "../controllersFn/authControllerFn/registerControllerFn.js";
import { resendVerifyControllerFn } from "../controllersFn/authControllerFn/resendVerifyControllerFn.js";
import { signControllerFn } from "../controllersFn/authControllerFn/signControllerFn.js";
import { signOutControllerFn } from "../controllersFn/authControllerFn/signOutControllerFn.js";

import { verifyControllerFn } from "../controllersFn/authControllerFn/verifyControllerFn.js";
import { updateUserControllerFn } from "./../controllersFn/authControllerFn/updateUserControllerFn.js";
import { passworChangeControllerFn } from "./../controllersFn/authControllerFn/passworChangeControllerFn.js";
import { forgetPasswordControllerFn } from "../controllersFn/authControllerFn/forgetPasswordControllerFn.js";
import { passwordresetVerifiyTokenControllerFn } from "../controllersFn/authControllerFn/passwordresetVerifiyTokenControllerFn.js";
import { resetPasseordControllerFn } from "../controllersFn/authControllerFn/resetPasseordControllerFn.js";

export const registerController = async (req, res, next) => {
  try {
    registerControllerFn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const verifyController = async (req, res, next) => {
  try {
    verifyControllerFn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const signInController = async (req, res, next) => {
  try {
    signControllerFn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const resendVerifyController = async (req, res, next) => {
  try {
    resendVerifyControllerFn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (req, res, next) => {
  try {
    updateUserControllerFn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (req, res, next) => {
  try {
    deleteUserControllerFn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const signOutController = async (req, res, next) => {
  try {
    signOutControllerFn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const passworChangeController = async (req, res, next) => {
  try {
    passworChangeControllerFn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const forgetPasswordController = async (req, res, next) => {
  try {
    forgetPasswordControllerFn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const resetPasseordController = async (req, res, next) => {
  try {
    resetPasseordControllerFn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const passwordresetVerifiyTokenController = async (req, res, next) => {
  try {
    passwordresetVerifiyTokenControllerFn(req, res, next);
  } catch (error) {
    next(error);
  }
};
