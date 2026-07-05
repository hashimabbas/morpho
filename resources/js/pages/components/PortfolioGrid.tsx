import { useTranslation } from '@/hooks/useTranslation';
import { FolderOpen } from 'lucide-react';
import PortfolioCard from './PortfolioCard';

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
  items: PortfolioCardItem[];
}

const PortfolioGrid = ({ items }: Props) => {
  const { __ } = useTranslation();

  if (items.length === 0) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-morpho/10">
              <FolderOpen className="h-10 w-10 text-morpho/60" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {__('portfolio.empty.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              {__('portfolio.empty.description')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
