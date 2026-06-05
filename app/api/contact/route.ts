import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO_EMAIL || user;

    // Check which SMTP env vars are present (do not log secrets)
    const missing: string[] = [];
    if (!host) missing.push('SMTP_HOST');
    if (!user) missing.push('SMTP_USER');
    if (!pass) missing.push('SMTP_PASS');

    if (missing.length > 0) {
      console.warn('Contact API missing env vars:', missing.join(', '));
      // Fallback: save locally so enquiries are not lost
      try {
        const tmpDir = os.tmpdir();
        const submissionsPath = path.join(tmpDir, 'rvlabs-submissions.jsonl');
        const entry = { name, email, message, date: new Date().toISOString(), fallback: true };
        fs.appendFileSync(submissionsPath, JSON.stringify(entry) + '\n', 'utf8');
        console.warn('Saved fallback submission to', submissionsPath);
        return new Response(JSON.stringify({ ok: true, savedLocally: true, missing, savedPath: submissionsPath }), { status: 200 });
      } catch (fsErr: any) {
        console.error('Failed to save submission locally', fsErr);
        return new Response(JSON.stringify({ error: 'Email not configured and failed to save locally', missing, fsError: fsErr?.message }), { status: 500 });
      }
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: { user, pass },
    });

    const subject = `RVLabs website inquiry from ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const html = `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br/>')}</p>`;

    await transporter.sendMail({
      from: user,
      to,
      subject,
      text,
      html,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    console.error('Contact API error', err);
    return new Response(JSON.stringify({ error: err?.message || 'Server error' }), { status: 500 });
  }
}
