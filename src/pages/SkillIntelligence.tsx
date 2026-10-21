import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  Layers
} from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import { CompanyLogo } from '../components/CompanyLogo';
import { getSkillRoadmap } from '../data/skillTopics';
import { type DashboardSkill } from '../lib/companyData';

const BLOOM_TAXONOMY = [
  { code: 'CU', label: 'Understand', range: '1-2', hex: '#3b82f6', bg: 'bg-[#3b82f6]/10', text: 'text-[#3b82f6]', border: 'border-[#3b82f6]/30', desc: 'Recall & conceptual foundations' },
  { code: 'AP', label: 'Apply', range: '3-4', hex: '#22c55e', bg: 'bg-[#22c55e]/10', text: 'text-[#22c55e]', border: 'border-[#22c55e]/30', desc: 'Practical implementation & problem solving' },
  { code: 'AS', label: 'Analyze', range: '5-6', hex: '#eab308', bg: 'bg-[#eab308]/10', text: 'text-[#eab308]', border: 'border-[#eab308]/30', desc: 'Trade-offs, debugging & optimization' },
  { code: 'EV', label: 'Evaluate', range: '7-8', hex: '#ef4444', bg: 'bg-[#ef4444]/10', text: 'text-[#ef4444]', border: 'border-[#ef4444]/30', desc: 'Architectural assessment & critique' },
  { code: 'CR', label: 'Create', range: '9-10', hex: '#a855f7', bg: 'bg-[#a855f7]/10', text: 'text-[#a855f7]', border: 'border-[#a855f7]/30', desc: 'Novel system synthesis & innovation' }
];

