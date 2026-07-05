import { Head } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PortfolioDetailHero from './components/PortfolioDetailHero';
import PortfolioGallery from './components/PortfolioGallery';

interface PortfolioImage {
  id: number;
  image: string;
  is_cover: boolean;
}

interface PortfolioDetailData {
  id: number;
  title: string;
  date: string;
  description: string | null;
  images: PortfolioImage[];
}

interface Props {
  portfolio: PortfolioDetailData;
}

export default function PortfolioDetail({ portfolio }: Props) {
  const { __ } = useTranslation();

  return (
    <>
      <Head title={`${portfolio.title} - ${__('portfolio.hero.title')}`} />
      <Navbar />
      <main>
        <PortfolioDetailHero
          title={portfolio.title}
          date={portfolio.date}
          description={portfolio.description}
        />

        {portfolio.images && portfolio.images.length > 0 && (
          <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {__('portfolio.detail.gallery')}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {__('portfolio.detail.images_count', { count: String(portfolio.images.length) })}
                </p>
              </div>
              <PortfolioGallery images={portfolio.images} />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
