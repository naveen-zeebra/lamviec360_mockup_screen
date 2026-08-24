'use client';
import { useState, useCallback } from 'react';
import { Language, getTranslations } from './i18n';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en');

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    // Backend integration: persist language preference to user profile
  }, []);

  const t = getTranslations(language);

  return { language, changeLanguage, t };
}