const CRITICALITY_CONFIG = {
  Critical: {
    label: 'Critical Threshold',
    desc: 'Core interview eliminator. Must clear at required level.',
    badgeClass: 'bg-red-50 text-red-700 border-red-200'
  },
  Important: {
    label: 'Important Competency',
    desc: 'Thoroughly tested in round 2 & technical manager rounds.',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  Baseline: {
    label: 'Baseline Proficiency',
    desc: 'Expected prerequisite knowledge for candidate evaluation.',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200'
  }
};

export const SkillIntelligencePage: React.FC = () => {
  const { summary, skills, isReady } = useCompany();
  const navigate = useNavigate();

  // Track expanded roadmap accordions by skill_set_id
  const [expandedSkills, setExpandedSkills] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (isReady && !summary) {
      navigate('/', { replace: true });
    }
  }, [isReady, summary, navigate]);

  // Sort skills desc by required_level
  const sortedSkills = useMemo(() => {
    return [...skills].sort((a, b) => b.required_level - a.required_level);
  }, [skills]);

  const toggleExpand = (skillId: number) => {
    setExpandedSkills((prev) => ({
      ...prev,
      [skillId]: !prev[skillId]
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<number, boolean> = {};
    skills.forEach((s) => {
      allExpanded[s.skill_set_id] = true;
    });
    setExpandedSkills(allExpanded);
  };

  const collapseAll = () => {
    setExpandedSkills({});
  };

  if (!summary) return null;

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <CompanyLogo
                name={summary.name}
                logoUrl={summary.logo_url}
                websiteUrl={summary.website_url}
                size="lg"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                    {summary.name} Skill Intelligence
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Standardized technical and behavioral benchmark requirements for campus recruitment
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={expandAll}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Bloom 5-Column Legend */}
        <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900 font-heading uppercase tracking-wider">
                Bloom&apos;s Revised Cognitive Taxonomy (1 – 10 Ladder)
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Cognitive mastery benchmarks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {BLOOM_TAXONOMY.map((bloom) => (
              <div
                key={bloom.code}
                className={`p-3.5 rounded-lg border ${bloom.bg} ${bloom.border} flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${bloom.text} bg-white shadow-2xs`}>
                    {bloom.code}
                  </span>
                  <span className="text-xs font-bold text-slate-700 font-mono">
                    Levels {bloom.range}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 font-heading mt-1">
                  {bloom.label}
                </h3>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                  {bloom.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Criticality 3-Card Legend */}
        <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-slate-900 font-heading uppercase tracking-wider">
              Recruitment Evaluation Criticality Tiers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(['Critical', 'Important', 'Baseline'] as const).map((tier) => {
              const cfg = CRITICALITY_CONFIG[tier];
              return (
                <div
                  key={tier}
                  className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 font-heading">
                      {cfg.label}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.badgeClass}`}
                    >
                      {tier}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">{cfg.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 12 Skill Cards Sorted Descending */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 font-heading">
              Evaluated Skills & Competency Ladders ({sortedSkills.length})
            </h2>
            <span className="text-xs text-slate-500">
              Sorted by Target Level (Highest First)
            </span>
          </div>

          <div className="space-y-3">
            {sortedSkills.map((skill) => {
              const isExpanded = !!expandedSkills[skill.skill_set_id];
              const roadmap = getSkillRoadmap(skill.skill_set_name);
              const bloomInfo = BLOOM_TAXONOMY.find((b) => b.code === skill.bloom_level) || BLOOM_TAXONOMY[0];
              const critInfo = CRITICALITY_CONFIG[skill.criticality];

              // Percentage for progress bar (level / 10 * 100)
              const percent = Math.min(100, Math.max(0, (skill.required_level / 10) * 100));

              return (
                <div
                  key={skill.skill_set_id}
                  className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden transition-all duration-200"
                >
                  {/* Card Header / Summary Bar */}
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      {/* Left: Name and Badges */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm sm:text-base font-bold text-slate-900 font-heading">
                          {skill.skill_set_name}
                        </span>

                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold font-mono border ${bloomInfo.bg} ${bloomInfo.text} ${bloomInfo.border}`}
                        >
                          {skill.bloom_level} · {bloomInfo.label}
                        </span>

                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${critInfo.badgeClass}`}
                        >
                          {skill.criticality}
                        </span>
                      </div>

                      {/* Right: Score/10 */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                            {skill.required_level}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">/ 10</span>
                        </div>

                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                          {skill.required_proficiency}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percent}%`,
                          backgroundColor: bloomInfo.hex
                        }}
                      />
                    </div>

                    {/* Expand/Collapse Roadmap Trigger */}
                    <button
                      onClick={() => toggleExpand(skill.skill_set_id)}
                      className="w-full pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      <span>
                        {isExpanded
                          ? 'Hide 10-Level Curriculum Roadmap'
                          : 'View 10-Level Curriculum Roadmap'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Expanded 10-Level Roadmap Ladder */}
                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 pt-2 bg-slate-50/70 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-3 text-xs text-slate-500 font-medium">
                        <span>Levels 1 to {skill.required_level} required for {summary.short_name || summary.name}</span>
                        <span>Levels above {skill.required_level} are beyond scope</span>
                      </div>

                      <div className="space-y-2">
                        {roadmap.map((item) => {
                          const isRequired = item.level_number <= skill.required_level;
                          const isTargetLevel = item.level_number === skill.required_level;

                          return (
                            <div
                              key={item.level_number}
                              className={`p-2.5 rounded-lg border flex items-center justify-between gap-3 text-xs transition-colors ${
                                isTargetLevel
                                  ? 'bg-blue-50/80 border-blue-300 font-medium'
                                  : isRequired
                                  ? 'bg-white border-slate-200'
                                  : 'bg-slate-100/60 border-slate-200/50 text-slate-400 opacity-75'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div
                                  className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                                    isTargetLevel
                                      ? 'bg-blue-600 text-white'
                                      : isRequired
                                      ? 'bg-slate-200 text-slate-800'
                                      : 'bg-slate-200/70 text-slate-400'
                                  }`}
                                >
                                  {item.level_number}
                                </div>
                                <span className={`truncate ${isRequired ? 'text-slate-800' : 'text-slate-400'}`}>
                                  {item.topic}
                                </span>
                              </div>

                              <div className="shrink-0 flex items-center">
                                {isTargetLevel ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider">
                                    Target Level
                                  </span>
                                ) : isRequired ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>In-Scope</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                                    <Lock className="w-3 h-3 text-slate-400" />
                                    <span>Beyond scope</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
