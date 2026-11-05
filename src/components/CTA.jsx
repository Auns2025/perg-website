import React from 'react';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function CTA() {
  const handleScrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative py-20 lg:py-28 bg-perg-blue-dark overflow-hidden">
      {/* Background Architectural Texture with Deep Blue Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/corporate-cta-bg.jpg"
          alt="Engineering Architectural Facade"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-perg-blue-navy/95 via-perg-blue-dark/90 to-perg-blue-deep/85" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider uppercase mb-6">
          <span>PARTNER WITH PERG</span>
        </div>

        {/* Heading */}
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
          Let’s Build Your Next Project Together.
        </h2>

        {/* Supporting Text */}
        <p className="text-slate-200 text-base sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto mb-10 text-balance">
          Connect with PERG Technical Services for professional MEP, electromechanical engineering, and turnkey technical solutions across Dubai and the UAE.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-10">
          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-perg-blue hover:bg-slate-100 text-base font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-5 h-5 text-perg-blue" />
          </a>

          <a
            href={`mailto:${companyInfo.contact.email}?subject=Project%20Inquiry%20-%20PERG%20Technical%20Services`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 text-base font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <Mail className="w-5 h-5" />
            <span>Email Our Team</span>
          </a>
        </div>

        {/* Quick Contact Footer */}
        <div className="inline-flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300 pt-6 border-t border-white/15">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-perg-blue-bright" />
            <span>Dubai Head Office: {companyInfo.contact.primaryPhone}</span>
          </div>
          <span className="hidden sm:inline text-white/30">•</span>
          <div>
            <span>Suite 703 Damac XL Towers, Business Bay, Dubai</span>
          </div>
        </div>
      </div>
    </section>
  );
}
