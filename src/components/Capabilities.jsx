import React, { useState } from 'react';
import { ChevronDown, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { capabilities } from '../data/servicesData';

export default function Capabilities() {
  const [activeId, setActiveId] = useState(capabilities[0].id);
  const [openMobileId, setOpenMobileId] = useState(capabilities[0].id);

  const activeCapability = capabilities.find(c => c.id === activeId) || capabilities[0];

  const handleMobileToggle = (id) => {
    setOpenMobileId(prev => prev === id ? null : id);
  };

  return (
    <section id="capabilities" className="py-20 lg:py-32 bg-slate-50 relative border-b border-slate-200 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_0%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 lg:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-perg-blue uppercase mb-3 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-perg-blue animate-pulse" />
            <span>OUR EXPERTISE</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-perg-charcoal tracking-tight">
            Technical Capabilities That Deliver Results
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-2xl">
            Eight foundational competencies spanning the complete lifecycle of mission-critical engineering projects across the UAE.
          </p>
        </div>

        {/* Desktop Interactive Split Layout (Hidden on Mobile) */}
        <div className="hidden lg:grid grid-cols-12 gap-12 xl:gap-16 items-start">
          
          {/* Left Column: List of 8 Capabilities */}
          <div className="col-span-6 space-y-2">
            {capabilities.map((cap) => {
              const isActive = activeId === cap.id;
              return (
                <button
                  key={cap.id}
                  type="button"
                  onClick={() => setActiveId(cap.id)}
                  onMouseEnter={() => setActiveId(cap.id)}
                  className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${
                    isActive
                      ? 'bg-white shadow-lg border border-perg-blue/30 transform translate-x-2'
                      : 'bg-transparent border border-transparent hover:bg-white/60 hover:border-slate-200'
                  }`}
                >
                  {/* Active Left Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-perg-blue rounded-r-full" />
                  )}

                  <div className="flex items-center gap-5 relative z-10">
                    <span className={`font-mono text-xl font-extrabold transition-colors duration-300 ${
                      isActive ? 'text-perg-blue' : 'text-slate-300 group-hover:text-slate-400'
                    }`}>
                      {cap.number}
                    </span>
                    <div>
                      <h3 className={`font-heading font-bold text-lg transition-colors duration-300 ${
                        isActive ? 'text-perg-charcoal' : 'text-slate-600 group-hover:text-slate-900'
                      }`}>
                        {cap.title}
                      </h3>
                      <p className={`text-xs mt-1 transition-all duration-300 line-clamp-1 ${
                        isActive ? 'text-slate-500' : 'text-transparent group-hover:text-slate-400'
                      }`}>
                        {cap.summary}
                      </p>
                    </div>
                  </div>
                  
                  <ArrowRight className={`w-5 h-5 transition-all duration-300 relative z-10 ${
                    isActive ? 'text-perg-blue opacity-100 translate-x-0' : 'text-slate-300 opacity-0 -translate-x-2'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Sticky Dynamic Image & Details Card */}
          <div className="col-span-6 sticky top-28">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 h-[550px] group">
              {/* Dynamic Image (Can be updated based on activeId if you have different images) */}
              <img
                src="/images/capabilities-engineering.jpg"
                alt={activeCapability.title}
                className="w-full h-full object-cover object-center filter contrast-[1.05] transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-perg-charcoal via-perg-charcoal/60 to-transparent opacity-90" />

              {/* Top Badge */}
              <div className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-perg-blue text-white text-xs font-mono font-bold tracking-wider shadow-lg backdrop-blur-md border border-white/20">
                COMPETENCY {activeCapability.number} OF 08
              </div>

              {/* Glassmorphism Details Card */}
              <div className="absolute bottom-6 left-6 right-6 p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-500">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-300 mb-2 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Discipline Specification</span>
                </div>
                <h3 className="font-heading font-bold text-2xl text-white mb-3">
                  {activeCapability.title}
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed mb-4">
                  {activeCapability.details || activeCapability.summary}
                </p>
                
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-perg-blue hover:bg-perg-blue-bright px-5 py-2.5 rounded-lg transition-colors duration-300 shadow-md"
                >
                  <span>Inquire about this capability</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Regulatory Note */}
            <div className="mt-4 p-5 rounded-2xl bg-white border border-slate-200 text-sm text-slate-600 flex items-center justify-between shadow-sm">
              <span className="font-semibold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-perg-blue" /> Regulatory Standard:
              </span>
              <span className="font-mono text-xs font-bold text-perg-blue bg-perg-blue-subtle/50 px-3 py-1 rounded-md">DEWA, Civil Defense, ISO 9001</span>
            </div>
          </div>
        </div>

        {/* Mobile Layout: Accordion (Visible only on smaller screens) */}
        <div className="lg:hidden space-y-4">
          {capabilities.map((cap) => {
            const isOpen = openMobileId === cap.id;
            return (
              <div
                key={cap.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'bg-white border-perg-blue/40 shadow-md'
                    : 'bg-white/80 border-slate-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleMobileToggle(cap.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-sm font-extrabold ${
                      isOpen ? 'text-perg-blue' : 'text-slate-400'
                    }`}>
                      {cap.number}
                    </span>
                    <span className={`font-heading font-bold text-base transition-colors ${
                      isOpen ? 'text-perg-blue' : 'text-slate-900'
                    }`}>
                      {cap.title}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded-full transition-all duration-300 ${
                    isOpen ? 'bg-perg-blue text-white rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Mobile Accordion Body */}
                <div className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}>
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-0">
                      {/* Show image inside mobile accordion */}
                      <div className="w-full h-48 rounded-xl overflow-hidden mb-4 border border-slate-200">
                        <img
                          src="/images/capabilities-engineering.jpg"
                          alt={cap.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <p className="mb-3 font-semibold text-slate-800 text-sm">
                        {cap.summary}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed mb-5">
                        {cap.details}
                      </p>
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-xs font-bold text-white bg-perg-blue hover:bg-perg-blue-dark px-4 py-2.5 rounded-lg transition-colors w-full justify-center"
                      >
                        <span>Inquire about this capability</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}