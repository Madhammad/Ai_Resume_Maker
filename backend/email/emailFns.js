import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELLCOME_EMAIL,
} from "./emailTemplete.js";

export const getEmailSubject = (emailType) => {
  switch (emailType) {
    case "verification":
      return "Verification Email";
    case "welcome":
      return "Welcome to Our App";
    case "password-reset":
      return "Reset Password Code";
    case "password-reset-confirmation":
      return "Your Password Has Been Reset";
    default:
      return "No Subject";
  }
};

export const verificationCodefn = (verificationToken) => {
  return VERIFICATION_EMAIL_TEMPLATE.replace(
    "{verificationCode}",
    verificationToken
  );
};

export const wellcomeEmailFn = (name) => {
  return WELLCOME_EMAIL.replace("{name}", name);
};
