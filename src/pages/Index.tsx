import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Building2, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import { CompanyCard, CATEGORY_COLORS } from '../components/CompanyCard';
import { type CompanySummary } from '../lib/companyData';

type FilterCategory = 'All' | 'Super Dream' | 'Dream' | 'Standard' | 'Regular';

export const IndexPage: React.FC = () => {
  const { allCompanies } = useCompany();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  const [isLoading, setIsLoading] = useState(false);

  // 200ms debounce on search input
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Compute live counts for all 5 filter categories
  const categoryCounts = useMemo(() => {
    const counts = {
      'All': allCompanies.length,
      'Super Dream': 0,
      'Dream': 0,
      'Standard': 0,
      'Regular': 0
    };

    allCompanies.forEach((c) => {
      const type = c.company_type as FilterCategory;
      if (counts[type] !== undefined) {
        counts[type]++;
      }
    });

    return counts;
  }, [allCompanies]);

  // Filter companies by debounced search and category
  const filteredCompanies = useMemo(() => {
    return allCompanies.filter((company) => {
      // Category filter
      if (selectedCategory !== 'All' && company.company_type !== selectedCategory) {
        return false;
      }

      // Search term filter
      if (!debouncedSearch.trim()) return true;

      const q = debouncedSearch.toLowerCase().trim();
      return (
        company.name.toLowerCase().includes(q) ||
        company.short_name.toLowerCase().includes(q) ||
        company.category.toLowerCase().includes(q) ||
        company.headquarters_address.toLowerCase().includes(q) ||
        company.office_locations.toLowerCase().includes(q)
      );
    });
  }, [allCompanies, selectedCategory, debouncedSearch]);

  const filterTabs: Array<{ id: FilterCategory; label: string; count: number; colorHex: string }> = [
    { id: 'All', label: 'All Companies', count: categoryCounts['All'], colorHex: '#2563eb' },
    { id: 'Super Dream', label: 'Super Dream', count: categoryCounts['Super Dream'], colorHex: '#7c3aed' },
    { id: 'Dream', label: 'Dream', count: categoryCounts['Dream'], colorHex: '#2563eb' },
    { id: 'Standard', label: 'Standard', count: categoryCounts['Standard'], colorHex: '#16a34a' },
    { id: 'Regular', label: 'Regular', count: categoryCounts['Regular'], colorHex: '#d97706' }
  ];

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Navigation Bar: Google Workspace Clean Style */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading tracking-tight">
              JSS Academy of Technical Education
            </span>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              JSSATE · INTELLIGENCE PLATFORM
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">
              {allCompanies.length} Recruiters Indexed
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section: White background, bottom border, large heading, small subtitle, search bar directly below */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 mb-4 border border-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Placement Intelligence & Analytics Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight mb-3">
            JSS Academy of Technical Education Companies Research & Placement Analytics Portal
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 font-normal">
            Your strategic edge for campus placements
          </p>

          {/* Search bar directly below */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search companies by name, domain, headquarters, or delivery center..."
                className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-xs"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                  className="absolute right-3.5 p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter Pills with Live Counts */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full">
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              const catStyle = tab.id === 'All' ? null : CATEGORY_COLORS[tab.id];

              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {tab.id !== 'All' && catStyle && (
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: tab.colorHex }}
                    />
                  )}
                  <span>{tab.label}</span>
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[11px] font-mono tabular-nums ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-semibold text-slate-900">{filteredCompanies.length}</span> of {allCompanies.length}
          </div>
        </div>

        {/* 8-Card Skeleton when loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 h-64 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-slate-200 rounded-lg" />
                    <div className="w-16 h-5 bg-slate-200 rounded-full" />
                  </div>
                  <div className="w-3/4 h-5 bg-slate-200 rounded mb-2" />
                  <div className="w-1/2 h-3 bg-slate-200 rounded mb-4" />
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-slate-200 rounded" />
                    <div className="w-5/6 h-3 bg-slate-200 rounded" />
                  </div>
                </div>
                <div className="w-full h-8 bg-slate-100 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Loaded Companies Grid */}
        {!isLoading && filteredCompanies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.company_id} company={company} />
            ))}
          </div>
        )}

        {/* Empty State with Reset CTA */}
        {!isLoading && filteredCompanies.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1 font-heading">
              No matching recruiters found
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              We couldn't find any companies matching your search query &quot;{searchTerm}&quot; in the &quot;{selectedCategory}&quot; category.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
