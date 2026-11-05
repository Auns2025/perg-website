import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import BusinessSegments from './components/BusinessSegments';
import Capabilities from './components/Capabilities';
import Process from './components/Process';
import Projects from './components/Projects';
import QualitySafety from './components/QualitySafety';
import Values from './components/Values';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useSmoothScroll();

  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Subtle section fade reveals
      const sections = ['#about', '#services', '#segments', '#capabilities', '#process', '#projects', '#quality-safety', '#values', '#contact'];
      
      sections.forEach((selector) => {
        const el = document.querySelector(selector);
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0.9, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-perg-blue selection:text-white relative">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <BusinessSegments />
        <Capabilities />
        <Process />
        <Projects />
        <QualitySafety />
        <Values />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
