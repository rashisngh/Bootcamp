# JSS Academy of Technical Education (JSSATE) Companies Research & Placement Analytics Portal

The **JSS Academy of Technical Education Companies Research & Placement Analytics Portal** (also known as **JSSATE Placement Intelligence Hub**) is an enterprise campus placement intelligence platform built for students, placement cells, and hiring coordinators.

---

## Scope & Architectural Principles (Phase 1)

1. **UI-Only with Hardcoded Seed Data**:
   - Phase 1 focuses exclusively on a responsive, mobile-first frontend user experience.
   - All recruiter intelligence profiles and skills data are powered by the baseline seed file (`src/data/seedCompanies.ts`), featuring a reference record for **Accenture plc** across all 22 intelligence sections and 12 curriculum skills.
   - **No Database / No Supabase in Phase 1**: No database, no Supabase tables, migrations, RLS policies, or Supabase JS client libraries are included in this phase.

2. **Fully Public Access (No Login / No Auth)**:
   - The portal is 100% accessible to any visitor directly without authentication.
   - There are **no login screens**, **no protected routes**, and **no auth guards**.
   - Every route (`/`, `/company/intelligence`, `/company/skills`) is directly reachable.

3. **College Identity & College Name**:
   - **Full College Name**: `JSS Academy of Technical Education`
   - **College Short Tag**: `JSSATE`
   - In accordance with privacy and brand guidelines, **no college logo file or image asset** is used anywhere. The branding utilizes pure typography: the `JSS Academy of Technical Education` display wordmark and a `JSSATE · INTELLIGENCE PLATFORM` tag. (Recruiter logos for companies like Accenture remain supported).

4. **Phase 2 Migration Path (Supabase Ready)**:
   - The data layer in `src/lib/companyData.ts` contains pure normalizers (`normalizeCompanySummary`, `normalizeCompanyProfile`, `normalizeDashboardSkills`) designed around the exact future JSONB shapes (`short_json`, `full_json`, `skill_levels`).
   - When Phase 2 begins, swapping the hardcoded seed source to Supabase queries will be an isolated single-file update without requiring component refactoring.

5. **Placement Metric Compliance**:
   - The portal strictly omits CTC, Stipend, and Selection Ratio metrics anywhere in the interface in compliance with platform guidelines.

---

## Navigation & Core Routes

- `/`: Company search & placement tier directory with live filters (`All`, `Super Dream`, `Dream`, `Standard`, `Regular`).
- `/company`: Automatically redirects to `/company/intelligence`.
- `/company/intelligence`: 22-section deep-dive intelligence with sticky scroll-spy and quick links.
- `/company/skills`: 12-skill competency matrix with Bloom's Revised Taxonomy (CU/AP/AS/EV/CR), evaluation criticality tiers, and expandable 10-level learning roadmaps.
- `*`: Custom 404 handler for invalid routes.

---

## Development & Testing

```bash
# Start development server
npm run dev

# Run TypeScript check
npm run lint

# Run Vitest smoke tests
npm run test

# Build production bundle
npm run build
```
