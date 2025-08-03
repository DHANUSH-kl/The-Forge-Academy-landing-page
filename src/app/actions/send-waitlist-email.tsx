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
  

  <p>Hey</p>

  <p>
    You’ve secured your spot on The Forge Academy’s waitlist. We’re building something special—by and for people who want to <strong>create, learn, and lead</strong> from day one.
  </p>

  <p>
    When we launch, you’ll be in the first circle to hear from us. I’d love to know: <em>What are you hoping to create or learn with us?</em> Just hit reply—your feedback shapes what we build next.
  </p>

  <p>
    For launch, here’s something to keep: <br/>
    <span style="font-size: 18px; font-weight: bold; margin: 12px 0; display:inline-block;">TFA12 — 12% Early Access Bonus</span><br/>
    (This can be used for a special advantage once we open.)
  </p>

  <p style="font-size: 14px; color: #555;">If this lands outside your main inbox, drag it to Primary and add me to your contacts—then you’ll never miss an update.</p>

  <br/>

 
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