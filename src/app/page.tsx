// import  {NavbarDemo}  from '../components/Navbar';
import Hero from '../components/Hero';
import WhatWeDo from '../components/WhatWeDo';
import TimelineCmp from '../components/TimelineCmp';
import WhoIsFor from '../components/WhoIsFor';
import CTA from '../components/CTA';
import {GlassmorphicWaitlist} from "../components/GlassmorphicWaitlist";

export default function Home() {
  return (
    <main>
      {/* <NavbarDemo /> */}
       <GlassmorphicWaitlist />
      <Hero />
      <WhatWeDo />
      <WhoIsFor />
      <TimelineCmp />
      <CTA />
    </main>
  );
}