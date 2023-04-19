import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { EnglishTr, PersianTr } from './locales';
import { ArabicTr } from './locales/ArabicTr';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
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
