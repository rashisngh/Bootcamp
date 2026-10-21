/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { CompanyProvider } from './context/CompanyContext';
import { AppLayout } from './components/layout/AppLayout';
import { IndexPage } from './pages/Index';
import { CompanyIntelligencePage } from './pages/CompanyIntelligence';
import { SkillIntelligencePage } from './pages/SkillIntelligence';
import { NotFoundPage } from './pages/NotFound';

// QueryClient configuration as specified
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min
      gcTime: 10 * 60 * 1000,    // 10 min
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster position="top-right" richColors />
        <CompanyProvider>
          <BrowserRouter>
            <Suspense
              fallback={
                <div className="min-h-screen bg-white flex items-center justify-center">
                  <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <Routes>
                {/* Home Recruiters Directory */}
                <Route path="/" element={<IndexPage />} />

                {/* Company Intelligence Nested Sub-routes */}
                <Route path="/company" element={<AppLayout />}>
                  <Route index element={<Navigate to="intelligence" replace />} />
                  <Route path="intelligence" element={<CompanyIntelligencePage />} />
                  <Route path="skills" element={<SkillIntelligencePage />} />
                </Route>

                {/* Unmatched 404 handler */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CompanyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
