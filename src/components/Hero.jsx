import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

// --- Typing Effect Component ---
const TypewriterText = ({ text, speed = 30, delay = 0, className, start = true }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!start) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    let i = 0;
    let timeoutId;
    let isCancelled = false;

    const startTyping = () => {
      if (isCancelled) return;
      setIsTyping(true);
      const type = () => {
        if (isCancelled) return;
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
          timeoutId = setTimeout(type, speed);
        } else {
          setIsTyping(false);
        }
      };
      type();
    };

    const delayTimeout = setTimeout(startTyping, delay);

    return () => {
      isCancelled = true;
      clearTimeout(delayTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay, start]);

  return (
    <span className={className}>
      {displayedText}
      {isTyping && <span className="animate-pulse opacity-50">|</span>}
    </span>
  );
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const SLIDE_COUNT = 2;
  const AUTOPLAY_INTERVAL = 9000; // 9 seconds per slide (typing complete hone ke liye)
  const timerRef = useRef(null);
  const isPausedRef = useRef(false);

  // Sync ref with state
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDE_COUNT);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // --- FIXED AUTOPLAY LOGIC ---
  useEffect(() => {
    // Agar user ne reduced motion prefer kiya hai to autoplay band
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Har 9 second baad slide change
    const intervalId = setInterval(() => {
      if (!isPausedRef.current) {
        setCurrentSlide((prev) => (prev + 1) % SLIDE_COUNT);
      }
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  // Touch swipe
  const handleTouchStart = (e) => {
    setIsPaused(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  };

  const slidesData = [
    {
      id: 'slide-01',
      image: '/images/Dubai Skyline with Rooftop Pipes.jpg',
      alt: 'Dubai Commercial Architecture and Modern Technical Engineering Services',
      eyebrow: 'PERG BUILDING CONTRACTING LLC',
      location: 'Dubai, UAE',
      titleLine1: 'Trusted Expertise in',
      titleHighlight: 'Technical Services',
      description: 'Delivering professional Contracting electromechanical engineering, MEP contracting, and technical solutions across the UAE since 2018.',
      primaryCta: { text: 'Explore Our Services', targetId: 'services' },
      secondaryCta: { text: 'Contact Our Team', targetId: 'contact' },
      stats: [
        { value: 2018, isCounter: true, duration: 1500, label: 'Established in UAE' },
        { value: 76, isCounter: true, suffix: '+', duration: 1800, label: 'Technical Workforce' },
        { value: 32, isCounter: true, suffix: '+', duration: 2000, label: 'Major UAE Contracts' },
        { value: 100, isCounter: true, suffix: '%', duration: 1500, label: 'Quality Commitment' }
      ]
    },
    {
      id: 'slide-02',
      image: '/images/Hero-slider-2.jpg',
      alt: 'Electrical Engineering Solutions, Switchgear and Industrial Power Systems',
      eyebrow: 'PERG BUILDING CONTRACTING LLC',
      location: 'Dubai, UAE',
      titleLine1: 'Powering Progress with',
      titleHighlight: 'Expert Electrical Solutions',
      description: 'Delivering reliable electrical installations, power distribution, lighting systems, and technical solutions for commercial, industrial, and infrastructure projects across the UAE.',
      primaryCta: { text: 'Explore Our Services', targetId: 'services' },
      secondaryCta: { text: 'Discuss Your Project', targetId: 'contact' },
      stats: [
        { textValue: 'LV & MV', isCounter: false, label: 'Power Distribution' },
        { textValue: 'MDB & DB', isCounter: false, label: 'Switchgear & Panels' },
        { textValue: 'DEWA', isCounter: false, label: 'Authority Compliant' },
        { textValue: 'Turnkey', isCounter: false, label: 'Design to Testing' }
      ]
    }
  ];

  return (
    <section
      id="hero"
      aria-label="Hero Slider"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen flex flex-col justify-center bg-perg-blue-dark overflow-hidden pt-24 pb-14 lg:pt-28 lg:pb-16 focus:outline-none"
    >
      {/* --- FIXED BACKGROUND IMAGES (No Stretch) --- */}
      <div className="absolute inset-0 z-0">
        {slidesData.map((slide, index) => {
          const isActive = currentSlide === index;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                /* object-cover + w-full h-full = perfect fit, no stretch */
                /* scale-105 adds a subtle premium zoom, not distortion */
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.08] scale-105"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}

        {/* Overlays */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-perg-blue-navy/95 via-perg-blue-dark/88 to-perg-blue-deep/60 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-perg-blue-bright/20 via-transparent to-transparent pointer-events-none z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-4xl min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] flex flex-col justify-center">
          {slidesData.map((slide, index) => {
            const isActive = currentSlide === index;
            return (
              <div
                key={slide.id}
                className={`transition-all duration-700 ease-out ${
                  isActive
                    ? 'opacity-100 translate-y-0 block'
                    : 'opacity-0 translate-y-3 pointer-events-none hidden'
                }`}
                aria-hidden={!isActive}
              >
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 sm:mb-8 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-perg-blue-bright" />
                  </span>
                  <span className="font-heading tracking-wide">{slide.eyebrow}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/80 font-normal">{slide.location}</span>
                </div>

                {/* H1 with Typing */}
                <h1 className="font-heading font-extrabold text-white text-3xl sm:text-5xl md:text-6xl lg:text-[68px] tracking-tight leading-[1.1] mb-6 min-h-[2.2em] sm:min-h-[2.4em]">
                  <TypewriterText text={slide.titleLine1} speed={35} start={isActive} />{' '}
                  <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-sky-300">
                    <TypewriterText
                      text={slide.titleHighlight}
                      speed={35}
                      delay={slide.titleLine1.length * 35 + 200}
                      start={isActive}
                    />
                  </span>
                </h1>

                {/* Description with Typing */}
                <p className="text-slate-200 text-base sm:text-xl md:text-2xl font-normal leading-relaxed max-w-2xl mb-10 text-balance min-h-[4.5em] sm:min-h-[4em]">
                  <TypewriterText
                    text={slide.description}
                    speed={12}
                    delay={(slide.titleLine1.length + slide.titleHighlight.length) * 35 + 400}
                    start={isActive}
                  />
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 mb-12">
                  <a
                    href={`#${slide.primaryCta.targetId}`}
                    onClick={(e) => handleScrollTo(e, slide.primaryCta.targetId)}
                    className="inline-flex items-center justify-center gap-3 bg-perg-blue hover:bg-perg-blue-bright text-white text-base font-semibold px-8 py-4 rounded-xl shadow-lg shadow-blue-900/40 hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-perg-blue-dark group"
                  >
                    <span>{slide.primaryCta.text}</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href={`#${slide.secondaryCta.targetId}`}
                    onClick={(e) => handleScrollTo(e, slide.secondaryCta.targetId)}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 text-base font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-white transform hover:-translate-y-0.5"
                  >
                    <span>{slide.secondaryCta.text}</span>
                  </a>
                </div>

                {/* Stats */}
                <div className="pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-3xl">
                  {slide.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="group">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                        {stat.isCounter ? (
                          <AnimatedCounter end={stat.value} duration={stat.duration} suffix={stat.suffix || ''} />
                        ) : (
                          <span>{stat.textValue}</span>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-6 lg:left-8 z-30">
        <button
          type="button"
          onClick={prevSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-6 lg:right-8 z-30">
        <button
          type="button"
          onClick={nextSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </section>
  );
}