'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TranslationKeys } from '@/lib/i18n';

interface FilterState {
  workMode: string[];
  experience: string[];
  salaryMin: number;
  employmentType: string[];
}

interface FilterPanelProps {
  activeFilters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  t: TranslationKeys;
}

const workModes = ['Remote', 'Hybrid', 'On-site'];
const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance'];

function FilterGroup({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  return (
    <div className="border-b border-border pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-sm font-semibold text-foreground mb-3 hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        aria-expanded={isOpen}
      >
        {title}
        {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
}

export default function FilterPanel({ activeFilters, onFiltersChange, t }: FilterPanelProps) {
  const experienceLevels = t.filterPanel.experienceLevels;

  const toggleFilter = (type: 'workMode' | 'experience' | 'employmentType', value: string) => {
    const current = activeFilters[type];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFiltersChange({ ...activeFilters, [type]: updated });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-foreground text-sm">{t.filterPanel.title}</h2>
        <button
          onClick={() => onFiltersChange({ workMode: [], experience: [], salaryMin: 0, employmentType: [] })}
          className="text-xs text-error hover:text-error-foreground font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          {t.filterPanel.clearAll}
        </button>
      </div>

      <FilterGroup title={t.filterPanel.workMode}>
        <div className="space-y-2">
          {workModes.map((mode) => (
            <label key={`filter-workmode-${mode}`} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={activeFilters.workMode.includes(mode)}
                onChange={() => toggleFilter('workMode', mode)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-ring focus:ring-2 cursor-pointer"
                aria-label={`Filter by work mode: ${mode}`}
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{mode}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title={t.filterPanel.experience}>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <label key={`filter-exp-${level}`} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={activeFilters.experience.includes(level)}
                onChange={() => toggleFilter('experience', level)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-ring focus:ring-2 cursor-pointer"
                aria-label={`Filter by experience: ${level}`}
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{level}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title={t.filterPanel.contractType}>
        <div className="space-y-2">
          {employmentTypes.map((type) => (
            <label key={`filter-emptype-${type}`} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={activeFilters.employmentType.includes(type)}
                onChange={() => toggleFilter('employmentType', type)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-ring focus:ring-2 cursor-pointer"
                aria-label={`Filter by employment type: ${type}`}
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title={t.filterPanel.salaryRange} defaultOpen={false}>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={activeFilters.salaryMin}
            onChange={(e) => onFiltersChange({ ...activeFilters, salaryMin: Number(e.target.value) })}
            className="w-full accent-primary cursor-pointer"
            aria-label={`Minimum salary: ${activeFilters.salaryMin} million VND`}
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{t.filterPanel.minimum} <span className="font-semibold text-foreground tab-number">{activeFilters.salaryMin}tr</span></span>
            <span>100tr+</span>
          </div>
        </div>
      </FilterGroup>
    </div>
  );
}