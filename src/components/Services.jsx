import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { coreServices } from '../data/servicesData';

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = coreServices[activeIndex];

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      const headerOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-32 bg-slate-50 relative border-y border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-perg-blue uppercase mb-3 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-perg-blue animate-pulse" />
            <span>WHAT WE DO</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-perg-charcoal tracking-tight mb-4">
            Integrated MEP & Technical Solutions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Comprehensive engineering services from design and installation to testing, commissioning, and maintenance.
          </p>
        </div>

        {/* Desktop: Interactive Split Layout (Hover List) */}
        <div className="hidden lg:grid grid-cols-12 gap-12 xl:gap-16 items-start">
          
          {/* Left Column: Service List */}
          <div className="col-span-6 space-y-2">
            {coreServices.map((service, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border overflow-hidden ${
                    isActive 
                      ? 'bg-white border-perg-blue/30 shadow-lg translate-x-2' 
                      : 'bg-transparent border-slate-200/60 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Active Left Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-perg-blue rounded-r-full" />
                  )}
                  
                  <div className="flex items-center gap-6 relative z-10">
                    <span className={`font-mono text-xl font-extrabold transition-colors duration-300 ${
                      isActive ? 'text-perg-blue' : 'text-slate-300'
                    }`}>
                      {service.number}
                    </span>
                    <div>
                      <h3 className={`font-heading font-bold text-lg sm:text-xl transition-colors duration-300 ${
                        isActive ? 'text-slate-900' : 'text-slate-600'
                      }`}>
                        {service.title}
                      </h3>
                      {/* Short content shown only when active/hovered */}
                      <div className={`grid transition-all duration-500 ease-in-out ${
                        isActive ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'
                      }`}>
                        <div className="overflow-hidden">
                          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                            {service.summary}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Dynamic Image & Short Details */}
          <div className="col-span-6 sticky top-28">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 h-[500px] group">
              <img
                src={activeService.image}
                alt={activeService.title}
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-perg-charcoal/90 via-perg-charcoal/40 to-transparent" />

              {/* Glass Details Card */}
              <div className="absolute bottom-6 left-6 right-6 p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-500">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-300 mb-3 uppercase tracking-wider">
                  <span>DISCIPLINE {activeService.number}</span>
                  <span className="w-1 h-1 rounded-full bg-sky-300" />
                  <span>Turnkey</span>
                </div>
                <h3 className="font-heading font-bold text-2xl text-white mb-3">
                  {activeService.title}
                </h3>
                
                {/* Short 2 Points Scope */}
                <div className="space-y-2 mb-6">
                  {activeService.scope.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-perg-blue-bright shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
                
                <a
                  href="#contact"
                  onClick={handleScrollToContact}
                  className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-perg-blue hover:bg-perg-blue-bright px-5 py-2.5 rounded-lg transition-colors duration-300 shadow-md w-full sm:w-auto"
                >
                  <span>Inquire for Project</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout: Stacked Cards (Hidden on Desktop) */}
        <div className="lg:hidden space-y-6">
          {coreServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-white/90 backdrop-blur-md text-slate-900 font-mono text-xs font-bold tracking-wider">
                  {service.number}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-heading font-bold text-xl text-white tracking-tight drop-shadow-sm">
                    {service.title}
                  </h3>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {service.summary}
                </p>
                <a
                  href="#contact"
                  onClick={handleScrollToContact}
                  className="inline-flex items-center justify-center w-full gap-2 text-sm font-bold text-perg-blue bg-perg-blue-light/50 hover:bg-perg-blue-light py-2.5 rounded-lg transition-colors"
                >
                  <span>Inquire for Project</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}