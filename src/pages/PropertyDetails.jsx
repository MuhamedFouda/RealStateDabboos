import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  RiArrowLeftLine, RiArrowRightLine,
  RiMapPinLine, RiHome3Line, RiDropLine,
  RiRulerLine, RiEditLine, RiCalendarLine,
  RiBuilding2Line, RiShareLine,
} from 'react-icons/ri';
import { properties } from '../data/properties';
import StatusBadge from '../components/StatusBadge';
import Gallery from '../components/Gallery';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isRTL = i18n.dir() === 'rtl';

  const property = properties.find((p) => p.id === Number(id));
  const BackIcon = isRTL ? RiArrowRightLine : RiArrowLeftLine;

  /* ── Not found ── */
  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
        <div className="text-6xl">🏚️</div>
        <h2 className="text-2xl font-bold text-slate-800">{t('common.propertyNotFound')}</h2>
        <Link
          to="/properties"
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors cursor-pointer"
        >
          <BackIcon />
          {t('common.back')}
        </Link>
      </div>
    );
  }

  const typeConfig = {
    Villa:     { color: 'text-violet-600', bg: 'bg-violet-50',  border: 'border-violet-200' },
    Apartment: { color: 'text-blue-600',   bg: 'bg-blue-50',    border: 'border-blue-200'   },
    Office:    { color: 'text-orange-600', bg: 'bg-orange-50',  border: 'border-orange-200' },
  };
  const type = typeConfig[property.type] ?? typeConfig.Apartment;

  return (
    <div className="max-w-6xl space-y-6">

      {/* ── Breadcrumb / back ── */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors group cursor-pointer"
        >
          <BackIcon className="group-hover:-translate-x-0.5 transition-transform" />
          {t('common.back')}
        </button>

        {/* Share button */}
        <button
          className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-emerald-50 border border-transparent hover:border-emerald-100"
        >
          <RiShareLine className="text-base" />
          {lang === 'ar' ? 'مشاركة' : 'Share'}
        </button>
      </div>

      {/* ── Hero banner ── */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-8">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        {/* Emerald accent blob */}
        <div className="absolute -top-10 -end-10 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 start-1/3 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <StatusBadge status={property.status} size="lg" />
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${type.color} ${type.bg} ${type.border}`}>
                <RiBuilding2Line />
                {t(`properties.types.${property.type}`)}
              </span>
            </div>

            {/* Property name */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {property.name[lang]}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-slate-300 text-sm">
              <RiMapPinLine className="text-emerald-400 shrink-0" />
              <span>{property.location[lang]}</span>
            </div>
          </div>

          {/* Price block */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 text-end shrink-0">
            <p className="text-xs text-slate-300 font-medium mb-0.5 uppercase tracking-wider">
              {lang === 'ar' ? 'السعر' : 'Listing Price'}
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 leading-none">
              {formatPrice(property.price)}
            </p>
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center justify-end gap-1">
              <RiCalendarLine />
              {t('details.listedOn')}: {property.dateAdded}
            </p>
          </div>
        </div>
      </div>

      {/* ── Main content grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Left — Gallery + Description */}
        <div className="lg:col-span-3 space-y-5">
          <Gallery images={property.images} altBase={property.name[lang]} />

          {/* Description card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-emerald-500 shrink-0" />
              <h3 className="font-semibold text-slate-800 text-sm">{t('details.description')}</h3>
            </div>
            <div className="px-6 py-5">
              <p className="text-slate-600 text-sm leading-7">{property.description[lang]}</p>
            </div>
          </div>
        </div>

        {/* Right — Specs + Actions */}
        <div className="lg:col-span-2 space-y-5">

          {/* Specifications card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-blue-500 shrink-0" />
              <h3 className="font-semibold text-slate-800 text-sm">{t('details.specifications')}</h3>
            </div>

            <div className="p-5 grid grid-cols-3 gap-3">
              {/* Area */}
              <div className="flex flex-col items-center justify-center rounded-xl p-4 gap-2 bg-emerald-50 border border-emerald-100">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 text-lg">
                  <RiRulerLine />
                </div>
                <p className="text-lg font-bold text-slate-800 leading-none">{property.area}</p>
                <p className="text-[11px] text-slate-500 text-center leading-tight">{t('details.area')}</p>
              </div>

              {/* Bedrooms */}
              {property.bedrooms > 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl p-4 gap-2 bg-violet-50 border border-violet-100">
                  <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 text-lg">
                    <RiHome3Line />
                  </div>
                  <p className="text-lg font-bold text-slate-800 leading-none">{property.bedrooms}</p>
                  <p className="text-[11px] text-slate-500 text-center leading-tight">{t('details.bedrooms')}</p>
                </div>
              )}

              {/* Bathrooms */}
              <div className="flex flex-col items-center justify-center rounded-xl p-4 gap-2 bg-cyan-50 border border-cyan-100">
                <div className="w-9 h-9 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-600 text-lg">
                  <RiDropLine />
                </div>
                <p className="text-lg font-bold text-slate-800 leading-none">{property.bathrooms}</p>
                <p className="text-[11px] text-slate-500 text-center leading-tight">{t('details.bathrooms')}</p>
              </div>
            </div>
          </div>

          {/* Quick facts */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-50">
            {[
              {
                label: lang === 'ar' ? 'النوع' : 'Property Type',
                value: t(`properties.types.${property.type}`),
                icon: <RiBuilding2Line className="text-slate-400" />,
              },
              {
                label: lang === 'ar' ? 'الموقع' : 'Location',
                value: property.location[lang],
                icon: <RiMapPinLine className="text-slate-400" />,
              },
              {
                label: t('details.listedOn'),
                value: property.dateAdded,
                icon: <RiCalendarLine className="text-slate-400" />,
              },
            ].map(({ label, value, icon }) => (
              <div key={label} className="flex items-center gap-3 px-5 py-3.5">
                <span className="text-base shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="text-sm font-medium text-slate-700 truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="cursor-pointer flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium text-sm transition-all"
            >
              <BackIcon />
              {t('common.back')}
            </button>

            {/* Disabled Edit */}
            <div className="relative group flex-1">
              <button
                disabled
                aria-disabled="true"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-400 font-medium text-sm cursor-not-allowed select-none border border-slate-200"
              >
                <RiEditLine />
                {t('common.edit')}
              </button>
              <div className="absolute bottom-full mb-2 start-1/2 -translate-x-1/2 hidden group-hover:block z-10 w-48 text-center pointer-events-none">
                <span className="bg-slate-800 text-white text-xs rounded-lg px-3 py-1.5 block shadow-lg">
                  {t('common.editDisabled')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
