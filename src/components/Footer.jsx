import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-slate-100 bg-white px-6 py-4 mt-auto">
      <p className="text-center text-xs text-slate-400">{t('common.copyright')}</p>
    </footer>
  );
}
