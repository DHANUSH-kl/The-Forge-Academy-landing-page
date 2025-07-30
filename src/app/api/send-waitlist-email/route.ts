// import { NextResponse } from 'next/server';
// import { Resend } from 'resend';
// import { EmailTemplate } from '@/components/email-template';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: Request) {
//   try {
//     const { email } = await req.json();

//     if (!email || !email.includes('@')) {
//       return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
//     }

//     const { data, error } = await resend.emails.send({
//       from: 'The Forge Academy <team@theforgeacademy.in>',
//       to: email,
//       subject: "You're on the waitlist. Here's your next step.",
//       react: EmailTemplate({ userEmail: email }),
//     });

//     if (error) {
//       console.error('Resend error:', error);
//       return NextResponse.json({ success: false, error }, { status: 500 });
//     }

//     return NextResponse.json({
//       success: true,
//       messageId: data?.id,
//       message: 'Email sent successfully',
//     });
//   } catch (err: any) {
//     console.error('API error:', err);
//     return NextResponse.json({ success: false, error: 'Unexpected error', details: err.message }, { status: 500 });
//   }
// }
