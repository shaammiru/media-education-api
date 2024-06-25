import nodemailer from "nodemailer";

const send = async (option: any) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "Edutrain Support<support@edutrain.uinsgd.ac.id>",
    to: option.email,
    subject: option.subject,
    html: option.htmlMessage,
  });
};

export default {
  send,
};
