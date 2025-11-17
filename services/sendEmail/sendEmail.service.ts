import nodemailer from "nodemailer";
import { BodySendMailRequest } from "@/models/bodySendMailRequest.model";

const trasnporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmailService = async (body: BodySendMailRequest) => {
  try {
    await trasnporter.sendMail({
      from: body.from,
      to: body.to,
      subject: body.subject,
      text: body.content,
    });
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    return { success: false, message: error };
  }
};
