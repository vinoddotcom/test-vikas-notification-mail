
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { emails, subject, message } = await req.json();
  if (!emails || !subject || !message) {
    return NextResponse.json({ message: "All fields required" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: emails,
    subject,
    text: message,
  });

  return NextResponse.json({ message: "Email sent successfully" });
}
