import { useTranslation } from 'react-i18next';

// Maps status string → Tailwind color classes + translated label
const statusConfig = {
  available: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
  },
  sold: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    dot: 'bg-red-500',
  },
  reserved: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
};

export default function StatusBadge({ status, size = 'sm' }) {
  const { t } = useTranslation();
  const cfg = statusConfig[status] || statusConfig.available;
  const sizeClass = size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-0.5 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${cfg.bg} ${cfg.text} ${sizeClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {t(`status.${status}`)}
    </span>
  );
}
