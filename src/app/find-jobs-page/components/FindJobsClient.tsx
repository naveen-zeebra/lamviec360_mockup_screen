'use client';
import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/lib/useLanguage';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import JobCard from '@/components/JobCard';
import { mockJobs } from '@/lib/mockData';
import FilterPanel from './FilterPanel';
import JobSearchBar from './JobSearchBar';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';

type SortOption = 'relevance' | 'newest' | 'salary-high' | 'salary-low';

export default function FindJobsClient() {
  const { language, changeLanguage, t } = useLanguage();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [activeFilters, setActiveFilters] = useState<{
    workMode: string[];
    experience: string[];
    salaryMin: number;
    employmentType: string[];
  }>({ workMode: [], experience: [], salaryMin: 0, employmentType: [] });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredJobs = useMemo(() => {
    let jobs = [...mockJobs];
    if (keyword) {
      jobs = jobs.filter(j =>
        j.title.toLowerCase().includes(keyword.toLowerCase()) ||
        j.company.toLowerCase().includes(keyword.toLowerCase()) ||
        j.skills.some(s => s.toLowerCase().includes(keyword.toLowerCase()))
      );
    }
    if (location) {
      jobs = jobs.filter(j => j.location.toLowerCase().includes(location.toLowerCase()));
    }
    if (category) {
      jobs = jobs.filter(j => j.category === category);
    }
    if (activeFilters.workMode.length > 0) {
      jobs = jobs.filter(j => activeFilters.workMode.includes(j.workMode));
    }
    if (activeFilters.employmentType.length > 0) {
      jobs = jobs.filter(j => activeFilters.employmentType.includes(j.employmentType));
    }
    if (sortBy === 'newest') {
      jobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    } else if (sortBy === 'salary-high') {
      jobs.sort((a, b) => b.salaryMax - a.salaryMax);
    } else if (sortBy === 'salary-low') {
      jobs.sort((a, b) => a.salaryMin - b.salaryMin);
    }
    return jobs;
  }, [keyword, location, category, activeFilters, sortBy]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const allFilterChips = [
    ...activeFilters.workMode.map(f => ({ label: f, type: 'workMode' as const })),
    ...activeFilters.employmentType.map(f => ({ label: f, type: 'employmentType' as const })),
  ];

  const removeFilter = (type: 'workMode' | 'employmentType', label: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type].filter((v: string) => v !== label),
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar language={language} onLanguageChange={changeLanguage} t={t} activePage="/find-jobs-page" />

      {/* Page Header */}
      <div className="bg-primary pt-20 pb-8">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">{t.findJobs.heading}</h1>
          <p className="text-white/70 text-sm">{t.findJobs.subheading}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-card border-b border-border sticky top-16 z-20 shadow-sticky">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-3">
          <JobSearchBar
            keyword={keyword}
            location={location}
            category={category}
            onKeywordChange={setKeyword}
            onLocationChange={setLocation}
            onCategoryChange={setCategory}
            t={t}
          />
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-6">
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-36">
              <FilterPanel activeFilters={activeFilters} onFiltersChange={setActiveFilters} t={t} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div>
                <span className="font-bold text-foreground text-lg tab-number">{filteredJobs.length.toLocaleString()}</span>
                <span className="text-muted-foreground text-sm ml-1.5">{t.findJobs.resultsFound}</span>
              </div>
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <SlidersHorizontal size={16} />
                  {t.findJobs.filtersButton}
                  {allFilterChips.length > 0 && (
                    <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                      {allFilterChips.length}
                    </span>
                  )}
                </button>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-select" className="text-sm text-muted-foreground hidden sm:block">{t.findJobs.sortBy}</label>
                  <div className="relative">
                    <select
                      id="sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="appearance-none pl-3 pr-8 py-2 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                    >
                      <option value="relevance">{t.findJobs.sortRelevant}</option>
                      <option value="newest">{t.findJobs.sortNewest}</option>
                      <option value="salary-high">{t.findJobs.sortSalaryHigh}</option>
                      <option value="salary-low">{t.findJobs.sortSalaryLow}</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filter Chips */}
            {allFilterChips.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {allFilterChips.map((chip) => (
                  <button
                    key={`chip-${chip.type}-${chip.label}`}
                    onClick={() => removeFilter(chip.type, chip.label)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-info-bg text-info text-xs font-medium rounded-pill border border-info/20 hover:bg-info/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Remove filter: ${chip.label}`}
                  >
                    {chip.label}
                    <X size={12} />
                  </button>
                ))}
                <button
                  onClick={() => setActiveFilters({ workMode: [], experience: [], salaryMin: 0, employmentType: [] })}
                  className="text-xs text-error hover:text-error-foreground font-medium px-2 py-1 rounded-pill transition-colors"
                >
                  {t.findJobs.clearAll}
                </button>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={`skeleton-${i}`} className="bg-card border border-border rounded-xl p-5 animate-pulse">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 bg-muted rounded-xl flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-2/3" />
                        <div className="h-3 bg-muted rounded w-1/3" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Job Results */}
            {!isLoading && paginatedJobs.length > 0 && (
              <div className="space-y-3">
                {paginatedJobs.map((job) => (
                  <JobCard key={job.id} job={job} t={t} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && paginatedJobs.length === 0 && (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <SlidersHorizontal size={28} className="text-muted-foreground" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{t.findJobs.emptyHeading}</h3>
                <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto">
                  {t.findJobs.emptyBody}
                </p>
                <button
                  onClick={() => {
                    setKeyword('');
                    setLocation('');
                    setCategory('');
                    setActiveFilters({ workMode: [], experience: [], salaryMin: 0, employmentType: [] });
                  }}
                  className="px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
                >
                  {t.findJobs.clearFilters}
                </button>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground tab-number">
                  {t.findJobs.showingResults((currentPage - 1) * itemsPerPage + 1, Math.min(currentPage * itemsPerPage, filteredJobs.length), filteredJobs.length)}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm border border-border rounded-lg text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Previous page"
                  >
                    {t.findJobs.previous}
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={`page-${page}`}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 text-sm rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring tab-number ${
                        currentPage === page
                          ? 'bg-primary text-white' :'border border-border text-foreground hover:bg-muted'
                      }`}
                      aria-label={`Page ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm border border-border rounded-lg text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Next page"
                  >
                    {t.findJobs.next}
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setIsFilterOpen(false)} aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-2xl max-h-[85vh] overflow-y-auto animate-slide-up" role="dialog" aria-label="Job filters">
            <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-card">
              <h2 className="font-bold text-foreground">{t.filterPanel.title}</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 rounded-md text-muted-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <FilterPanel activeFilters={activeFilters} onFiltersChange={setActiveFilters} t={t} />
            </div>
            <div className="p-4 border-t border-border sticky bottom-0 bg-card">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t.findJobs.applyFilters(filteredJobs.length)}
              </button>
            </div>
          </div>
        </div>
      )}

      <PublicFooter t={t} />
    </div>
  );
}