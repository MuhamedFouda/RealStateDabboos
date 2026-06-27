import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiTimeLine, RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

export default function ComingSoon() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const BackIcon = isRTL ? RiArrowRightLine : RiArrowLeftLine;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      {/* Animated icon */}
      <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center text-5xl mb-6 shadow-sm ring-1 ring-emerald-100">
        <RiTimeLine className="text-emerald-500" />
      </div>

      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{t('comingSoon.title')}</h2>
      <p className="text-lg font-medium text-emerald-600 mb-3">{t('comingSoon.subtitle')}</p>
      <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-8">{t('comingSoon.desc')}</p>

      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 bg-[#1a1f2e] hover:bg-navy-700 text-white rounded-xl font-medium text-sm transition-colors shadow-sm"
        style={{ background: '#1a1f2e' }}
      >
        <BackIcon />
        {t('comingSoon.backToDash')}
      </Link>
    </div>
  );
}
