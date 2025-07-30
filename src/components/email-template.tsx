import * as React from 'react';

interface EmailTemplateProps {
  userEmail: string;
}

export function EmailTemplate({ userEmail }: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'sans-serif', background: '#000', color: '#fff', padding: '40px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <img src="https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png" alt="Welcome" style={{ maxWidth: '100%', borderRadius: '8px' }} />
        <h2 style={{ marginTop: '30px', color: '#fff', fontSize: '24px' }}>
          You&apos;re officially on the waitlist for <span style={{ color: '#e11d48' }}>The Forge Academy</span>.
        </h2>
        <p style={{ marginTop: '20px', fontSize: '16px', color: '#ccc' }}>
          To claim your launch bonus and secure your access faster, click the button below:
        </p>
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <a href="https://theforgeacademy.in/apply"
            style={{ padding: '15px 30px', backgroundColor: '#fff', color: '#000', textDecoration: 'none', fontWeight: 'bold', borderRadius: '6px' }}>
            Boost your priority — complete this 1-min form
          </a>
        </div>
        <p style={{ marginTop: '30px', fontSize: '14px', color: '#888', textAlign: 'center' }}>
          Thanks for joining The Forge Academy!
        </p>
      </div>
    </div>
  );
}
