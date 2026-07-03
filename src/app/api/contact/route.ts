import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { randomUUID } from 'crypto';

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

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const name = normalizeWhitespace(body.name || '');
    const email = normalizeWhitespace(body.email || '');
    const subject = normalizeWhitespace(body.subject || '');
    const message = (body.message || '').trim();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const requiredEnvVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
    const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

    if (missingEnvVars.length > 0) {
      console.error(`Missing contact form environment variables: ${missingEnvVars.join(', ')}`);

      return NextResponse.json(
        { error: 'Contact form is not configured' },
        { status: 500 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;
    const contactEmail = process.env.CONTACT_EMAIL || 'mark.estella09@gmail.com';
    const conversationSubject = `Portfolio Contact from ${name}: ${subject}`;
    const messageIdDomain = fromEmail?.split('@')[1] || 'markestella.dev';
    const autoReplyMessageId = `<portfolio-${randomUUID()}@${messageIdDomain}>`;

    // Create transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: fromEmail,
      to: contactEmail,
      replyTo: email,
      subject: conversationSubject,
      inReplyTo: autoReplyMessageId,
      references: [autoReplyMessageId],
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
        <div style="font-family: 'Courier New', monospace; background: #0d1117; color: #e6edf3; padding: 20px; border-radius: 8px;">
          <div style="border-bottom: 1px solid #30363d; padding-bottom: 10px; margin-bottom: 20px;">
            <span style="color: #3fb950;">●</span>
            <span style="color: #d29922;">●</span>
            <span style="color: #f85149;">●</span>
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
            Sent from markestella.dev portfolio
          </p>
        </div>
      `,
    });

    await transporter.sendMail({
      from: fromEmail,
      to: email,
      replyTo: contactEmail,
      subject: conversationSubject,
      messageId: autoReplyMessageId,
      text: `Hi ${name},

Thanks for reaching out through my portfolio. I received your message and will get back to you as soon as I can.

Your message:
Subject: ${subject}

${message}

Best,
Mark Estella
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
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
