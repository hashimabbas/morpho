import { Head } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PortfolioHero from './components/PortfolioHero';
import PortfolioGrid from './components/PortfolioGrid';

interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  date: string;
  description: string | null;
  cover_image: string | null;
  images_count: number;
}

interface Props {
  portfolios: PortfolioItem[];
}

export default function Portfolios({ portfolios }: Props) {
  const { __ } = useTranslation();

  return (
    <>
      <Head title={__('portfolio.head_title')} />
      <Navbar />
      <main>
        <PortfolioHero />
        <PortfolioGrid items={portfolios} />
      </main>
      <Footer />
    </>
  );
}
