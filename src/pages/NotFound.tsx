import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl border border-slate-200 p-8 text-center shadow-xs">
        <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
          <Compass className="w-7 h-7" />
        </div>

        <span className="text-xs font-bold font-mono text-blue-600 uppercase tracking-widest">
          404 Error
        </span>

        <h1 className="text-2xl font-bold text-slate-900 font-heading mt-2 mb-2">
          Page Not Found
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
          The intelligence page or URL you requested does not exist in the JSSATE Placement Hub.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Recruiters Directory</span>
        </Link>
      </div>
    </div>
  );
};
