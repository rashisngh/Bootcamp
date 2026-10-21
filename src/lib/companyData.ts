/**
 * Data layer normalizers for company intelligence and skills.
 * Works with SEED_COMPANIES in Phase 1, ready for Supabase JSON shapes in Phase 2.
 */

export interface CompanySummary {
  company_id: number;
  name: string;
  short_name: string;
  logo_url: string;
  category: string;
  company_type: 'Super Dream' | 'Dream' | 'Standard' | 'Regular' | string;
  incorporation_year: number | string;
  employee_size: string;
  headquarters_address: string;
  operating_countries: string;
  office_locations: string;
  yoy_growth_rate: string;
  website_url: string;
}

export type CompanyProfile = Record<string, any>;

export interface DashboardSkill {
  skill_set_id: number;
  skill_set_name: string;
  required_level: number;
  required_proficiency: string;
  bloom_level: 'CU' | 'AP' | 'AS' | 'EV' | 'CR';
  bloom_title: string;
  criticality: 'Critical' | 'Important' | 'Baseline';
  difficulty: 'EXPERT' | 'ADVANCED' | 'PRO' | 'BEGINNER';
}

export function asString(value: unknown, fallback: string = ''): string {
  if (value === null || value === undefined) return fallback;
  return String(value).trim();
}

export function asRecord(value: unknown): Record<string, any> {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return value as Record<string, any>;
  }
  return {};
}

export function splitItems(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map(v => String(v).trim()).filter(Boolean);
  }
  const str = String(value);
  // Split on newlines, semicolons, bullets (•), or commas where appropriate
  return str
    .split(/[\n;•]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && !['na', 'n/a', 'none', '-'].includes(s.toLowerCase()));
}

export function titleCaseFromCode(str: string): string {
  if (!str) return '';
  return str
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function scoreToDifficulty(score: number): 'EXPERT' | 'ADVANCED' | 'PRO' | 'BEGINNER' {
  if (score >= 8) return 'EXPERT';
  if (score >= 6) return 'ADVANCED';
  if (score >= 4) return 'PRO';
  return 'BEGINNER';
}

export function proficiencyToBloom(level: number): {
  code: 'CU' | 'AP' | 'AS' | 'EV' | 'CR';
  title: string;
  color: string;
} {
  if (level <= 2) return { code: 'CU', title: 'Understand (Conceptual)', color: '#3b82f6' };
  if (level <= 4) return { code: 'AP', title: 'Apply (Practical)', color: '#22c55e' };
  if (level <= 6) return { code: 'AS', title: 'Analyze (Analytical)', color: '#eab308' };
  if (level <= 8) return { code: 'EV', title: 'Evaluate (Architectural)', color: '#ef4444' };
  return { code: 'CR', title: 'Create (Synthesize)', color: '#a855f7' };
}

export function scoreToCriticality(score: number): 'Critical' | 'Important' | 'Baseline' {
  if (score >= 7) return 'Critical';
  if (score >= 5) return 'Important';
  return 'Baseline';
}

export function normalizeCompanySummary(short_json: Record<string, any>, company_id: number = 1): CompanySummary {
  const data = asRecord(short_json);
  return {
    company_id: Number(data.company_id || company_id || 1),
    name: asString(data.name, 'Unknown Company'),
    short_name: asString(data.short_name, asString(data.name, 'Company')),
    logo_url: asString(data.logo_url),
    category: asString(data.category, 'Enterprise'),
    company_type: asString(data.company_type, 'Dream'),
    incorporation_year: data.incorporation_year || 'NA',
    employee_size: asString(data.employee_size, 'NA'),
    headquarters_address: asString(data.headquarters_address, 'NA'),
    operating_countries: asString(data.operating_countries, 'NA'),
    office_locations: asString(data.office_locations, 'NA'),
    yoy_growth_rate: asString(data.yoy_growth_rate, 'NA'),
    website_url: asString(data.website_url, '')
  };
}

export function normalizeCompanyProfile(
  full_json: Record<string, any>,
  short_json?: Record<string, any>
): CompanyProfile {
  const full = asRecord(full_json);
  const short = asRecord(short_json);
  const merged = { ...short, ...full };

  // Strict sanitization: ensure no CTC, Stipend, or Selection Ratio keys exist
  delete merged.ctc;
  delete merged.stipend;
  delete merged.selection_ratio;
  delete merged.average_ctc;
  delete merged.highest_ctc;
  delete merged.base_ctc;
  delete merged.stipend_amount;

  return merged;
}

export function normalizeDashboardSkills(
  skillLevels: Array<{
    skill_set_id: number;
    skill_set_name: string;
    required_level: number;
    required_proficiency?: string;
  }>
): DashboardSkill[] {
  if (!Array.isArray(skillLevels)) return [];

  return skillLevels.map((s) => {
    const level = Number(s.required_level) || 1;
    const bloom = proficiencyToBloom(level);
    return {
      skill_set_id: s.skill_set_id,
      skill_set_name: s.skill_set_name,
      required_level: level,
      required_proficiency: s.required_proficiency || 'Proficient',
      bloom_level: bloom.code,
      bloom_title: bloom.title,
      criticality: scoreToCriticality(level),
      difficulty: scoreToDifficulty(level)
    };
  });
}
