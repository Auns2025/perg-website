import React, { useState, useMemo } from 'react';
import { Building2, Briefcase, Filter, ChevronDown, ChevronUp, MapPin, Search, X, CheckCircle2 } from 'lucide-react';
import { completedProjects, projectCategories } from '../data/projectsData';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 9;

  // Calculate live counts for each category
  const categoryCounts = useMemo(() => {
    const counts = { all: completedProjects.length };
    projectCategories.forEach(cat => {
      if (cat.id !== 'all') {
        counts[cat.id] = completedProjects.filter(p => p.categories.includes(cat.id)).length;
      }
    });
    return counts;
  }, []);

  // Filter projects by category AND search query
  const filteredProjects = useMemo(() => {
    return completedProjects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.categories.includes(selectedCategory);
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        project.client.toLowerCase().includes(q) ||
        project.mainContractor.toLowerCase().includes(q) ||
        project.scopeOfWork.toLowerCase().includes(q) ||
        (project.location && project.location.toLowerCase().includes(q)) ||
        project.categoryLabel.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  // When filtering or searching, show all matching results if under 18, or respect toggle
  const shouldLimit = selectedCategory === 'all' && !searchQuery && !showAll;
  const displayedProjects = shouldLimit ? filteredProjects.slice(0, INITIAL_COUNT) : filteredProjects;
  const hasMore = shouldLimit && filteredProjects.length > INITIAL_COUNT;

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    // Auto-expand so user instantly sees full results for specific categories
    if (categoryId !== 'all') {
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

        {/* Filter Controls Bar: Categories & Search Input */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2" role="tablist">
              {projectCategories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-perg-blue text-white shadow-md shadow-blue-900/20 scale-[1.02]'
                        : 'bg-slate-50 text-slate-700 hover:text-perg-blue hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-mono font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Instant Search Input */}
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by client or scope..."
                className="w-full pl-9 pr-9 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-perg-blue focus:ring-1 focus:ring-perg-blue bg-slate-50 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Status & Reset */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                Showing <strong className="text-slate-800">{displayedProjects.length}</strong> of{' '}
                <strong className="text-slate-800">{filteredProjects.length}</strong> verified project records
                {selectedCategory !== 'all' && (
                  <> in <span className="font-semibold text-perg-blue">“{projectCategories.find(c => c.id === selectedCategory)?.label}”</span></>
                )}
                {searchQuery && (
                  <> matching <span className="font-semibold text-slate-800">“{searchQuery}”</span></>
                )}
              </span>
            </div>

            {(selectedCategory !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setShowAll(false);
                }}
                className="text-perg-blue hover:text-perg-blue-dark font-semibold transition-colors flex items-center gap-1"
              >
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {displayedProjects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-sm">
            <Filter className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-slate-800 mb-1">
              No matching projects found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-5">
              No records match your search criteria. Try selecting another category or clear the search filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-perg-blue text-white text-xs font-semibold rounded-lg hover:bg-perg-blue-dark transition-colors"
            >
              View All Projects
            </button>
          </div>
        ) : (
          /* Projects Grid Directory with Transition & Highlight */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
            {displayedProjects.map((project) => (
              <div
                key={project.sn}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg hover:border-perg-blue/40 transition-all duration-300 group transform hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar: REF Number & Active Category Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-perg-blue transition-colors">
                      REF #{String(project.sn).padStart(2, '0')}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-perg-blue-light text-perg-blue tracking-wide">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Client / Facility Name */}
                  <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-perg-blue transition-colors mb-2 leading-snug">
                    {project.client}
                  </h3>

                  {/* Scope of Work */}
                  <div className="mb-4">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Executed Scope
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {project.scopeOfWork}
                    </p>
                  </div>
                </div>

                {/* Footer: Main Contractor, Location, and Quick Category Tags */}
                <div>
                  {/* Category Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-3 pt-3 border-t border-slate-100">
                    {project.categories.map((c) => {
                      const isCurrentCat = selectedCategory === c;
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => handleCategorySelect(c)}
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded transition-all ${
                            isCurrentCat
                              ? 'bg-perg-blue text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                          title={`Filter by ${c}`}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex items-start gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400">Main Contractor: </span>
                        <span className="font-semibold text-slate-700">{project.mainContractor}</span>
                      </div>
                    </div>

                    {project.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{project.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View More / View Less Toggle (when on All Projects without active search) */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-perg-blue text-sm font-bold text-slate-800 hover:text-perg-blue shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>View All {completedProjects.length} Verified UAE Projects</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {showAll && selectedCategory === 'all' && !searchQuery && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => {
                setShowAll(false);
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-perg-blue transition-colors"
            >
              <span>Show Less</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
