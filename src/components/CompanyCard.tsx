import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { CompanyLogo } from './CompanyLogo';
import { useCompany } from '../context/CompanyContext';
import { type CompanySummary } from '../lib/companyData';

interface CompanyCardProps {
  company: CompanySummary;
}

export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; hex: string }> = {
  'Super Dream': { bg: 'bg-[#7c3aed]/10', text: 'text-[#7c3aed]', border: 'border-[#7c3aed]/20', hex: '#7c3aed' },
  'Dream': { bg: 'bg-[#2563eb]/10', text: 'text-[#2563eb]', border: 'border-[#2563eb]/20', hex: '#2563eb' },
  'Standard': { bg: 'bg-[#16a34a]/10', text: 'text-[#16a34a]', border: 'border-[#16a34a]/20', hex: '#16a34a' },
  'Regular': { bg: 'bg-[#d97706]/10', text: 'text-[#d97706]', border: 'border-[#d97706]/20', hex: '#d97706' }
};

export function getCategoryColor(type: string) {
  return CATEGORY_COLORS[type] || CATEGORY_COLORS['Dream'];
}

function formatMeta(val: unknown): React.ReactNode {
  if (val === null || val === undefined) return <span className="italic text-slate-400">not publicly available</span>;
  const str = String(val).trim();
  const lower = str.toLowerCase();
  if (lower === '' || lower === 'na' || lower === 'n/a' || lower === 'none' || lower === '-' || lower === 'null' || lower === 'undefined') {
    return <span className="italic text-slate-400">not publicly available</span>;
  }
  return <span>{str}</span>;
}

export const CompanyCard = React.memo(function CompanyCard({ company }: CompanyCardProps) {
  const navigate = useNavigate();
  const { selectCompany } = useCompany();

  const handleSelect = () => {
    // 1. Save selected-company to localStorage
    const ref = {
      companyId: company.company_id,
      companyName: company.name,
      logoUrl: company.logo_url
    };
    try {
      localStorage.setItem('selected-company', JSON.stringify(ref));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }

    // 2. Update CompanyContext
    selectCompany(company.company_id);

    // 3. Navigate to /company/intelligence
    navigate('/company/intelligence');
  };

  const catStyle = getCategoryColor(company.company_type);
  const isNegativeGrowth = String(company.yoy_growth_rate).trim().startsWith('-');

  return (
    <div
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      }}
      className="group relative flex flex-col justify-between p-5 bg-white rounded-xl border border-slate-200/90 hover:border-blue-400/80 hover:shadow-md transition-all duration-200 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div>
        {/* Top Header: Logo & Placement Tier Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <CompanyLogo
            name={company.name}
            logoUrl={company.logo_url}
            websiteUrl={company.website_url}
            size="md"
          />
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
          >
            {company.company_type || 'Dream'}
          </span>
        </div>

        {/* Company Name & Short Name */}
        <div className="mb-3">
          <h3 className="text-base font-bold text-slate-900 font-heading leading-snug group-hover:text-blue-600 transition-colors">
            {company.name}
          </h3>
          {company.short_name && company.short_name !== company.name && (
            <p className="text-xs text-slate-500 font-medium mt-0.5">{company.short_name}</p>
          )}
        </div>

        {/* Metadata items */}
        <div className="space-y-2 text-xs text-slate-600 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{formatMeta(company.headquarters_address)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{formatMeta(company.employee_size)}</span>
          </div>

          <div className="flex items-center gap-2">
            {isNegativeGrowth ? (
              <TrendingDown className="w-3.5 h-3.5 text-red-500 shrink-0" />
            ) : (
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            )}
            <span className={`font-mono tabular-nums ${isNegativeGrowth ? 'text-red-600 font-medium' : 'text-slate-700'}`}>
              YoY: {formatMeta(company.yoy_growth_rate)}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer with action link */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500 group-hover:text-blue-600 transition-colors">
        <span>View Intelligence</span>
        <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </div>
  );
});
