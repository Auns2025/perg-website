import React, { useState } from 'react';
import { processSteps } from '../data/servicesData';
import { CheckCircle2, ArrowRight, Settings, Layers, ShieldCheck } from 'lucide-react';

export default function Process() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="process" className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
      
      {/* Background Decor (Subtle Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 lg:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-perg-blue uppercase mb-4 bg-perg-blue/10 px-4 py-1.5 rounded-full">
            <Settings className="w-4 h-4" />
            <span>HOW WE WORK</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-perg-charcoal tracking-tight mb-4">
            From Concept to Completion
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            A disciplined, engineering-led execution framework designed for seamless coordination with main contractors and timely handover.
          </p>
        </div>

        {/* Unique Vertical Timeline / Zig-Zag Layout */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Center Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 rounded-full overflow-hidden">
            <div
              className="w-full bg-gradient-to-b from-perg-blue to-perg-blue-bright transition-all duration-700 ease-in-out"
              style={{
                height: hoveredIndex !== null ? `${((hoveredIndex + 1) / processSteps.length) * 100}%` : '100%',
                opacity: hoveredIndex !== null ? 1 : 0.3
              }}
            />
          </div>

          <div className="space-y-8 lg:space-y-0">
            {processSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isHovered = hoveredIndex === idx;
              const isPassed = hoveredIndex !== null && idx <= hoveredIndex;

              return (
                <div
                  key={step.number}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative flex flex-col lg:flex-row items-center w-full lg:h-48 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Desktop Empty Space (for alternating layout) */}
                  <div className="hidden lg:block w-1/2" />

                  {/* Step Card Content */}
                  <div className="w-full lg:w-1/2 px-0 lg:px-12 relative z-10">
                    <div
                      className={`group relative p-6 sm:p-8 bg-white rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isHovered
                          ? 'border-perg-blue/40 shadow-xl shadow-perg-blue/5 -translate-y-1'
                          : 'border-slate-200 shadow-sm'
                      }`}
                    >
                      {/* Hover Blue Top Accent Line */}
                      <div className={`absolute top-0 left-6 right-6 h-1 bg-perg-blue rounded-b-md transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                      <div className={`flex items-center gap-3 mb-4 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse lg:text-right'}`}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-base transition-all duration-500 transform ${
                          isPassed || isHovered
                            ? 'bg-perg-blue text-white shadow-md shadow-perg-blue/30 rotate-3 scale-110'
                            : 'bg-slate-50 text-slate-500 group-hover:bg-perg-blue/5 group-hover:text-perg-blue'
                        }`}>
                          {step.number}
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-perg-blue bg-perg-blue/5 px-2.5 py-1 rounded-md">
                          {step.phase}
                        </div>
                      </div>

                      <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">
                        {step.title}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node Dot (Desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-slate-50 bg-slate-300 z-20 items-center justify-center transition-all duration-300">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isPassed || isHovered ? 'bg-perg-blue scale-150' : 'bg-slate-400'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Proactive Lookahead Note (Bottom Highlight Box) */}
        <div className="mt-16 lg:mt-24 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-perg-blue-dark border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
          {/* Decorative Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-perg-blue-bright opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity duration-500" />
          
          <div className="text-sm text-slate-200 flex items-start gap-4 relative z-10">
            <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm mt-0.5 shrink-0">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <strong className="block text-white font-bold text-base mb-1">Rigorous Project Controls</strong>
              <span className="text-slate-300 leading-relaxed">
                PERG provides weekly progress reports and two-week lookahead programs on request to synchronize with the main contractor.
              </span>
            </div>
          </div>
          <div className="text-xs font-bold text-sky-400 uppercase tracking-widest shrink-0 relative z-10 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
            UAE Construction Standards
          </div>
        </div>

      </div>
    </section>
  );
}