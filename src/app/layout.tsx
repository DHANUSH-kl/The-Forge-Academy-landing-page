import type { Metadata } from 'next';
import '../styles/globals.css';
import { Analytics } from "@vercel/analytics/next"
import  {NavbarDemo}  from '../components/Navbar';



export const metadata = {
  title: "The Forge Academy",
  description: "Official Site of The Forge Academy",
  icons: {
    icon: "/favicon2.png", // or .png
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <NavbarDemo />
        {children}
        <Analytics />
      </body>
    </html>
  );
}