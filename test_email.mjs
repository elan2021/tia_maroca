import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  console.log("Using EMAIL_USER:", process.env.EMAIL_USER);
  console.log("Using EMAIL_PASS length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Tia Maroca Teste" <${process.env.EMAIL_USER}>`,
    to: "elanbarbosa2017@gmail.com",
    subject: "Teste SMTP Antigravity 🚀",
    text: "Se você recebeu este e-mail, as credenciais SMTP do seu Gmail estão 100% corretas!"
  };

  try {
    console.log("Tentando enviar e-mail de teste...");
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail enviado com sucesso!", info.messageId);
  } catch (error) {
    console.error("Falha ao enviar e-mail:", error);
  }
}

run();
