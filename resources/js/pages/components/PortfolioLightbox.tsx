import { useEffect, useCallback, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface PortfolioImage {
  id: number;
  image: string;
  is_cover: boolean;
}

interface Props {
  images: PortfolioImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const PortfolioLightbox = ({ images, currentIndex, onClose, onNavigate }: Props) => {
  const [zoomed, setZoomed] = useState(false);

  const current = images[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
      setZoomed(false);
    }
  }, [currentIndex, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
      setZoomed(false);
    }
  }, [currentIndex, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape': onClose(); break;
        case 'ArrowRight': goNext(); break;
        case 'ArrowLeft': goPrev(); break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, goNext, goPrev]);

  // Touch swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 80) {
      diff > 0 ? goPrev() : goNext();
    }
    setTouchStart(null);
  };

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-b from-black/60 to-transparent">
        <span className="text-white/80 text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); setZoomed(!zoomed); }}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            {zoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="flex items-center justify-center h-full w-full p-4 sm:p-16">
        <img
          src={current.image}
          alt={`Image ${currentIndex + 1}`}
          onClick={(e) => e.stopPropagation()}
          className={`max-w-full max-h-full object-contain transition-transform duration-300 ease-out select-none ${
            zoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/1200x800/1e293b/94a3b8?text=Image+Not+Found';
          }}
          draggable={false}
        />
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          {currentIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex justify-center gap-2 overflow-x-auto max-w-3xl mx-auto">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={(e) => { e.stopPropagation(); onNavigate(idx); setZoomed(false); }}
                className={`shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all ${
                  idx === currentIndex ? 'border-morpho scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img.image}
                  alt={`Thumb ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioLightbox;
