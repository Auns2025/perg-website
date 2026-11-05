import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function Hero() {
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 70; // Header ki nayi height ke mutabiq
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center bg-perg-blue-dark overflow-hidden pt-24 pb-12 lg:pt-28 lg:pb-16"
    >
      {/* Background Architectural Photography with Engineering Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-commercial-building.jpg"
          alt="Dubai Commercial Architecture and MEP Engineering"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.1] transform scale-[1.03] transition-transform duration-1000 ease-out"
        />
        {/* Subtle engineering blueprint grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        {/* Dynamic gradient overlay for razor-sharp typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-perg-blue-navy/95 via-perg-blue-dark/88 to-perg-blue-deep/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-perg-blue-bright/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-4xl">
          
          {/* Eyebrow / Sub-badge with Animated Pulse */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 sm:mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-perg-blue-bright" />
            </span>
            <span className="font-heading tracking-wide">PERG TECHNICAL SERVICES LLC</span>
            <span className="text-white/40">•</span>
            <span className="text-white/80 font-normal">Dubai, UAE</span>
          </div>

          {/* Main H1 Heading */}
          <h1 className="font-heading font-extrabold text-white text-4xl sm:text-5xl md:text-6xl lg:text-[68px] tracking-tight leading-[1.08] mb-6">
            Trusted Expertise in <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-sky-300">
              Technical Services
            </span>
          </h1>

          {/* Supporting Description */}
          <p className="text-slate-200 text-lg sm:text-xl md:text-2xl font-normal leading-relaxed max-w-2xl mb-10 text-balance">
            Delivering professional electromechanical engineering, MEP contracting, and technical solutions across the UAE since 2018.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 mb-12">
            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, 'services')}
              className="inline-flex items-center justify-center gap-3 bg-perg-blue hover:bg-perg-blue-bright text-white text-base font-semibold px-8 py-4 rounded-xl shadow-lg shadow-blue-900/40 hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-perg-blue-dark group"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, 'contact')}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 text-base font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-white transform hover:-translate-y-0.5"
            >
              <span>Contact Our Team</span>
            </a>
          </div>

          {/* Credibility highlights with Live Animated Counters */}
          <div className="pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-3xl">
            <div className="group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                <AnimatedCounter end={2018} duration={1500} />
              </div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Established in UAE</div>
            </div>

            <div className="group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                <AnimatedCounter end={76} duration={1800} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Technical Workforce</div>
            </div>

            <div className="group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                <AnimatedCounter end={32} duration={2000} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Major UAE Contracts</div>
            </div>

            <div className="group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                <AnimatedCounter end={100} duration={1500} suffix="%" />
              </div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Quality Commitment</div>
            </div>
          </div>

        </div>
      </div>

      {/* Subtle Scroll Indicator - Placed neatly at the bottom center */}
      <a
        href="#about"
        onClick={(e) => handleScrollTo(e, 'about')}
        className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center text-white/50 hover:text-white transition-colors duration-200 z-20 group"
        aria-label="Scroll down to About section"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest mb-1.5 opacity-60 group-hover:opacity-100">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1 group-hover:border-white/60 transition-colors bg-white/5 backdrop-blur-sm">
          <div className="w-1 h-1.5 bg-white/80 rounded-full animate-bounce" />
        </div>
      </a>
    </section>
  );
}