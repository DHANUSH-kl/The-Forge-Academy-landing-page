import  {NavbarDemo}  from '../components/Navbar';
import Hero from '../components/Hero';
import HorizontalScroll from '../components/HorizontalScroll';
import Timeline from '../components/Timeline';
import WhoIsFor from '../components/WhoIsFor';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <main>
      <NavbarDemo />
      <Hero />
      <HorizontalScroll />
      <Timeline />
      <WhoIsFor />
      <CTA />
    </main>
  );
}