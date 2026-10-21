import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, ChevronRight } from 'lucide-react';
import { AppSidebar } from './AppSidebar';
import { useCompany } from '../../context/CompanyContext';

export const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { selectedCompanyRef, summary, isReady } = useCompany();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If ready and no company selected/found, redirect to home
    if (isReady && !selectedCompanyRef) {
      navigate('/', { replace: true });
    }
  }, [isReady, selectedCompanyRef, navigate]);

  const currentTab = location.pathname.includes('/skills')
    ? 'Skill Intelligence'
    : 'Company Intelligence';

  if (!isReady) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-medium text-slate-500">Loading placement data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <AppSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Top Header / Breadcrumb Bar */}
        <header className="h-14 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-hidden">
              <Link to="/" className="hover:text-blue-600 font-medium transition-colors shrink-0">
                Companies
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span className="font-medium text-slate-800 truncate">
                {summary?.name || 'Company'}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0 hidden sm:inline-block" />
              <span className="text-blue-600 font-semibold truncate hidden sm:inline-block">
                {currentTab}
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              JSSATE Intelligence
            </span>
          </div>
        </header>

        {/* Page Viewport Outlet */}
        <main className="flex-1 overflow-x-hidden bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
