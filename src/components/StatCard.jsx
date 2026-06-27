import { useTranslation } from 'react-i18next';
import {
  RiBuildingLine,
  RiUserLine,
  RiNotification3Line,
  RiMoneyDollarCircleLine,
  RiArrowUpLine,
  RiArrowDownLine,
} from 'react-icons/ri';

// Maps iconType string → icon component
const iconMap = {
  building: RiBuildingLine,
  people: RiUserLine,
  bell: RiNotification3Line,
  currency: RiMoneyDollarCircleLine,
};

// Maps colorScheme → Tailwind classes for icon chip + accent ring
const colorMap = {
  emerald: {
    chip: 'bg-emerald-100 text-emerald-600',
    ring: 'ring-emerald-200',
    value: 'text-emerald-600',
  },
  blue: {
    chip: 'bg-blue-100 text-blue-600',
    ring: 'ring-blue-200',
    value: 'text-blue-600',
  },
  amber: {
    chip: 'bg-amber-100 text-amber-600',
    ring: 'ring-amber-200',
    value: 'text-amber-600',
  },
  purple: {
    chip: 'bg-purple-100 text-purple-600',
    ring: 'ring-purple-200',
    value: 'text-purple-600',
  },
};

export default function StatCard({ stat }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const Icon = iconMap[stat.iconType] || RiBuildingLine;
  const colors = colorMap[stat.colorScheme] || colorMap.emerald;

  // Localize values & trends
  let displayValue = stat.value;
  let displayTrend = stat.trend;

  if (lang === 'ar') {
    if (stat.key === 'totalSales') {
      displayValue = '2.4 مليون $';
    }
    if (stat.key === 'newRequests') {
      displayTrend = '+5 هذا الأسبوع';
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      {/* Top row: label + icon chip */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          {t(`dashboard.stats.${stat.key}`)}
        </p>
        {/* Icon chip with tinted background */}
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ring-1 ${colors.chip} ${colors.ring}`}>
          <Icon />
        </div>
      </div>

      {/* Large bold number */}
      <div>
        <p className={`text-3xl font-bold tracking-tight ${colors.value}`}>
          {displayValue}
        </p>
      </div>

      {/* Trend label */}
      <div className="flex items-center gap-1.5">
        {stat.trendUp ? (
          <RiArrowUpLine className="text-emerald-500 text-sm" />
        ) : (
          <RiArrowDownLine className="text-red-500 text-sm" />
        )}
        <span className={`text-xs font-medium ${stat.trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
          {displayTrend}
        </span>
        <span className="text-xs text-slate-400">
          {t('dashboard.vsLastMonth')}
        </span>
      </div>
    </div>
  );
}
