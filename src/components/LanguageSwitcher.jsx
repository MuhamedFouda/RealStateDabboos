import { useTranslation } from 'react-i18next';

/**
 * LanguageSwitcher: toggles between English (LTR) and Arabic (RTL).
 * Persists the choice in localStorage.
 * The direction/lang change on <html> is handled in Layout.jsx via useEffect.
 */
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const toggle = (lang) => {
    if (i18n.language === lang) return;
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <div
      className="flex items-center gap-0.5 bg-slate-100 rounded-lg p-1"
      role="group"
      aria-label="Language switcher"
    >
      <button
        onClick={() => toggle('en')}
        aria-pressed={!isAr}
        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200 cursor-pointer ${
          !isAr
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => toggle('ar')}
        aria-pressed={isAr}
        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200 cursor-pointer ${
          isAr
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        AR
      </button>
    </div>
  );
}
