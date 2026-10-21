import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Building2,
  GraduationCap,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useCompany } from '../../context/CompanyContext';
import { CompanyLogo } from '../CompanyLogo';

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose
}) => {
  const { summary } = useCompany();

  const navItems = [
    {
      label: 'Company Intelligence',
      path: '/company/intelligence',
      icon: Building2
    },
    {
      label: 'Skill Intelligence',
      path: '/company/skills',
      icon: GraduationCap
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen flex flex-col justify-between bg-[#F8FAFC] border-r border-[#E5E7EB] text-[#334155] transition-all duration-300 ${
          collapsed ? 'lg:w-20' : 'lg:w-64'
        } ${
          mobileOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header / Branding */}
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-[#E5E7EB]">
            {!collapsed ? (
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-base tracking-tight text-slate-900">
                  JSSATE
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-blue-600 uppercase">
                  Intelligence Hub
                </span>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                <span className="font-heading font-black text-sm text-blue-600">JSS</span>
              </div>
            )}

            <button
              onClick={onToggle}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Active Company summary pill if available */}
          {summary && (
            <div className={`p-3 border-b border-[#E5E7EB] bg-white/70 ${collapsed ? 'text-center' : ''}`}>
              {!collapsed ? (
                <div className="flex items-center gap-3">
                  <CompanyLogo
                    name={summary.name}
                    logoUrl={summary.logo_url}
                    websiteUrl={summary.website_url}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-900 truncate">{summary.short_name || summary.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{summary.category}</p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <CompanyLogo
                    name={summary.name}
                    logoUrl={summary.logo_url}
                    websiteUrl={summary.website_url}
                    size="sm"
                  />
                </div>
              )}
            </div>
          )}

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => onMobileClose()}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold'
                        : 'text-[#334155] hover:bg-slate-200/50 hover:text-slate-900'
                    } ${collapsed ? 'justify-center px-2' : ''}`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Link: All Companies */}
        <div className="p-3 border-t border-[#E5E7EB]">
          <Link
            to="/"
            onClick={() => onMobileClose()}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-white transition-colors ${
              collapsed ? 'justify-center px-2' : ''
            }`}
            title="All Companies"
          >
            <LayoutGrid className="w-4 h-4 shrink-0" />
            {!collapsed && <span>All Companies</span>}
          </Link>

          {!collapsed && summary?.website_url && (
            <a
              href={summary.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span className="truncate">Company Site</span>
              <ExternalLink className="w-3 h-3 ml-1 shrink-0" />
            </a>
          )}
        </div>
      </aside>
    </>
  );
};
