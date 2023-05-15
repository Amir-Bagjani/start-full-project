import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ArabicTr, EnglishTr, PersianTr } from './locales';

i18n.use(initReactI18next).init({
  lng: 'fa',
  fallbackLng: 'fa',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: EnglishTr },
    fa: { translation: PersianTr },
    ar: { translation: ArabicTr },
  },
});

export default i18n;
