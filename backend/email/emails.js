import { transporter } from "./email.config.js";

export const sendVerificationEmail = async (email, subj, HTMLfn) => {
  const sender = '"hammad-auth" <hammad.naqiali.hr@gmail.com>';

  try {
    const res = await transporter.sendMail({
      from: sender,
      to: email,
      subject: subj,
      html: HTMLfn,
    });

    console.log("email send successfully", res);
  } catch (error) {
    throw new Error(`Error sending verifition email:${error}`);
  }
};
