import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import StatusBadge from './StatusBadge';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);

/**
 * PropertiesTable — fully responsive reusable component.
 *
 * • Mobile  (< sm) : stacked property cards — no horizontal scroll needed
 * • Desktop (sm+)  : classic table with overflow-x-auto fallback
 *
 * Props:
 *  - properties  : property[] to render
 *  - title       : card heading string
 *  - subtitle    : optional sub-heading string
 *  - showViewAll : show "View all →" link (default true)
 */
export default function PropertiesTable({
  properties = [],
  title,
  subtitle,
  showViewAll = true,
}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

      {/* ── Card header ── */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
        <div>
          <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
            {title ?? t('dashboard.recentProperties')}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">{subtitle}</p>
          )}
        </div>
        {showViewAll && (
          <Link
            to="/properties"
            className="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors shrink-0 ms-4"
          >
            {lang === 'ar' ? '← عرض الكل' : 'View all →'}
          </Link>
        )}
      </div>

      {/* ══════════════════════════════════════════
          MOBILE VIEW  — stacked cards (hidden on sm+)
         ══════════════════════════════════════════ */}
      <div className="sm:hidden divide-y divide-slate-50">
        {properties.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-slate-400">
            {t('common.noResultsTitle')}
          </p>
        ) : (
          properties.map((property) => (
            <div
              key={property.id}
              onClick={() => navigate(`/properties/${property.id}`)}
              className="flex items-start gap-3 px-4 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              {/* Thumbnail */}
              <img
                src={property.images[0]}
                alt={property.name[lang]}
                className="w-14 h-12 rounded-xl object-cover shrink-0 bg-slate-100"
                loading="lazy"
              />

              {/* Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <p className="font-semibold text-slate-800 text-sm leading-snug truncate">
                  {property.name[lang]}
                </p>
                <p className="text-xs text-slate-400 truncate">{property.location[lang]}</p>

                {/* Bedrooms / Bathrooms / Area */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 flex-wrap">
                  {property.bedrooms > 0 && (
                    <span>🛏 {property.bedrooms}</span>
                  )}
                  {property.bathrooms > 0 && (
                    <span>🚿 {property.bathrooms}</span>
                  )}
                  <span>📐 {property.area} m²</span>
                </div>

                {/* Type + Status on same row */}
                <div className="flex items-center gap-2 flex-wrap pt-0.5">
                  <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                    {t(`properties.types.${property.type}`)}
                  </span>
                  <StatusBadge status={property.status} />
                </div>
              </div>

              {/* Price + date stacked on the right */}
              <div className="shrink-0 text-end">
                <p className="text-sm font-bold text-slate-800">{formatPrice(property.price)}</p>
                <p className="text-[11px] text-slate-400 mt-1">{property.dateAdded}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP VIEW — table (hidden on mobile)
         ══════════════════════════════════════════ */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full min-w-[750px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {[
                { key: 'property',  px: 'px-6' },
                { key: 'type',      px: 'px-4' },
                { key: 'details',   px: 'px-4' },
                { key: 'price',     px: 'px-4' },
                { key: 'status',    px: 'px-4' },
                { key: 'dateAdded', px: 'px-4' },
              ].map(({ key, px }) => (
                <th
                  key={key}
                  className={`text-start text-xs font-semibold text-slate-500 uppercase tracking-wider ${px} py-3 whitespace-nowrap`}
                >
                  {key === 'details'
                    ? (lang === 'ar' ? 'التفاصيل' : 'Details')
                    : t(`dashboard.table.${key}`)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {properties.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-400">
                  {t('common.noResultsTitle')}
                </td>
              </tr>
            ) : (
              properties.map((property) => (
                <tr
                  key={property.id}
                  onClick={() => navigate(`/properties/${property.id}`)}
                  className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                >
                  {/* Thumbnail + name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={property.images[0]}
                        alt={property.name[lang]}
                        className="w-12 h-10 rounded-xl object-cover shrink-0 bg-slate-100"
                        loading="lazy"
                      />
                      <div>
                        <p className="font-medium text-slate-800 text-sm group-hover:text-emerald-600 transition-colors">
                          {property.name[lang]}
                        </p>
                        <p className="text-xs text-slate-400">{property.location[lang]}</p>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-4 py-4">
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {t(`properties.types.${property.type}`)}
                    </span>
                  </td>

                  {/* Bedrooms / Bathrooms / Area */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-0.5 text-xs text-slate-500">
                      {property.bedrooms > 0 && (
                        <span>🛏 {property.bedrooms} {lang === 'ar' ? 'غرف نوم' : 'Bedrooms'}</span>
                      )}
                      {property.bathrooms > 0 && (
                        <span>🚿 {property.bathrooms} {lang === 'ar' ? 'حمامات' : 'Bathrooms'}</span>
                      )}
                      <span>📐 {property.area} m²</span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-slate-800">
                      {formatPrice(property.price)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <StatusBadge status={property.status} />
                  </td>

                  {/* Date */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-500">{property.dateAdded}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
