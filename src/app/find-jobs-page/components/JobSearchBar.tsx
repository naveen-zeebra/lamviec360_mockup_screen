'use client';
import React from 'react';
import { Search, MapPin, Grid3X3 } from 'lucide-react';

interface JobSearchBarProps {
  keyword: string;
  location: string;
  category: string;
  onKeywordChange: (v: string) => void;
  onLocationChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
}

export default function JobSearchBar({ keyword, location, category, onKeywordChange, onLocationChange, onCategoryChange }: JobSearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex-1 flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-background focus-within:ring-2 focus-within:ring-ring focus-within:border-primary transition-all">
        <Search size={16} className="text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          placeholder="Tên việc làm, kỹ năng hoặc từ khóa"
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
          placeholder="Địa điểm"
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
          <option value="">Tất cả ngành nghề</option>
          <option value="Software Development">Software Development</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Engineering">Engineering</option>
        </select>
      </div>
    </div>
  );
}