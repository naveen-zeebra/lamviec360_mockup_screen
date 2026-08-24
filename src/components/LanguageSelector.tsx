'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  variant?: 'navbar' | 'minimal';
}

const languages = [
  { code: 'en' as Language, label: 'English', nativeLabel: 'English' },
  { code: 'vi' as Language, label: 'Vietnamese', nativeLabel: 'Tiếng Việt' },
];

export default function LanguageSelector({ currentLanguage, onLanguageChange, variant = 'navbar' }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(l => l.code === currentLanguage) || languages[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md ${
          variant === 'navbar' ?'text-muted-foreground hover:text-foreground px-2 py-1.5' :'text-foreground hover:text-primary px-2 py-1.5'
        }`}
        aria-label={`Language: ${currentLang.label}. Click to change language.`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe size={15} className="text-muted-foreground" />
        <span>{currentLang.nativeLabel}</span>
        <ChevronDown size={13} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1.5 w-44 bg-card border border-border rounded-lg shadow-modal z-50 py-1 animate-fade-in"
          role="listbox"
          aria-label="Select language"
        >
          {languages.map((lang) => (
            <button
              key={`lang-${lang.code}`}
              role="option"
              aria-selected={currentLanguage === lang.code}
              onClick={() => {
                onLanguageChange(lang.code);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{lang.nativeLabel}</span>
                <span className="text-xs text-muted-foreground">{lang.label}</span>
              </div>
              {currentLanguage === lang.code && (
                <Check size={14} className="text-primary flex-shrink-0" />
              )}
            </button>
          ))}
          <div className="border-t border-border mt-1 pt-1 px-3 py-1.5">
            <p className="text-xs text-muted-foreground">More languages coming soon</p>
          </div>
        </div>
      )}
    </div>
  );
}