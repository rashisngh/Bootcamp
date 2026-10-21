import { describe, it, expect } from 'vitest';
import { SEED_COMPANIES } from '../src/data/seedCompanies';
import {
  normalizeCompanySummary,
  normalizeCompanyProfile,
  normalizeDashboardSkills
} from '../src/lib/companyData';
import { buildIntelligenceSections } from '../src/data/intelligenceData';
import { SKILL_TOPICS_ROADMAP } from '../src/data/skillTopics';

describe('JSSATE Placement Intelligence Smoke Tests', () => {
  it('loads SEED_COMPANIES with valid Accenture reference record', () => {
    expect(SEED_COMPANIES.length).toBeGreaterThanOrEqual(1);
    const accenture = SEED_COMPANIES[0];
    expect(accenture.short_json.name).toBe('Accenture plc');
    expect(accenture.short_json.company_type).toBe('Dream');
  });

  it('normalizes company summary properly', () => {
    const accenture = SEED_COMPANIES[0];
    const summary = normalizeCompanySummary(accenture.short_json, accenture.company_id);
    expect(summary.company_id).toBe(1);
    expect(summary.name).toBe('Accenture plc');
    expect(summary.headquarters_address).toContain('Dublin');
  });

  it('strictly excludes CTC, stipend, and selection ratio from company profile', () => {
    const rawWithForbiddenKeys = {
      ...SEED_COMPANIES[0].full_json,
      ctc: '25 LPA',
      stipend: '50k',
      selection_ratio: '2%'
    };
    const profile = normalizeCompanyProfile(rawWithForbiddenKeys);
    expect(profile.ctc).toBeUndefined();
    expect(profile.stipend).toBeUndefined();
    expect(profile.selection_ratio).toBeUndefined();
  });

  it('builds exactly 22 intelligence sections', () => {
    const accenture = SEED_COMPANIES[0];
    const profile = normalizeCompanyProfile(accenture.full_json, accenture.short_json);
    const sections = buildIntelligenceSections(profile);
    expect(sections.length).toBe(22);
    expect(sections[0].title).toBe('Company Identity');
    expect(sections[21].title).toBe('Contact Information');
  });

  it('normalizes 12 skills and maps roadmaps', () => {
    const accenture = SEED_COMPANIES[0];
    const skills = normalizeDashboardSkills(accenture.skill_levels);
    expect(skills.length).toBe(12);

    const dsa = skills.find(s => s.skill_set_name === 'Data Structures & Algorithms');
    expect(dsa).toBeDefined();
    expect(dsa?.required_level).toBe(8);
    expect(dsa?.bloom_level).toBe('EV');
    expect(dsa?.criticality).toBe('Critical');

    // Verify roadmap has 10 topics for DSA
    expect(SKILL_TOPICS_ROADMAP['Data Structures & Algorithms'].length).toBe(10);
  });
});
