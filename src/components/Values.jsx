import React from 'react';
import { companyInfo } from '../data/companyData';
import { Shield, Target, Gem, Users } from 'lucide-react';

export default function Values() {
  // Icons array for the 4 principles
  const icons = [Shield, Target, Gem, Users];

  return (
    <section id="values" className="py-20 lg:py-32 bg-perg-blue-subtle/40 relative overflow-hidden border-t border-slate-200">
      
      {/* Background Subtle Grid Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 lg:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-3 text-xs font-bold tracking-widest text-perg-blue uppercase mb-4 bg-white px-5 py-2 rounded-full shadow-sm border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-perg-blue" />
            <span>OUR PRINCIPLES</span>
            <span className="w-1.5 h-1.5 rounded-full bg-perg-blue" />
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-perg-charcoal tracking-tight mb-5">
            Built on Integrity. <br className="hidden sm:block" />
            <span className="text-perg-blue">Driven by Responsibility.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Four guiding values that define how we build relationships, execute engineering projects, and serve the UAE community.
          </p>
        </div>

        {/* Unique Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {companyInfo.values.map((val, idx) => {
            const IconComponent = icons[idx % icons.length];
            
            return (
              <div
                key={val.number}
                className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-perg-blue/10 hover:border-perg-blue/30 transition-all duration-500 transform hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between"
              >
                {/* Animated Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
                  <div className="h-full bg-perg-blue w-0 group-hover:w-full transition-all duration-700 ease-out" />
                </div>

                {/* Background Giant Number (Fixed Alignment & Watermark) */}
                <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 text-[120px] sm:text-[160px] font-heading font-extrabold text-slate-50/90 group-hover:text-perg-blue/[0.04] transition-all duration-500 pointer-events-none select-none leading-none z-0">
                  {val.number}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    {/* Icon Box */}
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-perg-blue group-hover:text-white group-hover:border-perg-blue group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm">
                      <IconComponent className="w-6 h-6" strokeWidth={2} />
                    </div>
                    
                    {/* Principle Badge */}
                    <div className="font-mono text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 group-hover:border-perg-blue/20 group-hover:text-perg-blue transition-colors">
                      PRINCIPLE // {val.number}
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-2xl text-slate-900 mb-3 tracking-tight group-hover:text-perg-blue transition-colors duration-300">
                    {val.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
                    {val.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-6 mt-8 border-t border-slate-100 flex items-center justify-between relative z-10">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Corporate Governance
                  </span>
                  
                  {/* Animated Dots Indicator */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-perg-blue transition-colors duration-300" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-perg-blue/60 transition-colors duration-300 delay-75" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-perg-blue/30 transition-colors duration-300 delay-150" />
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