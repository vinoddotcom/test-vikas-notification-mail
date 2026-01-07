import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  // 🔒 Check authentication
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized - Please login first" },
      { status: 401 }
    );
  }

  const { emails, subject, message } = await req.json();

  if (!emails || !subject || !message) {
    return NextResponse.json(
      { message: "All fields required" },
      { status: 400 }
    );
  }

  try {
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

    return NextResponse.json({
      message: "✅ Email sent successfully",
      sentBy: session.user?.email
    });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { message: "❌ Failed to send email" },
      { status: 500 }
    );
  }
}
