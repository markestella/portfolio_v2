import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const normalizeWhitespace = (value: string) => value.trim().replace(/\s+/g, ' ');

type SmtpConfig =
  | {
      configured: false;
      missing: string[];
    }
  | {
      configured: true;
      host: string;
      port: number;
      secure: boolean;
      user: string;
      pass: string;
      fromEmail: string;
      fromName: string;
      contactEmail: string;
      siteUrl: string;
      autoReplyEnabled: boolean;
    };

const getRequiredEnv = (key: string) => {
  const value = process.env[key]?.trim();
  return value ? value : null;
};

const getSmtpConfig = (): SmtpConfig => {
  const host = getRequiredEnv('SMTP_HOST');
  const user = getRequiredEnv('SMTP_USER');
  const pass = getRequiredEnv('SMTP_PASS');
  const missing = [
    { key: 'SMTP_HOST', value: host },
    { key: 'SMTP_USER', value: user },
    { key: 'SMTP_PASS', value: pass },
  ]
    .filter(({ value }) => !value)
    .map(({ key }) => key);

  if (missing.length > 0 || !host || !user || !pass) {
    return { configured: false, missing };
  }

  const port = Number.parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const fromEmail = process.env.SMTP_FROM?.trim() || user;
  const fromName = process.env.SMTP_FROM_NAME?.trim() || 'Mark Estella';
  const contactEmail = process.env.CONTACT_EMAIL?.trim() || user;
  const siteUrl = process.env.CONTACT_SITE_URL?.trim() || 'https://mckbyte.com';
  const autoReplyEnabled = process.env.AUTO_REPLY_ENABLED !== 'false';

  return {
    configured: true,
    host,
    port,
    secure,
    user,
    pass,
    fromEmail,
    fromName,
    contactEmail,
    siteUrl,
    autoReplyEnabled,
  };
};

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const name = normalizeWhitespace(body.name || '');
    const email = normalizeWhitespace(body.email || '');
    const subject = normalizeWhitespace(body.subject || '');
    const message = (body.message || '').trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (name.length > 120 || subject.length > 160 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Message is too long.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    const smtp = getSmtpConfig();
    if (!smtp.configured) {
      console.error(`Missing contact form environment variables: ${smtp.missing.join(', ')}`);

      return NextResponse.json(
        { error: 'Contact form is not configured.' },
        { status: 500 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);
    const brandedFrom = `"${smtp.fromName}" <${smtp.fromEmail}>`;
    const conversationSubject = `Portfolio Contact: ${subject}`;

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });

    await transporter.sendMail({
      from: brandedFrom,
      to: smtp.contactEmail,
      replyTo: `"${name}" <${email}>`,
      subject: conversationSubject,
      text: `New portfolio contact

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
`,
      html: `
        <div style="font-family: 'Courier New', monospace; background: #0d1117; color: #e6edf3; padding: 20px; border-radius: 8px;">
          <div style="border-bottom: 1px solid #30363d; padding-bottom: 10px; margin-bottom: 20px;">
            <span style="color: #3fb950;">*</span>
            <span style="color: #d29922;">*</span>
            <span style="color: #f85149;">*</span>
            <span style="margin-left: 10px; color: #8b949e;">new_message.md</span>
          </div>

          <p style="color: #3fb950;">## New Portfolio Contact</p>

          <table style="margin: 20px 0; color: #e6edf3;">
            <tr>
              <td style="color: #39c5cf; padding-right: 10px;">name:</td>
              <td style="color: #56d364;">"${safeName}"</td>
            </tr>
            <tr>
              <td style="color: #39c5cf; padding-right: 10px;">email:</td>
              <td style="color: #56d364;">"${safeEmail}"</td>
            </tr>
            <tr>
              <td style="color: #39c5cf; padding-right: 10px;">subject:</td>
              <td style="color: #56d364;">"${safeSubject}"</td>
            </tr>
          </table>

          <p style="color: #bc8cff;">### Message:</p>
          <div style="background: #161b22; border: 1px solid #30363d; border-radius: 6px; padding: 15px; margin-top: 10px;">
            <p style="color: #8b949e; white-space: pre-wrap;">${safeMessage}</p>
          </div>

          <p style="color: #6e7681; margin-top: 20px; font-size: 12px;">
            Sent from ${escapeHtml(smtp.siteUrl)}
          </p>
        </div>
      `,
    });

    if (smtp.autoReplyEnabled) {
      await transporter.sendMail({
        from: brandedFrom,
        to: `"${name}" <${email}>`,
        replyTo: smtp.contactEmail,
        subject: `Re: ${subject}`,
        text: `Hi ${name},

Thanks for reaching out through my portfolio. I received your message and will get back to you as soon as I can.

Your message:
Subject: ${subject}

${message}

Best,
Mark Estella
${smtp.siteUrl}
`,
        html: `
          <div style="font-family: Arial, sans-serif; background: #f7f4ed; color: #1a1311; padding: 24px; border-radius: 8px; line-height: 1.6;">
            <p>Hi ${safeName},</p>
            <p>Thanks for reaching out through my portfolio. I received your message and will get back to you as soon as I can.</p>
            <div style="border-left: 4px solid #d4a847; padding-left: 16px; margin: 20px 0;">
              <p style="margin: 0 0 8px;"><strong>Subject:</strong> ${safeSubject}</p>
              <p style="white-space: pre-wrap; margin: 0;">${safeMessage}</p>
            </div>
            <p>Best,<br />Mark Estella</p>
            <p style="font-size: 12px; color: #6b625b;">${escapeHtml(smtp.siteUrl)}</p>
          </div>
        `,
      });
    }

    return NextResponse.json(
      { message: 'Message sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message.' },
      { status: 500 }
    );
  }
}
