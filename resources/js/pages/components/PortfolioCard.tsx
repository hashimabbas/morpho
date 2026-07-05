import { Link } from '@inertiajs/react';
import { ArrowRight, Image as ImageIcon, Calendar } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { format } from 'date-fns';

interface PortfolioCardItem {
  id: number;
  title: string;
  slug: string;
  date: string;
  description: string | null;
  cover_image: string | null;
  images_count: number;
}

interface Props {
  item: PortfolioCardItem;
}

const PortfolioCard = ({ item }: Props) => {
  const { __, isRtl } = useTranslation();

  return (
    <Link
      href={route('portfolio.detail', item.slug)}
      className="group relative bg-white dark:bg-[#0F172A] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 block"
    >
      {/* Cover Image */}
      <div className="aspect-[16/10] overflow-hidden relative">
        {item.cover_image ? (
          <img
            src={item.cover_image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/00A9C1/FFFFFF?text=' + encodeURIComponent(item.title);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-morpho/20 to-morpho/5">
            <ImageIcon className="w-16 h-16 text-morpho/40" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <span className="text-white font-bold inline-flex items-center gap-2 text-lg">
            {__('portfolio.card.view_details')} <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180' : ''}`} />
          </span>
        </div>

        {/* Images count badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5" />
          {item.images_count} {__('portfolio.card.images')}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="w-4 h-4" />
          <span>{item.date ? format(new Date(item.date), 'MMM yyyy') : '—'}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-morpho transition-colors line-clamp-2">
          {item.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed text-sm">
          {item.description || __('portfolio.card.no_description')}
        </p>
      </div>
    </Link>
  );
};

export default PortfolioCard;
