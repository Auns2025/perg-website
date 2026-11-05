import React from 'react';
import { businessSegments } from '../data/servicesData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function BusinessSegments() {
  return (
    <section id="segments" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      {/* Background Subtle Grid Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 lg:mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-perg-blue uppercase mb-4 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-perg-blue animate-pulse" />
            <span>OUR BUSINESS SEGMENTS</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-perg-charcoal tracking-tight mb-4">
            Solutions Across Multiple Disciplines
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            From specialized industrial manufacturing and engineering execution to technical advisory and high-spec material supply.
          </p>
        </div>

        {/* 4 Unique Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessSegments.map((segment) => (
            <div
              key={segment.number}
              // Removed transform hover:-translate-y-1 to fix the zoom/lift issue
              className="group bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-perg-blue/40 relative overflow-hidden cursor-pointer"
            >
              {/* Background Watermark Number */}
              <div className="absolute -top-4 -right-2 text-8xl font-heading font-extrabold text-slate-50/80 group-hover:text-perg-blue/5 transition-colors duration-500 pointer-events-none select-none">
                {segment.number}
              </div>

              <div className="relative z-10">
                {/* Minimal Blue Numbering */}
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-perg-blue/10 text-perg-blue font-mono text-lg font-bold mb-6 group-hover:bg-perg-blue group-hover:text-white transition-colors duration-300">
                  {segment.number}
                </div>

                <h3 className="font-heading font-bold text-xl text-slate-900 mb-2 tracking-tight group-hover:text-perg-blue transition-colors duration-300">
                  {segment.title}
                </h3>

                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">
                  {segment.subtitle}
                </p>

                {/* Short Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {segment.description}
                </p>
              </div>

              {/* Expandable Items List */}
              <div className="relative z-10 pt-4 border-t border-slate-100 mt-auto">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Scope & Offerings</span>
                  <ArrowRight className="w-3.5 h-3.5 text-perg-blue opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                </div>
                
                <ul className="space-y-2.5">
                  {segment.items.slice(0, 4).map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2 text-xs text-slate-600 group-hover:text-slate-800 transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5 text-perg-blue shrink-0 mt-0.5 opacity-70 group-hover:opacity-100" />
                      <span className="leading-snug line-clamp-1 group-hover:line-clamp-none transition-all">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}