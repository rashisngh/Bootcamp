import React from 'react';
import {
  Building2,
  Compass,
  Users,
  Coins,
  Globe2,
  Boxes,
  Cpu,
  Network,
  Swords,
  TrendingUp,
  HeartHandshake,
  Coffee,
  Newspaper,
  BarChart3,
  ShieldAlert,
  MapPin,
  HeartPulse,
  GraduationCap,
  Award,
  Wallet,
  Share2,
  Mail,
  type LucideIcon
} from 'lucide-react';

export interface IntelligenceField {
  key: string;
  label: string;
  value?: any;
  format?: 'text' | 'url' | 'video' | 'rating' | 'list' | 'email' | 'phone';
}

export interface IntelligenceSection {
  id: string;
  index: number;
  title: string;
  icon: LucideIcon;
  fields: IntelligenceField[];
  availableCount: number;
}

export function isNullish(val: unknown): boolean {
  if (val === null || val === undefined) return true;
  const str = String(val).trim().toLowerCase();
  return (
    str === '' ||
    str === 'na' ||
    str === 'n/a' ||
    str === 'none' ||
    str === '-' ||
    str === 'null' ||
    str === 'undefined' ||
    str === 'not applicable'
  );
}

export function buildIntelligenceSections(profile: Record<string, any> = {}): IntelligenceSection[] {
  const sectionsConfig: Array<{
    id: string;
    title: string;
    icon: LucideIcon;
    fields: Array<{ key: string; label: string; format?: IntelligenceField['format'] }>;
  }> = [
    {
      id: 'identity',
      title: 'Company Identity',
      icon: Building2,
      fields: [
        { key: 'name', label: 'Company Name' },
        { key: 'short_name', label: 'Short Name / Ticker' },
        { key: 'category', label: 'Industry Category' },
        { key: 'company_type', label: 'Campus Placement Tier' },
        { key: 'incorporation_year', label: 'Incorporation Year' },
        { key: 'nature_of_company', label: 'Nature of Company (Public / Private)' },
        { key: 'company_maturity', label: 'Company Maturity Level' }
      ]
    },
    {
      id: 'overview-vision',
      title: 'Overview & Vision',
      icon: Compass,
      fields: [
        { key: 'overview_text', label: 'Company Overview' },
        { key: 'vision_statement', label: 'Vision Statement' },
        { key: 'mission_statement', label: 'Mission Statement' },
        { key: 'core_values', label: 'Core Values & Principles', format: 'list' },
        { key: 'history_timeline', label: 'Milestones & History Timeline' }
      ]
    },
    {
      id: 'leadership',
      title: 'Leadership',
      icon: Users,
      fields: [
        { key: 'ceo_name', label: 'Chief Executive Officer (CEO)' },
        { key: 'ceo_linkedin_url', label: 'CEO LinkedIn Profile', format: 'url' },
        { key: 'key_leaders', label: 'Executive Leadership Team', format: 'list' },
        { key: 'board_members', label: 'Board of Directors', format: 'list' },
        { key: 'warm_intro_pathways', label: 'Warm Introduction Pathways & Networks' },
        { key: 'decision_maker_access', label: 'Decision Maker Accessibility' }
      ]
    },
    {
      id: 'financials',
      title: 'Funding & Financials',
      icon: Coins,
      fields: [
        { key: 'annual_revenue', label: 'Annual Revenue' },
        { key: 'annual_profit', label: 'Net Income / Profitability' },
        { key: 'revenue_mix', label: 'Revenue Mix / Segments' },
        { key: 'valuation', label: 'Market Capitalization / Valuation' },
        { key: 'yoy_growth_rate', label: 'Year-over-Year (YoY) Growth' },
        { key: 'profitability_status', label: 'Profitability Status' },
        { key: 'key_investors', label: 'Key Institutional Investors', format: 'list' },
        { key: 'recent_funding_rounds', label: 'Funding Rounds & Capital Type' },
        { key: 'total_capital_raised', label: 'Total Capital Raised' },
        { key: 'customer_acquisition_cost', label: 'Customer Acquisition Cost (CAC)' },
        { key: 'customer_lifetime_value', label: 'Customer Lifetime Value (LTV)' },
        { key: 'cac_ltv_ratio', label: 'CAC / LTV Ratio' },
        { key: 'churn_rate', label: 'Annual Churn Rate' },
        { key: 'net_promoter_score', label: 'Net Promoter Score (NPS)' },
        { key: 'burn_rate', label: 'Monthly Burn Rate' },
        { key: 'runway_months', label: 'Cash Runway (Months)' },
        { key: 'burn_multiplier', label: 'Burn Multiplier' }
      ]
    },
    {
      id: 'global-presence',
      title: 'Global Presence',
      icon: Globe2,
      fields: [
        { key: 'headquarters_address', label: 'Global Headquarters' },
        { key: 'operating_countries', label: 'Operating Countries', format: 'list' },
        { key: 'office_count', label: 'Total Offices' },
        { key: 'office_locations', label: 'Major Delivery & Innovation Centers', format: 'list' },
        { key: 'employee_size', label: 'Global Workforce Size' },
        { key: 'airport_commute_time', label: 'Airport Commute Proximity' },
        { key: 'location_centrality', label: 'Location Centrality & Business Hub' }
      ]
    },
    {
      id: 'products-services',
      title: 'Products & Services',
      icon: Boxes,
      fields: [
        { key: 'offerings_description', label: 'Core Offerings & Service Lines', format: 'list' },
        { key: 'focus_sectors', label: 'Key Industry Verticals Served', format: 'list' },
        { key: 'top_customers', label: 'Top Enterprise Clients', format: 'list' },
        { key: 'product_pipeline', label: 'Upcoming Product Pipeline & Accelerators' },
        { key: 'innovation_roadmap', label: 'Technology & Innovation Roadmap' },
        { key: 'case_studies', label: 'Featured Client Case Studies', format: 'list' }
      ]
    },
    {
      id: 'tech-stack',
      title: 'Technology Stack',
      icon: Cpu,
      fields: [
        { key: 'tech_stack', label: 'Primary Tech Stack & Enterprise Tools', format: 'list' },
        { key: 'ai_ml_adoption_level', label: 'AI / ML & GenAI Adoption Level' },
        { key: 'tech_adoption_rating', label: 'Tech Modernization Rating' },
        { key: 'cybersecurity_posture', label: 'Cybersecurity Posture & Certifications' },
        { key: 'r_and_d_investment', label: 'Annual R&D Investment' },
        { key: 'intellectual_property', label: 'Proprietary IP & Innovation Labs' }
      ]
    },
    {
      id: 'partnerships',
      title: 'Partnerships & Ecosystem',
      icon: Network,
      fields: [
        { key: 'technology_partners', label: 'Tier-1 Technology Alliances', format: 'list' },
        { key: 'partnership_ecosystem', label: 'Partner & Reseller Ecosystem', format: 'list' },
        { key: 'industry_associations', label: 'Industry Consortiums & Memberships', format: 'list' }
      ]
    },
    {
      id: 'competitive-landscape',
      title: 'Competitive Landscape',
      icon: Swords,
      fields: [
        { key: 'key_competitors', label: 'Direct & Indirect Competitors', format: 'list' },
        { key: 'competitive_advantages', label: 'Key Competitive Moats' },
        { key: 'unique_differentiators', label: 'Unique Market Differentiators' },
        { key: 'weaknesses_gaps', label: 'Organizational & Market Gaps' },
        { key: 'key_challenges_needs', label: 'Key Industry Challenges & Urgent Needs' },
        { key: 'market_share_percentage', label: 'Market Share Percentage' },
        { key: 'benchmark_vs_peers', label: 'Peer Benchmarking Analysis' }
      ]
    },
    {
      id: 'market-opportunity',
      title: 'Market Opportunity',
      icon: TrendingUp,
      fields: [
        { key: 'tam', label: 'Total Addressable Market (TAM)' },
        { key: 'sam', label: 'Serviceable Addressable Market (SAM)' },
        { key: 'som', label: 'Serviceable Obtainable Market (SOM)' },
        { key: 'future_projections', label: 'Future Revenue & Market Projections' },
        { key: 'strategic_priorities', label: 'Long-term Strategic Priorities' },
        { key: 'go_to_market_strategy', label: 'Go-to-Market (GTM) Strategy' }
      ]
    },
    {
      id: 'core-value-esg',
      title: 'Core Value Proposition & ESG',
      icon: HeartHandshake,
      fields: [
        { key: 'core_value_proposition', label: 'Core Value Proposition' },
        { key: 'pain_points_addressed', label: 'Client Pain Points Solved', format: 'list' },
        { key: 'esg_ratings', label: 'ESG Certifications & Initiatives', format: 'list' },
        { key: 'carbon_footprint', label: 'Carbon Neutrality & Net-Zero Targets' },
        { key: 'ethical_sourcing', label: 'Ethical Sourcing & Supplier Standards' },
        { key: 'sustainability_csr', label: 'CSR & Community Engagement Programs' }
      ]
    },
    {
      id: 'culture-work-life',
      title: 'Culture & Work Life',
      icon: Coffee,
      fields: [
        { key: 'work_culture_summary', label: 'Workplace Culture Overview' },
        { key: 'manager_quality', label: 'Manager Quality & Coaching Stance' },
        { key: 'psychological_safety', label: 'Psychological Safety & Openness' },
        { key: 'feedback_culture', label: 'Performance Feedback Frequency' },
        { key: 'diversity_metrics', label: 'Workforce Diversity & Representation' },
        { key: 'diversity_inclusion_score', label: 'Diversity & Inclusion Policies' },
        { key: 'burnout_risk', label: 'Workload & Burnout Risk Assessment' },
        { key: 'layoff_history', label: 'Restructuring & Layoff History' },
        { key: 'crisis_behavior', label: 'Executive Behavior During Crises' },
        { key: 'mission_clarity', label: 'Mission Alignment & Employee Clarity' }
      ]
    },
    {
      id: 'news-milestones',
      title: 'Recent News & Milestones',
      icon: Newspaper,
      fields: [
        { key: 'recent_news', label: 'Recent Corporate Announcements', format: 'list' },
        { key: 'awards_recognitions', label: 'Major Industry Awards & Accolades', format: 'list' },
        { key: 'event_participation', label: 'Key Conferences & Global Summits', format: 'list' }
      ]
    },
    {
      id: 'sales-customer',
      title: 'Sales & Customer Metrics',
      icon: BarChart3,
      fields: [
        { key: 'sales_motion', label: 'Go-To-Market & Sales Motion' },
        { key: 'customer_testimonials', label: 'Customer Success & Transformation Stories', format: 'list' },
        { key: 'customer_concentration_risk', label: 'Client Concentration Risk' },
        { key: 'exit_strategy_history', label: 'Corporate M&A & Acquisition History' }
      ]
    },
    {
      id: 'risk-compliance',
      title: 'Risk & Compliance',
      icon: ShieldAlert,
      fields: [
        { key: 'regulatory_status', label: 'Regulatory Frameworks & Standards', format: 'list' },
        { key: 'legal_issues', label: 'Legal & Dispute Posture' },
        { key: 'supply_chain_dependencies', label: 'Key Supply Chain Dependencies', format: 'list' },
        { key: 'geopolitical_risks', label: 'Geopolitical & Regional Risks', format: 'list' },
        { key: 'macro_risks', label: 'Macroeconomic Vulnerabilities', format: 'list' },
        { key: 'ethical_standards', label: 'Corporate Ethics & Whistleblower Standards' }
      ]
    },
    {
      id: 'work-location',
      title: 'Work Location & Commute',
      icon: MapPin,
      fields: [
        { key: 'remote_policy_details', label: 'Remote / In-Office Policy' },
        { key: 'typical_hours', label: 'Standard Working Hours & Flexibility' },
        { key: 'overtime_expectations', label: 'Overtime & On-Call Expectations' },
        { key: 'weekend_work', label: 'Weekend Work Occurrence' },
        { key: 'flexibility_level', label: 'Workplace Flexibility Mode' },
        { key: 'office_zone_type', label: 'Office Campus Zone Type' },
        { key: 'public_transport_access', label: 'Public Transit Accessibility', format: 'list' },
        { key: 'cab_policy', label: 'Cab & Transportation Reimbursement' }
      ]
    },
    {
      id: 'safety-wellbeing',
      title: 'Safety & Wellbeing',
      icon: HeartPulse,
      fields: [
        { key: 'area_safety', label: 'Campus & Surrounding Area Safety' },
        { key: 'safety_policies', label: 'Night Transport & Safety Protocols' },
        { key: 'infrastructure_safety', label: 'Building & Infrastructure Safety' },
        { key: 'emergency_preparedness', label: 'Emergency & Medical Preparedness' },
        { key: 'health_support', label: 'Mental Wellness & Health Resources' }
      ]
    },
    {
      id: 'career-growth',
      title: 'Career Growth & Learning',
      icon: GraduationCap,
      fields: [
        { key: 'training_spend', label: 'Training Spend per Employee' },
        { key: 'onboarding_quality', label: 'Fresher / Graduate Onboarding Quality' },
        { key: 'learning_culture', label: 'Learning Portals & Certifications' },
        { key: 'mentorship_availability', label: 'Mentorship & Buddy Programs' },
        { key: 'internal_mobility', label: 'Internal Mobility & Role Switching' },
        { key: 'promotion_clarity', label: 'Promotion Criteria & Appraisal Transparency' },
        { key: 'tools_access', label: 'Enterprise Tooling & Cloud Access' },
        { key: 'role_clarity', label: 'Initial Role Definition & Clarity' },
        { key: 'early_ownership', label: 'Early Project Ownership Level' },
        { key: 'work_impact', label: 'Client Facing & Business Impact' },
        { key: 'cross_functional_exposure', label: 'Cross-Functional Department Exposure' },
        { key: 'exit_opportunities', label: 'Exit Opportunities & Alumni Trajectory' },
        { key: 'skill_relevance', label: 'Modern Tech Skill Relevance' },
        { key: 'network_strength', label: 'Professional Network & Alumni Strength' },
        { key: 'global_exposure', label: 'International Projects & Travel Exposure' },
        { key: 'execution_thinking_balance', label: 'Execution vs Strategic Thinking Ratio' },
        { key: 'automation_level', label: 'Internal Workflow Automation Level' },
        { key: 'brand_value', label: 'Resume & Brand Value' },
        { key: 'client_quality', label: 'Client Profile & Pedigree' },
        { key: 'external_recognition', label: 'External Industry Recognition' }
      ]
    },
    {
      id: 'brand-reputation',
      title: 'Brand & Reputation',
      icon: Award,
      fields: [
        { key: 'brand_sentiment_score', label: 'Global Brand Sentiment & Perception' },
        { key: 'website_quality', label: 'Digital Presence & User Experience' },
        { key: 'website_traffic_rank', label: 'Web Traffic Benchmarks' },
        { key: 'website_rating', label: 'Domain Rating & Trust Score' },
        { key: 'marketing_video_url', label: 'Corporate Video / Overview Channel', format: 'video' }
      ]
    },
    {
      id: 'compensation-benefits',
      title: 'Compensation & Benefits',
      icon: Wallet,
      fields: [
        { key: 'leave_policy', label: 'Annual Leave & Mental Health Days' },
        { key: 'fixed_vs_variable_pay', label: 'Pay Structure (Fixed vs Variable)' },
        { key: 'bonus_predictability', label: 'Performance Bonus Predictability' },
        { key: 'esops_incentives', label: 'Stock Units / Equity Incentives' },
        { key: 'family_health_insurance', label: 'Family & Dependent Medical Insurance' },
        { key: 'relocation_support', label: 'Relocation Assistance & Housing Allowance' },
        { key: 'lifestyle_benefits', label: 'Lifestyle Perks, Gym & Meals', format: 'list' },
        { key: 'hiring_velocity', label: 'Current Hiring Velocity by Domain', format: 'list' },
        { key: 'employee_turnover', label: 'Annual Attrition / Turnover Rate' },
        { key: 'avg_retention_tenure', label: 'Average Employee Retention Tenure' }
      ]
    },
    {
      id: 'digital-presence',
      title: 'Digital Presence & Ratings',
      icon: Share2,
      fields: [
        { key: 'website_url', label: 'Official Website', format: 'url' },
        { key: 'linkedin_url', label: 'Official LinkedIn Page', format: 'url' },
        { key: 'twitter_handle', label: 'Twitter / X Profile' },
        { key: 'facebook_url', label: 'Facebook Page', format: 'url' },
        { key: 'instagram_url', label: 'Instagram Profile', format: 'url' },
        { key: 'social_media_followers', label: 'Total Social Media Reach', format: 'rating' },
        { key: 'glassdoor_rating', label: 'Glassdoor Rating', format: 'rating' },
        { key: 'indeed_rating', label: 'Indeed Rating', format: 'rating' },
        { key: 'google_rating', label: 'Google Rating', format: 'rating' }
      ]
    },
    {
      id: 'contact-info',
      title: 'Contact Information',
      icon: Mail,
      fields: [
        { key: 'primary_contact_email', label: 'Primary Contact Email', format: 'email' },
        { key: 'primary_phone_number', label: 'Primary Office Phone', format: 'phone' },
        { key: 'contact_person_name', label: 'Executive Contact Name' },
        { key: 'contact_person_title', label: 'Executive Title' },
        { key: 'contact_person_email', label: 'Executive Direct Email', format: 'email' },
        { key: 'contact_person_phone', label: 'Executive Direct Phone', format: 'phone' }
      ]
    }
  ];

  return sectionsConfig.map((sec, idx) => {
    const fieldsWithValues: IntelligenceField[] = sec.fields.map(f => {
      const val = profile[f.key];
      return {
        ...f,
        value: val
      };
    });

    const availableCount = fieldsWithValues.filter(f => !isNullish(f.value)).length;

    return {
      id: sec.id,
      index: idx,
      title: sec.title,
      icon: sec.icon,
      fields: fieldsWithValues,
      availableCount
    };
  });
}
