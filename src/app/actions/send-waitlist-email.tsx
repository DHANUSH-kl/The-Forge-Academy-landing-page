'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWaitlistEmail(userEmail: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'THE FORGE Academy<team@theforgeacademy.in>',
      to: [userEmail],
      subject: 'Welcome to The Forge Waitlist!',
      html: `
        <div style="font-family: sans-serif; font-size: 16px; color: #000;">
      <p>Hey Dhanush,</p>
      <p>You’ve made it to the waitlist! Thanks for joining early.</p>
      <p>If you have any questions or want to share what you’re excited to learn, just hit reply. I read every response personally.</p>
      <p>Excited for launch,<br/>Dhanu<br/>Founder,<br/>The Forge Academy</p>
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