import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiArrowRightLine, RiArrowLeftLine, RiMapPinLine } from 'react-icons/ri';
import StatusBadge from './StatusBadge';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

const SLIDE_INTERVAL = 3000; // ms between auto-swipes

export default function PropertyCard({ property }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();

  const ArrowIcon = lang === 'ar' ? RiArrowLeftLine : RiArrowRightLine;

  const [activeIndex, setActiveIndex] = useState(0);
  const total = property.images.length;

  // Auto-advance every SLIDE_INTERVAL ms
  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [total]);

  const typeColors = {
    Villa:     'bg-purple-100 text-purple-700',
    Apartment: 'bg-blue-100 text-blue-700',
    Office:    'bg-orange-100 text-orange-700',
  };

  return (
    <div
      onClick={() => navigate(`/properties/${property.id}`)}
      className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-lg hover:border-emerald-100 transition-all duration-300 flex flex-col"
    >
      {/* ── Image carousel ── */}
      <div className="relative overflow-hidden aspect-[16/10]">
        {property.images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`${property.name[lang]} ${idx + 1}`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:scale-105 ${
              idx === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionProperty: 'opacity, transform' }}
          />
        ))}

        {/* Status badge */}
        <div className="absolute top-3 start-3 z-10">
          <StatusBadge status={property.status} />
        </div>

        {/* Type badge */}
        <div className="absolute top-3 end-3 z-10">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[property.type] || 'bg-slate-100 text-slate-700'}`}>
            {t(`properties.types.${property.type}`)}
          </span>
        </div>

        {/* Dot indicators */}
        {total > 1 && (
          <div className="absolute bottom-2.5 start-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
            {property.images.map((_, idx) => (
              <span
                key={idx}
                className={`block rounded-full transition-all duration-500 ${
                  idx === activeIndex
                    ? 'w-4 h-1.5 bg-white'
                    : 'w-1.5 h-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="font-semibold text-slate-800 text-lg leading-snug line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {property.name[lang]}
        </h3>

        <div className="flex items-center gap-1.5 text-slate-400 text-sm">
          <RiMapPinLine className="shrink-0" />
          <span className="line-clamp-1">{property.location[lang]}</span>
        </div>

        <p className="text-2xl font-bold text-slate-900 mt-auto">
          {formatPrice(property.price)}
        </p>

        {property.bedrooms > 0 && (
          <div className="flex items-center gap-4 text-xs text-slate-500 pb-1">
            <span>🛏 {property.bedrooms} {t('details.bedrooms')}</span>
            <span>🚿 {property.bathrooms} {t('details.bathrooms')}</span>
            <span>📐 {property.area} m²</span>
          </div>
        )}

        <div className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white text-sm font-medium bg-[#1a1f2e] group-hover:bg-emerald-600 transition-colors duration-200">
          <span>{t('common.viewDetails')}</span>
          <ArrowIcon className="text-emerald-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </div>
  );
}
