import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Shield, 
  HardHat, 
  Leaf, 
  CheckCircle2, 
  ChevronDown, 
  Award, 
  FileCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  ExternalLink,
  X,
  FileText
} from 'lucide-react';
import { companyInfo } from '../data/companyData';

const certificates = [
  {
    id: 1,
    title: "ISO 9001:2015",
    subtitle: "Quality Management",
    fullName: "ISO 9001:2015 — Quality Management",
    systemName: "Quality Management System",
    pdf: "/certificate/ISO%209001-2015.pdf",
    downloadName: "PERG-ISO-9001-2015-Certificate.pdf",
    preview: "/certificate/previews/iso-9001-preview.jpg",
    accreditation: "Veritas Assurance International",
    standard: "International Quality Standard"
  },
  {
    id: 2,
    title: "ISO 14001:2015",
    subtitle: "Environmental Management",
    fullName: "ISO 14001:2015 — Environmental Management",
    systemName: "Environmental Management System",
    pdf: "/certificate/ISO%2014001-2015.pdf",
    downloadName: "PERG-ISO-14001-2015-Certificate.pdf",
    preview: "/certificate/previews/iso-14001-preview.jpg",
    accreditation: "Veritas System Quality Certificates",
    standard: "Environmental Stewardship Standard"
  },
  {
    id: 3,
    title: "ISO 45001:2018",
    subtitle: "Occupational Health & Safety",
    fullName: "ISO 45001:2018 — Occupational Health & Safety",
    systemName: "Occupational Health & Safety Management System",
    pdf: "/certificate/ISO%2045001-2018.pdf",
    downloadName: "PERG-ISO-45001-2018-Certificate.pdf",
    preview: "/certificate/previews/iso-45001-preview.jpg",
    accreditation: "Veritas System Quality Certificates",
    standard: "Occupational Safety Standard"
  }
];

