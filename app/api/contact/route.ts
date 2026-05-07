import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nome, e-mail e mensagem são obrigatórios." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp0001.neo.space",
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10_000,
      greetingTimeout:   10_000,
      socketTimeout:     10_000,
    });

    await transporter.sendMail({
      from:    `"Site Vanessa Ortega" <${process.env.SMTP_USER}>`,
      to:      process.env.CONTACT_TO,
      replyTo: email,
      subject: `Novo contato pelo site – ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#744e60">Novo contato – vanessaortega.com.br</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Telefone:</strong> ${phone || "—"}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
          <p><strong>Mensagem:</strong></p>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });

  } catch (err: unknown) {
    const raw     = err instanceof Error ? err.message : String(err);
    const isAuth  = raw.includes("535") || raw.includes("authentication");
    const isCert  = raw.includes("certificate") || raw.includes("self-signed");
    const isConn  = raw.includes("ECONNREFUSED") || raw.includes("ETIMEDOUT");

    let userMsg = "Não foi possível enviar a mensagem. Tente novamente.";
    if (isAuth)  userMsg = "Falha de autenticação no servidor de e-mail. Verifique as credenciais SMTP.";
    if (isCert)  userMsg = "Problema de certificado SSL no servidor de e-mail.";
    if (isConn)  userMsg = "Não foi possível conectar ao servidor de e-mail.";

    console.error("[contact/route] SMTP error:", raw);

    return NextResponse.json({ error: userMsg }, { status: 500 });
  }
}
