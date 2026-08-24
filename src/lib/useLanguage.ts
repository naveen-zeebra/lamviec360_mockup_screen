'use client';
import { useState, useCallback, useEffect } from 'react';
import { Language, getTranslations } from './i18n';

const STORAGE_KEY = 'lamviec360_language';

function isLanguage(value: string | null): value is Language {
  return value === 'en' || value === 'vi';
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguage(stored)) {
      setLanguage(stored);
    }
  }, []);

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  const t = getTranslations(language);

  return { language, changeLanguage, t };
}
