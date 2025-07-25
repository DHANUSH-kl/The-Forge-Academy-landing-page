import  {NavbarDemo}  from '../components/Navbar';
import Hero from '../components/Hero';
import HorizontalScroll from '../components/HorizontalScroll';
import TimelineCmp from '../components/TimelineCmp';
import WhoIsFor from '../components/WhoIsFor';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <main>
      <NavbarDemo />
      <Hero />
      <HorizontalScroll />
      <WhoIsFor />
      <TimelineCmp />
      <CTA />
    </main>
  );
}