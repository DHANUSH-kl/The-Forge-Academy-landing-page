'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWaitlistEmail(userEmail: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: '<team@theforgeacademy.in>',
      to: [userEmail],
      subject: 'hey there ',
      html: `
        <div style="font-family: sans-serif; font-size: 16px; color: #000;">
          

          <p>Hey,</p>

          <p>You just secured your seat.</p>

         
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