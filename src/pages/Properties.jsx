import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  RiSearchLine,
  RiFilterLine,
  RiLayoutGridLine,
  RiListUnordered,
} from 'react-icons/ri';
import { properties } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import PropertiesTable from '../components/PropertiesTable';

const FILTER_OPTIONS = ['all', 'available', 'sold', 'reserved'];

/**
 * Properties page:
 * - Live search (controlled input + useMemo, filters by name in current language)
 * - Status filter button group (raw English value for logic, translated for display)
 * - View toggle: grid cards ↔ table (useState, icons in toolbar)
 * - Empty state with translated message
 */
export default function Properties() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [search, setSearch]           = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  // 'grid' | 'table'
  const [viewMode, setViewMode]       = useState('grid');

  // Filter properties reactively on search / filter / language change
  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchesFilter = activeFilter === 'all' || p.status === activeFilter;
      const searchTerm    = search.trim().toLowerCase();
      const matchesSearch = !searchTerm || p.name[lang].toLowerCase().includes(searchTerm);
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter, lang]);

  return (
    <div className="space-y-6">

      {/* ── Page header ── */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{t('properties.title')}</h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          {properties.length} {lang === 'ar' ? 'عقار متاح' : 'properties in portfolio'}
        </p>
      </div>

      {/* ── Filters bar ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Live search */}
        <div className="relative flex-1 max-w-sm">
          <RiSearchLine className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('properties.searchPlaceholder')}
            aria-label={t('properties.searchPlaceholder')}
            className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition shadow-sm"
          />
        </div>

        {/* Status filter button group */}
        <div
          className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-sm overflow-x-auto"
          role="group"
          aria-label={t('properties.filterLabel')}
        >
          <RiFilterLine className="text-slate-400 ms-2 shrink-0" />
          {FILTER_OPTIONS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
              className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                activeFilter === f
                  ? 'bg-[#1a1f2e] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {t(`filter.${f}`)}
            </button>
          ))}
        </div>
      </div>

      {/* ── Toolbar: result count + view toggle ── */}
      <div className="flex items-center justify-end">
        {/* <p className="text-sm text-slate-500">
          {filtered.length} {lang === 'ar' ? 'نتيجة' : 'results'}
        </p> */}

        {/* View-mode toggle icons */}
        <div
          className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm"
          role="group"
          aria-label="Toggle view"
        >
          {/* Grid / Card view */}
          <button
            onClick={() => setViewMode('grid')}
            aria-pressed={viewMode === 'grid'}
            aria-label="Grid view"
            title="Grid view"
            className={`cursor-pointer flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              viewMode === 'grid'
                ? 'bg-[#1a1f2e] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <RiLayoutGridLine className="text-base" />
          </button>

          {/* List / Table view */}
          <button
            onClick={() => setViewMode('table')}
            aria-pressed={viewMode === 'table'}
            aria-label="Table view"
            title="Table view"
            className={`cursor-pointer flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              viewMode === 'table'
                ? 'bg-[#1a1f2e] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <RiListUnordered className="text-base" />
          </button>
        </div>
      </div>

      {/* ── Content area ── */}
      {filtered.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-4xl mb-5">
            🏠
          </div>
          <h3 className="text-lg font-semibold text-slate-700">{t('common.noResultsTitle')}</h3>
          <p className="text-slate-400 text-sm mt-1">{t('common.noResultsText')}</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid / Card view — 1 col / 2 col / 3 col */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        /* Table view — reuses the responsive PropertiesTable component */
        <PropertiesTable
          properties={filtered}
          title={t('properties.title')}
          subtitle={`${filtered.length} ${lang === 'ar' ? 'نتيجة' : 'results'}`}
          showViewAll={false}
        />
      )}

    </div>
  );
}
