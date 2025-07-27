import  {NavbarDemo}  from '../components/Navbar';
import Hero from '../components/Hero';
import HorizontalScroll from '../components/HorizontalScroll';
import TimelineCmp from '../components/TimelineCmp';
import WhoIsFor from '../components/WhoIsFor';
import CTA from '../components/CTA';
import {GlassmorphicWaitlist} from "../components/GlassmorphicWaitlist";

export default function Home() {
  return (
    <main>
      <NavbarDemo />
       <GlassmorphicWaitlist />
      <Hero />
      <HorizontalScroll />
      <WhoIsFor />
      <TimelineCmp />
      <CTA />
    </main>
  );
}