import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import PortfolioLightbox from './PortfolioLightbox';

interface PortfolioImage {
  id: number;
  image: string;
  is_cover: boolean;
}

interface Props {
  images: PortfolioImage[];
}

const PortfolioGallery = ({ images }: Props) => {
  const { __ } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => openLightbox(index)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-morpho/50"
          >
            <img
              src={img.image}
              alt={`Project image ${index + 1}`}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x450/e2e8f0/94a3b8?text=Image';
              }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-white" />
            </div>
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <PortfolioLightbox
          images={images}
          currentIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(idx) => setCurrentIndex(idx)}
        />
      )}
    </>
  );
};

export default PortfolioGallery;
