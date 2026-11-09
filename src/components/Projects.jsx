import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { completedProjects } from '../data/projectsData';

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 3 cards initially on mobile, 6 cards on tablet and desktop
  const initialCount = isMobile ? 3 : 6;
  const displayedProjects = showAll ? completedProjects : completedProjects.slice(0, initialCount);

  const toggleShow = () => {
    if (showAll) {
      setShowAll(false);
      const el = document.getElementById('projects');
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      setShowAll(true);
    }
  };

  return (
    <section id="projects" className="py-20 lg:py-32 bg-slate-50 relative border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-perg-blue uppercase mb-3">
            <span className="w-6 h-0.5 bg-perg-blue" />
            <span>OUR TRACK RECORD</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-perg-charcoal tracking-tight">
                Experience Across Major UAE Projects
              </h2>
              <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl">
                Demonstrated execution across commercial developments, aviation facilities, utilities, and high-spec industrial complexes.
              </p>
            </div>

            {/* Note clarifying contracting relationship */}
            <div className="p-3.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-500 max-w-sm shadow-sm">
              <span className="font-semibold text-slate-700">Project Integrity Notice:</span> Data reflects verified completed projects, distinguishing client, main contractor, and executed scope as documented in official pre-qualification records.
            </div>
          </div>
        </div>

        {/* Projects Grid Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-perg-blue/40 transition-all duration-300 group transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: project.objectPosition || 'center' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded bg-white/90 backdrop-blur-md text-slate-900 font-mono text-xs font-bold tracking-wider shadow-sm">
                    REF #{String(project.id).padStart(2, '0')}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 group-hover:text-perg-blue transition-colors leading-snug">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Toggle Button */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={toggleShow}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-perg-blue text-sm font-bold text-slate-800 hover:text-perg-blue shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-perg-blue"
          >
            <span>{showAll ? 'Show Less' : 'Show More'}</span>
            {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}
