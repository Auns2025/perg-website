import React, { useState } from 'react';
import { Shield, HardHat, Leaf, CheckCircle2, ChevronDown, Award, FileCheck } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function QualitySafety() {
  const { quality, safety, hse } = companyInfo.policies;
  const [activeTab, setActiveTab] = useState(0); // 0: Quality, 1: Safety, 2: HSE

  const pillars = [
    {
      id: 0,
      title: quality.title,
      subtitle: "ISO 9001 Aligned Framework",
      icon: Shield,
      summary: quality.summary,
      points: quality.points,
    },
    {
      id: 1,
      title: safety.title,
      subtitle: "Dedicated Safety & Loss Prevention Unit",
      icon: HardHat,
      summary: safety.summary,
      points: safety.points.slice(0, 4),
    },
    {
      id: 2,
      title: hse.title,
      subtitle: "Zero Accident Target & Waste Minimization",
      icon: Leaf,
      summary: hse.summary,
      points: hse.points,
    }
  ];

  return (
    <section id="quality-safety" className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 lg:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-perg-blue uppercase mb-4 bg-white px-3 py-1.5 rounded-md shadow-sm border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-perg-blue animate-pulse" />
            <span>OUR COMMITMENT</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-perg-charcoal tracking-tight mb-5">
            Quality in Every Detail. Safety at Every Stage. <br className="hidden sm:block" />
            {/* <span className="bg-perg-bluetext-slate-400">Safety at Every Stage.</span> */}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Operating under rigorous self-governing protocols aligned with international standards to safeguard personnel, client assets, and project timelines.
          </p>
        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Sticky Image & Glass Badge */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-28">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative group h-[500px]">
                <img
                  src="/images/safety-engineer-ppe.jpg"
                  alt="PERG Site Engineer wearing mandatory PPE safety helmet and high-visibility vest"
                  className="w-full h-full object-cover object-center filter contrast-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />

                {/* Floating Glass Card */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl group-hover:bg-white/15 transition-colors duration-300">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-300 uppercase tracking-wider mb-2">
                    <HardHat className="w-4 h-4" />
                    <span>SAFETY-FIRST PRINCIPLE</span>
                  </div>
                  <div className="font-heading font-bold text-xl text-white mb-2">
                    “Safety is the First Priority”
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Mandatory safety awareness training, routine hazard identification, and certified site inspections for all tradesmen.
                  </p>
                </div>
              </div>

              {/* Verification Note */}
              <div className="mt-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <FileCheck className="w-5 h-5 text-perg-blue shrink-0" />
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong className="font-semibold text-slate-800">Governance Note:</strong> Operating practices are structured to adhere rigorously to ISO 9001 quality guidelines, OHSAS 18001 safety principles, and ISO 14001 environmental stewardship standards.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Accordion Cards */}
          <div className="lg:col-span-7 space-y-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activeTab === idx;

              return (
                <div 
                  key={pillar.id}
                  onClick={() => setActiveTab(idx)}
                  className={`rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden ${
                    isActive 
                      ? 'bg-white border-perg-blue/30 shadow-xl shadow-perg-blue/5' 
                      : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Card Header (Always Visible) */}
                  <div className="p-6 sm:p-8 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isActive ? 'bg-perg-blue text-white shadow-md' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className={`font-heading font-bold text-lg sm:text-xl transition-colors ${
                          isActive ? 'text-perg-blue' : 'text-slate-900'
                        }`}>
                          {pillar.title}
                        </h3>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                          {pillar.subtitle}
                        </div>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-500 shrink-0 ${
                      isActive ? 'rotate-180 text-perg-blue' : 'text-slate-400'
                    }`} />
                  </div>

                  {/* Card Body (Expandable) */}
                  <div className={`grid transition-all duration-500 ease-in-out ${
                    isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}>
                    <div className="overflow-hidden">
                      <div className="px-6 sm:px-8 pb-8 pt-0">
                        <p className="text-sm text-slate-600 mb-6 leading-relaxed border-l-2 border-perg-blue/20 pl-4">
                          {pillar.summary}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-3">
                          {pillar.points.map((pt, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-perg-blue shrink-0" />
                              <span className="leading-snug">{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Optional Bottom Trust Badge */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-perg-blue-dark to-slate-900 text-white flex items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-sky-400" />
                <div>
                  <div className="font-bold text-sm">Certified Excellence</div>
                  <div className="text-xs text-slate-300">Quality & Safety Standards</div>
                </div>
              </div>
              <div className="text-xs font-mono font-bold bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                ISO 9001 / 14001
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}