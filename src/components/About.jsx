import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function About() {
  const handleScrollTo = (e, id) => {
    e.preventDefault();

    const el = document.getElementById(id);

    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="about" className="py-20 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-perg-blue uppercase mb-3">
            <span className="w-6 h-0.5 bg-perg-blue" />
            <span>WHO WE ARE</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-perg-charcoal tracking-tight max-w-3xl">
            Engineering Excellence. Built on Trust.
          </h2>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src="/images/Engineers Reviewing Plans at Dubai Construction Site.jpg"
                alt="PERG Engineering Team"
                className="w-full h-[420px] sm:h-[500px] object-cover object-center filter contrast-[1.02]"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-perg-charcoal/80 via-transparent to-transparent" />

              {/* Bottom Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-100 shadow-md">
                <div className="flex items-center justify-between text-xs font-semibold text-perg-gray mb-1">
                  <span>DUBAI, UAE</span>
                  <span className="text-perg-blue">EST. 2018</span>
                </div>

                <div className="font-heading font-bold text-base text-slate-900">
                  PERG BUILDING CONTRACTING LLC
                </div>
              </div>
            </div>

            {/* Decorative Framing */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-28 h-28 border-t-2 border-l-2 border-perg-blue/30 rounded-tl-3xl -z-10" />

            <div className="hidden sm:block absolute -bottom-4 -right-4 w-28 h-28 border-b-2 border-r-2 border-perg-blue/30 rounded-br-3xl -z-10" />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Short Company Introduction */}
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-normal mb-6">
              {companyInfo.about.intro}
            </p>

            <p className="text-base text-slate-600 leading-relaxed mb-6">
              {companyInfo.about.mission}
            </p>

            {/* Core Principle */}
            <div className="p-5 rounded-xl bg-perg-blue-subtle border-l-4 border-perg-blue mb-10">
              <p className="text-sm sm:text-base font-semibold text-slate-900 italic">
                “Quality work, timely delivery, and strong coordination are at the heart of every project.”
              </p>
            </div>

            {/* Key Strengths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 mb-10">
              {companyInfo.about.strengths.map((strength, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-perg-blue" />

                    <h3 className="font-heading font-bold text-base text-slate-900">
                      {strength.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-3.5">
                    {strength.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs: Download Profile & Discover Expertise */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-2">
              <a
                href="#capabilities"
                onClick={(e) => handleScrollTo(e, 'capabilities')}
                className="inline-flex items-center justify-center sm:justify-start gap-2 text-slate-700 hover:text-perg-blue font-semibold text-sm transition-colors group py-2"
              >
                <span>Discover Our Expertise</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
