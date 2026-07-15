import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  console.log("Starting SMTP self-test...");
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Tia Maroca Teste" <${process.env.EMAIL_USER}>`,
    to: "maraoliveiraprof@gmail.com",
    subject: "Teste SMTP Antigravity Direto da Vercel 🚀",
    text: "Se você recebeu este e-mail, as credenciais do Gmail estão configuradas perfeitamente na Vercel!"
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json({
      status: "success",
      message: "E-mail enviado com sucesso!",
      messageId: info.messageId,
      envelope: info.envelope
    });
  } catch (error: any) {
    console.error("SMTP error in test route:", error);
    return NextResponse.json({
      status: "error",
      message: error.message || "Erro desconhecido",
      stack: error.stack
    }, { status: 500 });
  }
}
