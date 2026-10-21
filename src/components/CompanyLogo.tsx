import React, { useState } from 'react';

interface CompanyLogoProps {
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  name,
  logoUrl,
  websiteUrl,
  className = '',
  size = 'md'
}) => {
  const [hasError, setHasError] = useState(false);
  const [logoDevError, setLogoDevError] = useState(false);

  const logoDevKey = import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY;

  let domain = '';
  if (websiteUrl) {
    try {
      domain = new URL(websiteUrl).hostname.replace(/^www\./, '');
    } catch {
      domain = '';
    }
  }

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-semibold',
    lg: 'w-14 h-14 text-base font-bold',
    xl: 'w-20 h-20 text-xl font-bold'
  }[size];

  // Try Logo.dev if key is configured and not errored
  if (logoDevKey && domain && !logoDevError) {
    const logoDevUrl = `https://img.logo.dev/${domain}?token=${logoDevKey}&size=128`;
    return (
      <div className={`relative flex items-center justify-center shrink-0 rounded-lg overflow-hidden bg-white border border-slate-200 ${sizeClasses} ${className}`}>
        <img
          src={logoDevUrl}
          alt={`${name} logo`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-1"
          onError={() => setLogoDevError(true)}
        />
      </div>
    );
  }

  // Fallback to provided logoUrl
  if (logoUrl && !hasError) {
    return (
      <div className={`relative flex items-center justify-center shrink-0 rounded-lg overflow-hidden bg-white border border-slate-200 ${sizeClasses} ${className}`}>
        <img
          src={logoUrl}
          alt={`${name} logo`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-1"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  // Initial letter circle fallback
  const initial = (name || 'C').charAt(0).toUpperCase();

  return (
    <div
      aria-label={`${name} logo badge`}
      className={`flex items-center justify-center shrink-0 rounded-lg bg-slate-900 text-white font-heading ${sizeClasses} ${className}`}
    >
      <span>{initial}</span>
    </div>
  );
};
