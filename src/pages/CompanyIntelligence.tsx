import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe,
  Linkedin,
  ExternalLink,
  PlayCircle,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import { CompanyLogo } from '../components/CompanyLogo';
import {
  buildIntelligenceSections,
  isNullish,
  type IntelligenceField,
  type IntelligenceSection
} from '../data/intelligenceData';
import { splitItems } from '../lib/companyData';

interface FieldRowProps {
  field: IntelligenceField;
}

const FieldRow: React.FC<FieldRowProps> = React.memo(({ field }) => {
  const { label, value, format } = field;

  const renderFieldValue = () => {
    if (isNullish(value)) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-400 font-medium italic">
          Not Available
        </span>
      );
    }

    const strValue = String(value).trim();

    // Specific format: URL
    if (format === 'url' || (strValue.startsWith('http://') || strValue.startsWith('https://'))) {
      return (
        <a
          href={strValue}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium break-all"
        >
          <span>{strValue}</span>
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        </a>
      );
    }

    // Specific format: Video
    if (format === 'video') {
      return (
        <a
          href={strValue}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-lg text-xs font-semibold transition-colors"
        >
          <PlayCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>Watch Corporate Media Channel</span>
          <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      );
    }

    // Specific format: Email
    if (format === 'email' || (strValue.includes('@') && !strValue.includes(' '))) {
      return (
        <a
          href={`mailto:${strValue}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-blue-600 hover:underline font-medium"
        >
          <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          <span>{strValue}</span>
        </a>
      );
    }

    // Specific format: Phone
    if (format === 'phone') {
      return (
        <a
          href={`tel:${strValue}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-800 hover:text-blue-600 font-mono"
        >
          <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          <span>{strValue}</span>
        </a>
      );
    }

    // List detection (semicolons, newlines, or explicitly marked format: 'list')
    if (format === 'list' || strValue.includes(';')) {
      const items = splitItems(strValue);
      if (items.length > 1) {
        return (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {items.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200/80"
              >
                {item}
              </span>
            ))}
          </div>
        );
      }
    }

    // Multi-line or paragraph text
    if (strValue.length > 140) {
      return (
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
          {strValue}
        </p>
      );
    }

    // Standard single value
    return (
      <span className="text-xs sm:text-sm text-slate-800 font-medium">
        {strValue}
      </span>
    );
  };

  return (
    <div className="py-3 sm:py-3.5 border-b border-slate-100 last:border-b-0 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
      <div className="sm:w-1/3 shrink-0">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="sm:w-2/3 min-w-0">
        {renderFieldValue()}
      </div>
    </div>
  );
});

FieldRow.displayName = 'FieldRow';

export const CompanyIntelligencePage: React.FC = () => {
  const { summary, profile, isReady } = useCompany();
  const navigate = useNavigate();

  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const isScrollingRef = useRef(false);
  const tabListRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Guard: if company is missing after load, navigate to "/"
  useEffect(() => {
    if (isReady && !summary) {
      navigate('/', { replace: true });
    }
  }, [isReady, summary, navigate]);

  // Build the 22 sections from profile
  const sections: IntelligenceSection[] = useMemo(() => {
    return buildIntelligenceSections(profile || {});
  }, [profile]);

  // Scroll spy implementation with IntersectionObserver
  useEffect(() => {
    if (sections.length === 0) return;

    const observers: IntersectionObserver[] = [];
    sectionRefs.current = sectionRefs.current.slice(0, sections.length);

    sections.forEach((_, idx) => {
      const el = sectionRefs.current[idx];
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (isScrollingRef.current) return;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveTabIdx(idx);
            }
          });
        },
        {
          rootMargin: '-20% 0px -70% 0px',
          threshold: 0
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [sections]);

  // Auto-center active tab in tab list
  useEffect(() => {
    if (!tabListRef.current) return;
    const tabBtn = tabListRef.current.children[activeTabIdx] as HTMLElement;
    if (tabBtn) {
      const container = tabListRef.current;
      const scrollLeft =
        tabBtn.offsetLeft - container.offsetWidth / 2 + tabBtn.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeTabIdx]);

  const scrollToSection = useCallback((idx: number) => {
    setActiveTabIdx(idx);
    isScrollingRef.current = true;
    const targetEl = sectionRefs.current[idx];
    if (targetEl) {
      const offsetTop = targetEl.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 700);
    }
  }, []);

  if (!summary) {
    return null;
  }

  const linkedinUrl = profile?.linkedin_url;
  const websiteUrl = summary.website_url || profile?.website_url;

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      {/* Sticky Top Information Bar:
          Left: Company logo, Company name, Industry badge
          Right: Website button, LinkedIn button
          NO hero section, NO gradient background
      */}
      <div className="sticky top-14 z-20 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 flex-wrap">
          {/* Left info cluster */}
          <div className="flex items-center gap-3.5 min-w-0">
            <CompanyLogo
              name={summary.name}
              logoUrl={summary.logo_url}
              websiteUrl={summary.website_url}
              size="md"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 font-heading truncate">
                  {summary.name}
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                  {summary.category || 'Enterprise'}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                  {summary.company_type || 'Dream'}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate mt-0.5">
                {summary.headquarters_address} · {summary.employee_size}
              </p>
            </div>
          </div>

          {/* Right link buttons */}
          <div className="flex items-center gap-2">
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>Website</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}

            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0077B5] hover:bg-[#006097] text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-white/80" />
              </a>
            )}
          </div>
        </div>

        {/* Sticky 22 Tab Bar with Scroll-Spy & Auto-Center */}
        <div className="border-t border-slate-100 bg-[#F8FAFC]">
          <div
            ref={tabListRef}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto py-2 scrollbar-none"
          >
            {sections.map((sec, idx) => {
              const isActive = activeTabIdx === idx;
              const Icon = sec.icon;

              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(idx)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{sec.title}</span>
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-600'
                    }`}
                  >
                    {sec.availableCount}/{sec.fields.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 22 Intelligence Section Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {sections.map((section, idx) => {
          const Icon = section.icon;

          return (
            <section
              key={section.id}
              id={section.id}
              ref={(el) => {
                sectionRefs.current[idx] = el;
              }}
              className="scroll-mt-36 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden"
            >
              {/* Section Header */}
              <div className="px-5 py-4 border-b border-slate-200 bg-white flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 font-heading">
                      {section.title}
                    </h2>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Section {idx + 1} of 22
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{section.availableCount} Available</span>
                  </span>
                </div>
              </div>

              {/* Section Fields */}
              <div className="px-5 py-2 divide-y divide-slate-100">
                {section.fields.map((field) => (
                  <FieldRow key={field.key} field={field} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
