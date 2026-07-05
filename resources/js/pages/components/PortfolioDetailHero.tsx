import { Link } from '@inertiajs/react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { format } from 'date-fns';

interface Props {
  title: string;
  date: string;
  description: string | null;
}

const PortfolioDetailHero = ({ title, date, description }: Props) => {
  const { __, isRtl } = useTranslation();

  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-[#F8FAFC] dark:bg-[#030712]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(0,169,193,0.05),transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          href={route('portfolio.index')}
          className="inline-flex items-center gap-2 text-morpho hover:text-morpho-dark font-medium mb-8 transition-colors group"
        >
          <ArrowLeft className={`w-4 h-4 transition-transform group-hover:-translate-x-1 ${isRtl ? 'rotate-180' : ''}`} />
          {__('portfolio.detail.back')}
        </Link>

        <div className="max-w-4xl">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(date), 'MMMM dd, yyyy')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white mb-6">
            {title}
          </h1>

          {description && (
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioDetailHero;
