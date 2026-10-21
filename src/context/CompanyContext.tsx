import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { SEED_COMPANIES, type RawCompanyRecord } from '../data/seedCompanies';
import {
  normalizeCompanySummary,
  normalizeCompanyProfile,
  normalizeDashboardSkills,
  type CompanySummary,
  type CompanyProfile,
  type DashboardSkill
} from '../lib/companyData';

export interface SelectedCompanyRef {
  companyId: number;
  companyName: string;
  logoUrl: string;
}

const LOCAL_STORAGE_KEY = 'selected-company';

interface CompanyContextType {
  selectedCompanyRef: SelectedCompanyRef | null;
  rawRecord: RawCompanyRecord | null;
  summary: CompanySummary | null;
  profile: CompanyProfile | null;
  skills: DashboardSkill[];
  allCompanies: CompanySummary[];
  selectCompany: (companyId: number) => void;
  isReady: boolean;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [selectedRef, setSelectedRef] = useState<SelectedCompanyRef | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.companyId === 'number') {
          return parsed;
        }
      }
    } catch {
      // Ignore JSON parse errors
    }
    return null;
  });

  const [isReady, setIsReady] = useState(false);

  // Normalize list of all companies
  const allCompanies = useMemo(() => {
    return SEED_COMPANIES.map(c => normalizeCompanySummary(c.short_json, c.company_id));
  }, []);

  // Find the active company raw record based on selectedRef
  const activeRecord = useMemo<RawCompanyRecord | null>(() => {
    if (!selectedRef) return null;
    const found = SEED_COMPANIES.find(c => c.company_id === selectedRef.companyId);
    return found || null;
  }, [selectedRef]);

  // Derive normalized views
  const summary = useMemo<CompanySummary | null>(() => {
    if (!activeRecord) return null;
    return normalizeCompanySummary(activeRecord.short_json, activeRecord.company_id);
  }, [activeRecord]);

  const profile = useMemo<CompanyProfile | null>(() => {
    if (!activeRecord) return null;
    return normalizeCompanyProfile(activeRecord.full_json, activeRecord.short_json);
  }, [activeRecord]);

  const skills = useMemo<DashboardSkill[]>(() => {
    if (!activeRecord) return [];
    return normalizeDashboardSkills(activeRecord.skill_levels);
  }, [activeRecord]);

  const selectCompany = useCallback((companyId: number) => {
    const target = SEED_COMPANIES.find(c => c.company_id === companyId);
    if (target) {
      const ref: SelectedCompanyRef = {
        companyId: target.company_id,
        companyName: target.short_json.name,
        logoUrl: target.short_json.logo_url
      };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ref));
      } catch (err) {
        console.error('Failed to save to localStorage', err);
      }
      setSelectedRef(ref);
    }
  }, []);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <CompanyContext.Provider
      value={{
        selectedCompanyRef: selectedRef,
        rawRecord: activeRecord,
        summary,
        profile,
        skills,
        allCompanies,
        selectCompany,
        isReady
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}
