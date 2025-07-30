// import sgMail from '@sendgrid/mail';

// sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// export const sendWaitlistEmail = async (toEmail: string) => {
//   const imageUrl = process.env.SENDGRID_TEMPLATE_IMAGE_URL!;
//   const formLink = process.env.FORGE_FORM_LINK!;

//   const msg = {
//     to: toEmail,
//     from: process.env.SENDGRID_FROM_EMAIL!,
//     subject: 'Welcome to THE FORGE ACADEMY ⚡',
//     html: `
//       <div style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 20px; text-align: center;">
//         <img src="${imageUrl}" alt="Forge Banner" style="max-width: 100%; border-radius: 12px;" />
//         <h1 style="font-size: 24px; margin: 24px 0 12px;">Welcome to the Next Level</h1>
//         <p style="font-size: 16px; line-height: 1.6;">
//           You didn’t just join a waitlist — you claimed your seat in the only academy where failure is mandatory and growth is inevitable.
//         </p>
//         <p style="font-size: 16px; line-height: 1.6;">
//           🚀 You now have an exclusive 12% discount code:
//           <br><strong style="font-size: 18px;">TFA12</strong> <br>
//           (Valid after launch)
//         </p>
//         <a href="${formLink}" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #fff; color: #000; text-decoration: none; border-radius: 8px; font-weight: bold;">
//           Apply to Enter
//         </a>
//         <p style="margin-top: 24px; font-size: 14px; color: #888;">– The Forge Academy Team</p>
//       </div>
//     `,
//   };

//   await sgMail.send(msg);
// };
