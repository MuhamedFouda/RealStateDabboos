import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiMenuLine, RiSearchLine, RiBellLine } from 'react-icons/ri';
import LanguageSwitcher from './LanguageSwitcher';

// Map route paths → translation keys for page titles
const routeTitles = {
  '/': 'dashboard.title',
  '/properties': 'properties.title',
  '/clients': 'comingSoon.title',
  '/profile': 'profile.title',
};

/**
 * Top Navbar:
 * - Hamburger button (mobile) to open/close sidebar drawer
 * - Dynamic page title derived from current route
 * - Search icon, notification bell, language switcher, user avatar
 */
export default function Navbar({ onMenuToggle }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Resolve page title — fallback for /properties/:id
  const isDetailsPage = pathname.startsWith('/properties/') && pathname !== '/properties';
  const titleKey = isDetailsPage ? 'details.title' : (routeTitles[pathname] || 'dashboard.title');

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="flex items-center gap-4 px-4 sm:px-6 h-16">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
          aria-expanded="false"
        >
          <RiMenuLine className="text-xl" />
        </button>

        {/* Page title */}
        <div className="flex-1 hidden sm:block">
          <h1 className="text-lg font-bold text-slate-800">{t(titleKey)}</h1>
          <p className="text-xs text-slate-400">{t('dashboard.welcome')}, Ahmed</p>
        </div>

        {/* Mobile Spacer */}
        <div className="flex-1 sm:hidden" />

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <LanguageSwitcher />

          {/* Search icon button */}
          <button
            className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
            aria-label={t('common.search')}
          >
            <RiSearchLine className="text-lg" />
          </button>

          {/* Notification bell */}
          <button
            className="relative flex items-center justify-center w-9 h-9 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <RiBellLine className="text-lg" />
            {/* Notification dot */}
            <span className="absolute top-1.5 end-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
          </button>

          {/* User avatar */}
          <div 
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 ms-1 cursor-pointer group"
          >
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&q=80"
              alt="User profile"
              className="w-9 h-9 rounded-xl ring-2 ring-slate-200 group-hover:ring-emerald-400 transition-all"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 leading-none group-hover:text-emerald-600 transition-colors">Muhamed</p>
              <p className="text-xs text-slate-400">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
