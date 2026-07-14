import nodemailer from "nodemailer"

export async function sendWelcomeEmail(to: string, password: string, packTitle: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: `"Tia Maroca" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Seu acesso ao pack ${packTitle} chegou! 🎉`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #6C5CE7;">Olá! Bem-vinda(o) à Área de Membros Tia Maroca!</h2>
        <p>Seu pagamento foi confirmado e seu acesso ao <strong>${packTitle}</strong> já está liberado.</p>
        <p>Aqui estão os seus dados de acesso:</p>
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Link de Acesso:</strong> <a href="https://tia-maroca.vercel.app/membros/login" style="color: #6C5CE7;">Clicar aqui para acessar</a></p>
          <p style="margin: 10px 0 0 0;"><strong>E-mail:</strong> ${to}</p>
          <p style="margin: 10px 0 0 0;"><strong>Senha:</strong> ${password}</p>
        </div>
        <p>Por favor, guarde essa senha com segurança. Você pode usar ela para acessar suas futuras compras também!</p>
        <p>Abraços,<br>Equipe Tia Maroca</p>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

export async function sendPackAddedEmail(to: string, packTitle: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: `"Tia Maroca" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Novo pack liberado: ${packTitle} 🎉`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #6C5CE7;">Pagamento Confirmado!</h2>
        <p>O pacote <strong>${packTitle}</strong> foi adicionado à sua conta na Área de Membros Tia Maroca com sucesso.</p>
        <p>Basta fazer login com seu e-mail e senha de sempre para acessar o novo material.</p>
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Link de Acesso:</strong> <a href="https://tia-maroca.vercel.app/membros/login" style="color: #6C5CE7;">Clicar aqui para acessar</a></p>
          <p style="margin: 10px 0 0 0;"><strong>E-mail:</strong> ${to}</p>
        </div>
        <p>Abraços,<br>Equipe Tia Maroca</p>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}
