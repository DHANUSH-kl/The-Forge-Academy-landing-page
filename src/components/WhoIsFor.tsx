'use client';

import styles from './WhoIsFor.module.css';
import { HoverEffect } from "./ui/card-hover-effect"


export const projects = [

  {
    title: "Students who are tired of theory and want hands-on experience",
    description:"",
    link:""

  },
   {
    title: "Aspiring entrepreneurs who want to build without risking money",
    description:"",
    link:""
  },
   {
    title: "Creators, marketers, designers, and hustlers looking to explore startup roles",
    description:"",
    link:""
  },
   {
    title: "People who learn best by doing, not just watching",
    description:"",
    link:""
  }

]

export default function WhoIsFor() {


 
  return (
    <>
    <section className={styles.container}>

      <h1 className=' text-center text-3xl md:text-4xl lg:text-5xl font-bold px-5 sm:px-10 md:px-15 lg:px-20 py-5 md:py-8 lg:py-10'>
      Who it&apos;s for
      </h1>

     
    <div className="max-w-5xl mx-auto px-8">
     <HoverEffect items={projects.map(proj => ({
        title: proj.title,
        description: proj.description || '', // Add default if needed
        link: proj.link || '#' // Add default if needed
}))} />
    </div>

    
 
    </section>

      

    </>
  );
}