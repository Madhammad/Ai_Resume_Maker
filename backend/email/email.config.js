import nodemailer from "nodemailer";


export const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "hammad.naqiali.hr@gmail.com",
        pass: "egny bmce heck jmzv",
      },
    });

    