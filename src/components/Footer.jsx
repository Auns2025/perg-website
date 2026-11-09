import React from 'react';
import { ArrowUp, MapPin, Phone, Mail, Globe, Shield } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { coreServices } from '../data/servicesData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-slate-950 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Introduction */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="/logo/logo-perg-white.png"
                alt="PERG Technical Services LLC"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden">
                <span className="font-heading font-extrabold text-2xl text-white tracking-tight">PERG</span>
                <span className="block text-[10px] uppercase tracking-widest text-blue-300">Technical Services LLC</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Established in Dubai in 2018. Delivering turnkey electromechanical engineering, MEP contracting, and technical facility services across the United Arab Emirates with uncompromised quality.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: 'About Us', href: '#about' },
                { name: 'Core Services', href: '#services' },
                { name: 'Business Segments', href: '#segments' },
                { name: 'Capabilities', href: '#capabilities' },
                { name: 'Work Approach', href: '#process' },
                { name: 'Track Record', href: '#projects' },
                { name: 'Quality & Safety', href: '#quality-safety' },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-slate-400 hover:text-white hover:underline transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Core MEP Services */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Core Disciplines
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              {coreServices.map((srv) => (
                <li key={srv.id} className="hover:text-white transition-colors">
                  <a href="#services" onClick={(e) => handleLinkClick(e, '#services')}>
                    {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Dubai Office
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-perg-blue-bright shrink-0 mt-0.5" />
                <span>
                  {companyInfo.registeredOffice.suite}, {companyInfo.registeredOffice.area}, Dubai, UAE
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-perg-blue-bright shrink-0" />
                <a href={`tel:${companyInfo.contact.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {companyInfo.contact.primaryPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-perg-blue-bright shrink-0" />
                <a href={`mailto:${companyInfo.contact.email}`} className="text-blue-300 hover:text-white transition-colors">
                  {companyInfo.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-center text-xs text-slate-500">
          <div>
            © {currentYear} {companyInfo.name}. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
