import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracker for active nav link
      const sections = ['hero', 'about', 'services', 'segments', 'capabilities', 'projects', 'quality-safety', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Segments', href: '#segments', id: 'segments' },
    { name: 'Expertise', href: '#capabilities', id: 'capabilities' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Quality & Safety', href: '#quality-safety', id: 'quality-safety' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-3.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* PERG Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-perg-blue rounded p-1"
            aria-label="PERG Technical Services LLC - Home"
          >
            <img
              src="/logo/logo-perg.png"
              alt="PERG Technical Services LLC"
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              onError={(e) => {
                // High-fidelity fallback if image fails
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden flex-col">
              <span className="font-heading font-extrabold text-2xl tracking-tight text-perg-blue">
                PERG
              </span>
              <span className="text-[10px] uppercase tracking-widest text-perg-gray font-semibold">
                Technical Services LLC
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-150 rounded-md relative ${
                    isActive
                      ? 'text-perg-blue font-semibold'
                      : 'text-slate-600 hover:text-perg-blue hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-perg-blue rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA & Direct Contact */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="inline-flex items-center gap-2 bg-perg-blue hover:bg-perg-blue-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-perg-blue focus:ring-offset-2"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${companyInfo.contact.primaryPhone.replace(/\s+/g, '')}`}
              className="p-2 text-perg-blue hover:bg-perg-blue-light rounded-lg transition-colors"
              aria-label="Call PERG"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-perg-blue hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-perg-blue"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-slate-200 shadow-xl transition-all">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`block px-4 py-3 text-base rounded-lg transition-colors ${
                    isActive
                      ? 'bg-perg-blue-light text-perg-blue font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-perg-blue'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-3">
              <div className="px-4 text-xs text-slate-500">
                <p className="font-semibold text-slate-700">Damac XL Towers, Business Bay</p>
                <p>Dubai, United Arab Emirates</p>
              </div>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="w-full flex items-center justify-center gap-2 bg-perg-blue text-white text-base font-semibold py-3 rounded-lg shadow-sm"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
