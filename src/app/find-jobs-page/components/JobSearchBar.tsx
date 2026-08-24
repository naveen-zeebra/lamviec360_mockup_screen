'use client';
import React from 'react';
import { Search, MapPin, Grid3X3 } from 'lucide-react';
import { TranslationKeys } from '@/lib/i18n';

interface JobSearchBarProps {
  keyword: string;
  location: string;
  category: string;
  onKeywordChange: (v: string) => void;
  onLocationChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  t: TranslationKeys;
}

export default function JobSearchBar({ keyword, location, category, onKeywordChange, onLocationChange, onCategoryChange, t }: JobSearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex-1 flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-background focus-within:ring-2 focus-within:ring-ring focus-within:border-primary transition-all">
        <Search size={16} className="text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          placeholder={t.jobs.jobTitle}
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          className="flex-1 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
          aria-label="Search by job title, skills or keywords"
        />
      </div>
      <div className="flex-1 flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-background focus-within:ring-2 focus-within:ring-ring focus-within:border-primary transition-all">
        <MapPin size={16} className="text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          placeholder={t.jobs.location}
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="flex-1 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
          aria-label="Location"
        />
      </div>
      <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-background focus-within:ring-2 focus-within:ring-ring focus-within:border-primary transition-all min-w-[160px]">
        <Grid3X3 size={16} className="text-muted-foreground flex-shrink-0" />
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="flex-1 text-sm bg-transparent text-foreground focus:outline-none cursor-pointer"
          aria-label="Job Category"
        >
          <option value="">{t.jobCategories.allCategories}</option>
          <option value="Software Development">{t.jobCategories.softwareDevelopment}</option>
          <option value="Design">{t.jobCategories.design}</option>
          <option value="Marketing">{t.jobCategories.marketing}</option>
          <option value="Sales">{t.jobCategories.sales}</option>
          <option value="Finance">{t.jobCategories.finance}</option>
          <option value="Human Resources">{t.jobCategories.humanResources}</option>
          <option value="Engineering">{t.jobCategories.engineering}</option>
          <option value="Customer Support">{t.jobCategories.customerSupport}</option>
        </select>
      </div>
    </div>
  );
}