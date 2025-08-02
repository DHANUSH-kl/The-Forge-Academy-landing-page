'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWaitlistEmail(userEmail: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'THE FORGE ACADEMY <team@theforgeacademy.in>',
      to: [userEmail],
      subject: 'Your Future Just Got Locked In',
      html: `
  <div style="font-family: sans-serif; font-size: 16px; color: #000;">
    <img 
      src="https://res.cloudinary.com/di4nynvj6/image/upload/v1753975612/TheForgeAcademy/Waiting_list_email_card_fc69ut.png" 
      alt="Welcome to The Forge Academy" 
      width="100%" 
      style="max-width: 600px; margin-bottom: 20px;" 
    />

    <p>Hey,</p>

    <p>You’ve just taken a serious step forward.</p>

    <p>Joining The Forge Academy means you’re ready for a place where challenges are expected, and growth is built into every step.</p>

    <p>We’ll be opening our doors soon — and you’ll be one of the first to know. This isn’t just a newsletter. It’s the beginning of something real, with you at the center of it.</p>

    <p>As a thank-you for being early, here’s something we’ve prepared for you:</p>

    <p style="font-size: 18px; font-weight: bold; margin: 12px 0;">TFA12 — 12% off when we launch</p>

    <p style="font-size: 14px; color: #555;">(You’ll be able to use this once we go live.)</p>

    <p>We’ll be in touch with updates. Until then, stay focused — and get ready.</p>

    <p>Welcome to what’s next.</p>

    <p>—<br />The Forge Academy Team<br /><a href="https://www.theforgeacademy.in">www.theforgeacademy.in</a></p>
  </div>
`,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false };
    }

    return { success: true };
  } catch (err) {
    console.error('Send Mail Failed:', err);
    return { success: false };
  }
}