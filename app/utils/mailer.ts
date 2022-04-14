import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export type SendEmailOptions = {
  to: string,
  subject: string,
  text: string,
}

export async function sendEmail({
  to,
  subject,
  text
}: SendEmailOptions) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  let info: SMTPTransport.SentMessageInfo = await transporter.sendMail({
    from: "Syntax <test@example.com>",
    to,
    subject,
    text,
  });

  const messageStatus = nodemailer.getTestMessageUrl(info);
  console.log("Message sent: %s", messageStatus);
  return messageStatus;
}