export default function QualitySafety() {
  const { quality, safety, hse } = companyInfo.policies;
  const [activeTab, setActiveTab] = useState(0); // 0: Quality, 1: Safety, 2: HSE

  // ISO Certificate Slider state
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Full-screen Viewer Modal state
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewerMode, setViewerMode] = useState('interactive'); // 'interactive' | 'native'

  // Automatic cycle every 5 seconds (pauses on hover or when viewer is open)
  useEffect(() => {
    if (isViewerOpen || isHovered) return;

    // Respect reduced-motion accessibility preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const timer = setInterval(() => {
      setCurrentCertIndex((prev) => (prev + 1) % certificates.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isViewerOpen, isHovered]);

  // Modal keyboard shortcuts and background scroll lock
  useEffect(() => {
    if (!isViewerOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsViewerOpen(false);
      } else if (e.key === 'ArrowRight') {
        setViewerIndex((prev) => (prev + 1) % certificates.length);
        setZoomLevel(1);
      } else if (e.key === 'ArrowLeft') {
        setViewerIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
        setZoomLevel(1);
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel((prev) => Math.min(Number((prev + 0.25).toFixed(2)), 2.5));
      } else if (e.key === '-') {
        setZoomLevel((prev) => Math.max(Number((prev - 0.25).toFixed(2)), 0.75));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isViewerOpen]);

  const goToPrevCert = (e) => {
    if (e) e.stopPropagation();
    setCurrentCertIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const goToNextCert = (e) => {
    if (e) e.stopPropagation();
    setCurrentCertIndex((prev) => (prev + 1) % certificates.length);
  };

  const openViewer = (index) => {
    setViewerIndex(index);
    setZoomLevel(1);
    setViewerMode('interactive');
    setIsViewerOpen(true);
  };

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
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Operating under rigorous self-governing protocols aligned with international standards to safeguard personnel, client assets, and project timelines.
          </p>
        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Sticky ISO Certificate Slider & Governance Note */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-28 space-y-4">
              
              {/* Certificate Carousel Card */}
              <div 
                className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative group transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Card Top Meta Bar */}
                <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Verified ISO Certification
                    </span>
                  </div>
                  <div className="text-xs font-mono font-semibold text-slate-400">
                    0{currentCertIndex + 1} / 0{certificates.length}
                  </div>
                </div>

                {/* Certificate Preview Frame (Click to open Full-Screen Viewer) */}
                <div
                  onClick={() => openViewer(currentCertIndex)}
                  className="relative bg-gradient-to-b from-slate-100/90 to-slate-50 p-4 sm:p-5 flex items-center justify-center cursor-pointer select-none overflow-hidden"
                  style={{ minHeight: '390px' }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openViewer(currentCertIndex);
                    }
                  }}
                  aria-label={`View full certificate for ${certificates[currentCertIndex].fullName}`}
                >
                  {/* Stacked Certificate Previews with smooth crossfade */}
                  <div className="relative w-full h-[320px] sm:h-[350px] flex items-center justify-center">
                    {certificates.map((cert, idx) => (
                      <div
                        key={cert.id}
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                          currentCertIndex === idx
                            ? 'opacity-100 z-10 pointer-events-auto'
                            : 'opacity-0 z-0 pointer-events-none'
                        }`}
                      >
                        <div className="relative h-full max-h-[340px] sm:max-h-[350px] bg-white rounded-lg shadow-md border border-slate-200/90 p-2 sm:p-2.5 transition-transform duration-500 group-hover:scale-[1.02]">
                          <img
                            src={cert.preview}
                            alt={cert.fullName}
                            className="h-full w-auto max-w-full object-contain mx-auto rounded"
                            loading={idx === 0 ? "eager" : "lazy"}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Hover Prompt Overlay */}
                  <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end justify-center pb-5 z-20">
                    <div className="inline-flex items-center gap-2 bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>Click to View Full-Screen PDF</span>
                    </div>
                  </div>

                  {/* Manual Navigation Arrows */}
                  <button
                    type="button"
                    onClick={goToPrevCert}
                    aria-label="Previous ISO certificate"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-slate-900/65 hover:bg-perg-blue text-white backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-perg-blue"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={goToNextCert}
                    aria-label="Next ISO certificate"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-slate-900/65 hover:bg-perg-blue text-white backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-perg-blue"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Certificate Title & Bottom Controls */}
                <div className="p-5 sm:p-6 bg-white border-t border-slate-100">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="text-[11px] font-bold text-perg-blue uppercase tracking-wider mb-0.5">
                        {certificates[currentCertIndex].accreditation}
                      </div>
                      <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-900">
                        {certificates[currentCertIndex].title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        {certificates[currentCertIndex].systemName}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => openViewer(currentCertIndex)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-perg-blue hover:text-white bg-sky-50 hover:bg-perg-blue px-3 py-2 rounded-xl transition-all duration-200 shrink-0"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Full View</span>
                    </button>
                  </div>

                  {/* Pagination Dots & Download Action */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      {certificates.map((cert, idx) => (
                        <button
                          key={cert.id}
                          type="button"
                          onClick={() => setCurrentCertIndex(idx)}
                          aria-label={`Go to slide ${idx + 1}: ${cert.title}`}
                          className={`transition-all duration-300 rounded-full ${
                            currentCertIndex === idx
                              ? 'w-7 h-2 bg-perg-blue'
                              : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                          }`}
                        />
                      ))}
                    </div>

                    <a
                      href={certificates[currentCertIndex].pdf}
                      download={certificates[currentCertIndex].downloadName}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-perg-blue transition-colors"
                      title="Download original certificate PDF"
                    >
                      <Download className="w-3.5 h-3.5 text-perg-blue" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Verification Governance Note (Preserved unchanged) */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <FileCheck className="w-5 h-5 text-perg-blue shrink-0" />
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong className="font-semibold text-slate-800">Governance Note:</strong> Operating practices are structured to adhere rigorously to ISO 9001 quality guidelines, OHSAS 18001 safety principles, and ISO 14001 environmental stewardship standards.
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Accordion Cards (Preserved unchanged) */}
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

            {/* Bottom Trust Badge (Preserved unchanged) */}
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

      {/* FULL-SCREEN ISO CERTIFICATE VIEWER MODAL (Mounted via Portal) */}
      {isViewerOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="ISO Certificate Full-Screen Viewer"
        >
          {/* Backdrop click to close */}
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setIsViewerOpen(false)}
            aria-label="Close modal overlay"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-5xl h-[94vh] sm:h-[90vh] bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden z-10">
            
            {/* Top Minimal Corporate Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 bg-slate-950/95 border-b border-slate-800 text-white shrink-0">
              
              {/* Certificate Title & Status */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-perg-blue/20 border border-perg-blue/40 flex items-center justify-center text-sky-400 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-heading font-bold text-sm sm:text-base text-white truncate">
                    {certificates[viewerIndex].fullName}
                  </h4>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span className="truncate">PERG Building Contracting L.L.C</span>
                    <span>•</span>
                    <span className="text-sky-300">{certificates[viewerIndex].accreditation}</span>
                  </div>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap ml-auto">
                
                {/* View Mode Switcher (Interactive Zoom vs Native PDF) */}
                <div className="hidden sm:inline-flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
                  <button
                    type="button"
                    onClick={() => setViewerMode('interactive')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      viewerMode === 'interactive' 
                        ? 'bg-perg-blue text-white shadow-sm' 
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Interactive
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewerMode('native')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      viewerMode === 'native' 
                        ? 'bg-perg-blue text-white shadow-sm' 
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Native PDF
                  </button>
                </div>

                {/* Zoom Controls (Interactive Mode) */}
                {viewerMode === 'interactive' && (
                  <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700 p-0.5">
                    <button
                      type="button"
                      onClick={() => setZoomLevel((prev) => Math.max(0.75, Number((prev - 0.25).toFixed(2))))}
                      disabled={zoomLevel <= 0.75}
                      title="Zoom Out (-)"
                      aria-label="Zoom Out"
                      className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700/60 rounded disabled:opacity-40 transition-colors"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    
                    <span className="px-2 text-xs font-mono font-semibold text-slate-200 min-w-[50px] text-center">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    
                    <button
                      type="button"
                      onClick={() => setZoomLevel((prev) => Math.min(2.5, Number((prev + 0.25).toFixed(2))))}
                      disabled={zoomLevel >= 2.5}
                      title="Zoom In (+)"
                      aria-label="Zoom In"
                      className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700/60 rounded disabled:opacity-40 transition-colors"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setZoomLevel(1)}
                      title="Fit to Width / Reset (100%)"
                      aria-label="Fit to Width"
                      className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700/60 rounded transition-colors ml-0.5 border-l border-slate-700"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Open Original PDF in New Tab */}
                <a
                  href={certificates[viewerIndex].pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open Original PDF in New Tab"
                  aria-label="Open Original PDF in New Tab"
                  className="hidden md:inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open PDF</span>
                </a>

                {/* Download Certificate */}
                <a
                  href={certificates[viewerIndex].pdf}
                  download={certificates[viewerIndex].downloadName}
                  title="Download Certificate PDF"
                  aria-label="Download Certificate PDF"
                  className="inline-flex items-center gap-1.5 bg-perg-blue hover:bg-perg-blue-dark text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                {/* Close Viewer */}
                <button
                  type="button"
                  onClick={() => setIsViewerOpen(false)}
                  title="Close Viewer (Esc)"
                  aria-label="Close Viewer"
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Viewer Content Area */}
            <div className="relative flex-1 bg-slate-950 overflow-auto flex items-center justify-center p-2 sm:p-6">
              {viewerMode === 'interactive' ? (
                <div
                  className="transition-transform duration-200 ease-out flex items-center justify-center my-auto min-w-full"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top center',
                  }}
                >
                  <div className="bg-white rounded-lg shadow-2xl p-2 sm:p-4 max-w-full border border-slate-200">
                    <img
                      src={certificates[viewerIndex].preview}
                      alt={certificates[viewerIndex].fullName}
                      className="max-h-[72vh] w-auto object-contain mx-auto select-none rounded shadow-sm"
                    />
                  </div>
                </div>
              ) : (
                <iframe
                  src={`${certificates[viewerIndex].pdf}#toolbar=1&navpanes=0&view=FitH`}
                  title={certificates[viewerIndex].fullName}
                  className="w-full h-full border-0 rounded-lg bg-white"
                />
              )}

              {/* Modal Navigation Arrows */}
              <button
                type="button"
                onClick={() => {
                  setViewerIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
                  setZoomLevel(1);
                }}
                aria-label="Previous Certificate"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-perg-blue text-white backdrop-blur-sm border border-slate-700/60 flex items-center justify-center shadow-xl transition-all z-20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setViewerIndex((prev) => (prev + 1) % certificates.length);
                  setZoomLevel(1);
                }}
                aria-label="Next Certificate"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-perg-blue text-white backdrop-blur-sm border border-slate-700/60 flex items-center justify-center shadow-xl transition-all z-20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Status & Switcher Bar */}
            <div className="px-4 py-2.5 sm:px-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-300">Certificate {viewerIndex + 1} of {certificates.length}</span>
                <span className="hidden sm:inline text-slate-600">•</span>
                <span className="hidden sm:inline text-slate-500">Keyboard: [← / →] Navigate, [Esc] Close</span>
              </div>

              {/* Certificate selector pills */}
              <div className="flex items-center gap-1.5">
                {certificates.map((cert, idx) => (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => {
                      setViewerIndex(idx);
                      setZoomLevel(1);
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      viewerIndex === idx
                        ? 'bg-perg-blue text-white shadow-sm'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {cert.title}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

    </section>
  );
}
