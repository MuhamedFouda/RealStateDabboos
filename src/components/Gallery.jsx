import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RiCloseLine, RiArrowLeftSLine, RiArrowRightSLine, RiZoomInLine } from 'react-icons/ri';

/**
 * Gallery component: displays a main image + a row of clickable thumbnails.
 * Clicking a thumbnail swaps the main image.
 * Clicking the main image opens a beautiful full-screen modal lightbox.
 */
export default function Gallery({ images = [], altBase }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Handle keyboard events when modal is open
  useEffect(() => {
    if (!isOpen || images.length === 0) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowRight') {
        if (isRTL) {
          setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
        } else {
          setActiveIndex((prev) => (prev + 1) % images.length);
        }
      } else if (e.key === 'ArrowLeft') {
        if (isRTL) {
          setActiveIndex((prev) => (prev + 1) % images.length);
        } else {
          setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling behind modal
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, images.length, isRTL]);

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-slate-800">{t('details.gallery')}</h3>

      {/* Main image container */}
      <div 
        onClick={() => setIsOpen(true)}
        className="group relative rounded-2xl overflow-hidden aspect-video bg-slate-100 shadow-sm cursor-zoom-in"
      >
        <img
          src={images[activeIndex]}
          alt={`${altBase} — photo ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          key={activeIndex}
        />
        
        {/* Overlay hover effect */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full text-slate-800 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <RiZoomInLine className="text-xl" />
          </div>
        </div>

        {/* Image counter */}
        <div className="absolute bottom-3 end-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium z-10">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`View photo ${idx + 1}`}
              className={`cursor-pointer shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                idx === activeIndex
                  ? 'border-emerald-500 opacity-100 shadow-md scale-105'
                  : 'border-transparent opacity-60 hover:opacity-100 hover:border-slate-300'
              }`}
            >
              <img
                src={img}
                alt={`${altBase} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Fullscreen Lightbox Modal ── */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 transition-all duration-300"
        >
          {/* Top header controls */}
          <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/60 to-transparent">
            <span className="text-white/90 text-sm font-medium ps-2">
              {altBase} ({activeIndex + 1} / {images.length})
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
              aria-label="Close gallery"
            >
              <RiCloseLine className="text-2xl" />
            </button>
          </div>

          {/* Large image area */}
          <div className="relative w-full max-w-5xl aspect-video flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[activeIndex]}
              alt={`${altBase} fullscreen`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl select-none transition-opacity duration-300"
              key={`lightbox-${activeIndex}`}
            />

            {/* Navigation buttons inside lightbox */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="cursor-pointer absolute start-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  {isRTL ? (
                    <RiArrowRightSLine className="text-2xl" />
                  ) : (
                    <RiArrowLeftSLine className="text-2xl" />
                  )}
                </button>
                <button
                  onClick={handleNext}
                  className="cursor-pointer absolute end-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all backdrop-blur-sm"
                  aria-label="Next image"
                >
                  {isRTL ? (
                    <RiArrowLeftSLine className="text-2xl" />
                  ) : (
                    <RiArrowRightSLine className="text-2xl" />
                  )}
                </button>
              </>
            )}
          </div>

          {/* Bottom thumbnails for modal */}
          {images.length > 1 && (
            <div 
              className="absolute bottom-6 flex gap-2.5 overflow-x-auto max-w-full px-4 py-2 bg-white/5 backdrop-blur-sm rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, idx) => (
                <button
                  key={`modal-thumb-${idx}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`cursor-pointer shrink-0 w-16 h-11 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    idx === activeIndex
                      ? 'border-emerald-500 scale-105 opacity-100'
                      : 'border-transparent opacity-40 hover:opacity-80'
                  }`}
                >
                  <img
                    src={img}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
