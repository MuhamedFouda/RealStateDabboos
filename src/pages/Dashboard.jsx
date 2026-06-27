import { useTranslation } from 'react-i18next';
import { stats } from '../data/stats';
import { recentProperties } from '../data/properties';
import StatCard from '../components/StatCard';
import PropertiesTable from '../components/PropertiesTable';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* ── Page header ── */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          {t('dashboard.title')}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          {lang === 'ar'
            ? 'نظرة عامة على لوحة التحكم'
            : 'Overview of your real estate portfolio'}
        </p>
      </div>

      {/* ── Stat Cards
            · mobile  : 1 column
            · tablet  : 2 columns
            · desktop : 4 columns
      ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat) => (
          <StatCard key={stat.key} stat={stat} />
        ))}
      </div>

      {/* ── Recent Properties Table
            Fully responsive via PropertiesTable:
            · mobile  → stacked cards
            · sm+     → standard table with overflow-x-auto
      ── */}
      <PropertiesTable
        properties={recentProperties}
        title={t('dashboard.recentProperties')}
        subtitle={
          lang === 'ar'
            ? 'آخر 5 عقارات تم إضافتها'
            : 'Last 5 properties added to the system'
        }
        showViewAll={true}
      />

    </div>
  );
}
