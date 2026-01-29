import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, subject, message } = body;

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

    // Create transporter using SMTP
    // Configure these environment variables in your Vercel project
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'mark.estella09@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
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
              <td style="color: #56d364;">"${name}"</td>
            </tr>
            <tr>
              <td style="color: #39c5cf; padding-right: 10px;">email:</td>
              <td style="color: #56d364;">"${email}"</td>
            </tr>
            <tr>
              <td style="color: #39c5cf; padding-right: 10px;">subject:</td>
              <td style="color: #56d364;">"${subject}"</td>
            </tr>
          </table>
          
          <p style="color: #bc8cff;">### Message:</p>
          <div style="background: #161b22; border: 1px solid #30363d; border-radius: 6px; padding: 15px; margin-top: 10px;">
            <p style="color: #8b949e; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #6e7681; margin-top: 20px; font-size: 12px;">
            Sent from markestella.dev portfolio
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

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
