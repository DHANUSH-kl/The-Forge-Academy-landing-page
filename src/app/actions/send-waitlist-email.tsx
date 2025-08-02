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

          <p>You just secured your seat.</p>

          <p>The Forge Academy is about to launch. You’ll be among the first to move when it does.</p>

          <p>This isn’t another list. You’re now part of the earliest circle — where business is built by doing, not watching.</p>

          <p>Save this for launch:</p>

          <p style="font-size: 18px; font-weight: bold; margin: 12px 0;">TFA12 – 12% for those who didn’t wait.</p>

          <p style="font-size: 14px; color: #555;">(Works after we open.)</p>

          <p>Stay alert. You’ll know when it’s time.</p>

          <br/>

          <p>–<br/>Ashish (Founder)<br/>The Forge Academy</p>
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