'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWaitlistEmail(userEmail: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'THE FORGE<team@theforgeacademy.in>',
      to: [userEmail],
      subject: 'Your Future Just Got Locked In',
      html: `
        <div style="font-family: sans-serif; font-size: 16px; color: #000;">
          Hi,

  You've been added to The Forge Academy early waitlist.

  We're excited to share more soon. You'll be the first to know when we launch.

  Save this early access code for later: TFA12

  Thanks for joining us.

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