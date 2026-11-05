import React, { useState, useEffect } from 'react';
import { ArrowUp, Phone, MessageSquare } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
      setIsVisible(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  // Calculate SVG dash
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3 animate-fade-in">
      {/* Quick Call Button */}
      <a
        href={`tel:${companyInfo.contact.primaryPhone.replace(/\s+/g, '')}`}
        className="w-12 h-12 rounded-full bg-perg-blue text-white shadow-lg hover:bg-perg-blue-dark flex items-center justify-center transition-all duration-300 transform hover:scale-110 group focus:outline-none focus:ring-2 focus:ring-perg-blue"
        aria-label="Call PERG Head Office Dubai"
        title="Call PERG Dubai: +971 4 583 0191"
      >
        <Phone className="w-5 h-5 group-hover:animate-wiggle" />
      </a>

      {/* Scroll to Top with Circular Progress Indicator */}
      <button
        type="button"
        onClick={scrollToTop}
        className="relative w-12 h-12 rounded-full bg-white text-slate-700 border border-slate-200 shadow-lg hover:text-perg-blue flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-perg-blue group"
        aria-label="Scroll to top of page"
        title="Back to Top"
      >
        <svg className="w-12 h-12 transform -rotate-90 absolute inset-0 pointer-events-none">
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="#e2e8f0"
            strokeWidth="2.5"
            fill="transparent"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="#075A9C"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-100 ease-out"
          />
        </svg>
        <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}
