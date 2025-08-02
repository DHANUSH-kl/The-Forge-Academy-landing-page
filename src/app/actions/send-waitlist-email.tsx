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

          <p>You just made one of the boldest moves of your life.</p>

          <p>You didn’t just join a waiting list — you claimed your seat in the academy where failure is mandatory, and growth is inevitable.</p>

          <p>The launch of THE FORGE ACADEMY is coming soon, and when it happens, you’ll be among the first to know. You’re not just a subscriber — you’re one of the first believers of a revolution that will change how business is learned and built.</p>

          <p>Here’s your first reward for something you truly deserve for making this bold step:</p>

          <p style="font-size: 18px; font-weight: bold; margin: 12px 0;">TFA12 — 12% early supporter benefit</p>

          <p style="font-size: 14px; color: #555;">(Valid only after our launch.)</p>

          <p>When the doors open, you’ll be ahead of everyone else. Until then, stay sharp, stay ready. The future isn’t waiting — and neither should you.</p>

          <p>Welcome to the next level.</p>
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
