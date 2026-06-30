import React from 'react';
import { Download, Eye, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface BrochureItem {
  id: number;
  name: string;
  file: string;
  description: string;
  image_url: string | null;
}

interface PdfListProps {
  onSelect: (file: string) => void;
  brochures: BrochureItem[];
}

const PdfList = ({ onSelect, brochures }: PdfListProps) => {
  const { __ } = useTranslation();
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brochures.map((pdf) => (
            <div
              key={pdf.id}
              className="group relative bg-white dark:bg-[#0F172A] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Card Image */}
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={pdf.image_url || ''}
                  alt={pdf.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/00A9C1/FFFFFF?text=' + encodeURIComponent(pdf.name);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <span className="text-white font-bold inline-flex items-center gap-2">
                    {__('brochures.card.open_brochure')} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-morpho transition-colors">
                  {pdf.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-8 line-clamp-2 leading-relaxed">
                  {pdf.description}
                </p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onSelect(pdf.file)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-morpho text-white rounded-lg font-semibold transition-all hover:bg-morpho-dark active:scale-95 shadow-lg shadow-morpho/20"
                  >
                    <Eye className="w-4 h-4" />
                    {__('brochures.card.view')}
                  </button>
                  <a
                    href={`/pdf/${pdf.file}`}
                    download
                    className="inline-flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PdfList;
