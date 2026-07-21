import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import EmblaCarouselFade from 'embla-carousel-fade';
import { useTranslation } from '@/hooks/useTranslation';
import { useEffect, useState } from 'react';

type ImageType = {
    src: string;
    alt: string;
};

type HeroData = {
    subtitle: string;
    heading: string;
    description: string;
    feature_1: string;
    feature_2: string;
    feature_2_desc: string;
    cta_text: string;
    explore_text: string;
    images: ImageType[];
    is_active: boolean;
};

const defaultHero: HeroData = {
    subtitle: 'Welcome to Morpho',
    heading: 'Innovative <span class="text-morpho">Cold Chain</span> &amp; Environmental Control Solutions',
    description: 'Empowering industries with advanced cold chain monitoring, smart agriculture, and environmental control systems across the Middle East and Africa.',
    feature_1: 'Comprehensive Environmental Control',
    feature_2: 'Data-Driven Insights',
    feature_2_desc: 'Real-time monitoring and analytics for informed decision-making.',
    cta_text: 'Request a Demo',
    explore_text: 'Explore Brochures',
    images: [
        { src: '/images/solutions/cold.png', alt: 'Cold Chain Solutions' },
        { src: '/images/warehouse-1.png', alt: 'Warehouse Monitoring' },
        { src: '/images/Agriculture-1.png', alt: 'Smart Agriculture' },
        { src: '/images/Livestock-2.png', alt: 'Livestock Monitoring' },
        { src: '/images/Marine-1.png', alt: 'Marine & Fisheries' },
    ],
    is_active: true,
};

export default function HeroSection(): JSX.Element {
    const { __, isRtl, locale } = useTranslation();
    const [hero, setHero] = useState<HeroData | null>(null);

    useEffect(() => {
        fetch('/api/hero')
            .then(res => res.ok ? res.json() : null)
            .then(data => setHero(data && Array.isArray(data.images) ? data : defaultHero))
            .catch(() => setHero(defaultHero));
    }, [locale]);

    const [emblaRef] = useEmblaCarousel(
        { loop: true },
        [Autoplay({ delay: 5000, stopOnInteraction: false }), EmblaCarouselFade()]
    );

    const content = hero || defaultHero;

    return (
        <section className="relative min-h-[600px] overflow-hidden py-20 lg:py-32 bg-[#F8FAFC] dark:bg-[#030712]">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(0,169,193,0.03),transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,169,193,0.03),transparent_50%)]" />
            </div>

            <div className="absolute inset-0 pointer-events-none opacity-[0.07] dark:opacity-[0.15]">
                <svg className="h-full w-full" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 200 L150 200 L200 150" stroke="currentColor" strokeWidth="1" className="text-morpho" />
                    <circle cx="160" cy="200" r="4" fill="currentColor" className="text-morpho" />
                    <path d="M850 800 L950 800 L1000 750" stroke="currentColor" strokeWidth="1" className="text-morpho" />
                    <circle cx="940" cy="800" r="4" fill="currentColor" className="text-morpho" />
                </svg>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className={`grid grid-cols-1 items-center gap-y-16 lg:grid-cols-2 lg:gap-x-24`}>
                    <div className="relative">
                        <div className="animate-in fade-in slide-in-from-left-4 duration-1000">
                            <h2 className="text-xl font-bold tracking-widest uppercase text-morpho mb-4">
                                {content.subtitle}
                            </h2>

                            <h1
                                className="text-4xl font-extrabold sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-morpho dark:text-white mb-8"
                                dangerouslySetInnerHTML={{ __html: content.heading }}
                            />

                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-xl leading-relaxed">
                                {content.description}
                            </p>
                        </div>

                        <div className="space-y-10">
                            <div className="flex gap-6 items-start group">
                                <div className="w-1 h-14 bg-morpho/30 dark:bg-morpho/20 shrink-0 rounded-full relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-full bg-morpho transition-transform duration-500 origin-top transform scale-y-0 group-hover:scale-y-100" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1">
                                        {content.feature_1}
                                    </h4>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start group">
                                <div className="w-1 h-14 bg-morpho/30 dark:bg-morpho/20 shrink-0 rounded-full relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-full bg-morpho transition-transform duration-500 origin-top transform scale-y-0 group-hover:scale-y-100" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1">
                                        {content.feature_2}
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-500 font-medium">
                                        {content.feature_2_desc}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-14 flex flex-wrap gap-5">
                            <Link
                                href={route('demo_request')}
                                className="inline-flex items-center justify-center rounded-lg bg-morpho px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-morpho-dark hover:translate-y-[-2px] active:translate-y-0"
                            >
                                {content.cta_text}
                                {isRtl ? (
                                    <ChevronRight className="ms-2 w-5 h-5 rotate-180" />
                                ) : (
                                    <ChevronRight className="ms-2 w-5 h-5" />
                                )}
                            </Link>

                            <Link
                                href="/brochures"
                                className="inline-flex items-center justify-center rounded-lg border-2 border-gray-200 dark:border-gray-800 px-8 py-4 text-base font-bold text-gray-900 dark:text-white transition-all hover:bg-gray-50 dark:hover:bg-gray-900"
                            >
                                {content.explore_text}
                            </Link>
                        </div>
                    </div>

                    <div className="relative animate-in fade-in zoom-in duration-1000 delay-200">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-morpho/20 to-transparent rounded-[2rem] blur-xl opacity-50" />
                        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800" ref={emblaRef} dir="ltr">
                            <div className="flex">
                                {content.images.map((image, index) => (
                                    <div className="min-w-0 shrink-0 grow-0 basis-full relative group" key={index}>
                                        <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                                            <img
                                                src={image.src}
                                                alt={image.alt}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
