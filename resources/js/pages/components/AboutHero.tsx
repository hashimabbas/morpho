import { Link } from '@inertiajs/react';
import { ChevronRight, DatabaseZap } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import EmblaCarouselFade from 'embla-carousel-fade';

type ImageType = {
    src: string;
    alt: string;
};

const images: ImageType[] = [
    { src: '/images/solutions/cold.png', alt: 'Cold Chain Solutions' },
    { src: '/images/warehouse-1.png', alt: 'Warehouse Monitoring' },
    { src: '/images/Agriculture-1.png', alt: 'Smart Agriculture' },
    { src: '/images/Livestock-2.png', alt: 'Livestock Monitoring' },
    { src: '/images/Marine-1.png', alt: 'Marine & Fisheries' },
];

export default function HeroSection(): JSX.Element {
    const { __, isRtl } = useTranslation();
    const [emblaRef] = useEmblaCarousel(
        { loop: true },
        [Autoplay({ delay: 5000, stopOnInteraction: false }), EmblaCarouselFade()]
    );

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="grid grid-cols-1 items-center gap-y-16 lg:grid-cols-2 lg:gap-x-24">
                    <div className="text-center lg:text-left">
                        <div className="opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                            <h1 className="text-4xl font-extrabold text-morpho tracking-tight sm:text-5xl lg:text-6xl dark:text-white">
                                {__('about.hero.heading')}
                                <span className="mt-2 text-3xl block text-gray-700 bg-gradient-to-r from-morpho to-cyan-400 bg-clip-text dark:text-white">
                                    {__('about.hero.subtitle')}
                                </span>
                            </h1>
                            <p className="mt-6 max-w-xl text-lg text-gray-800 lg:mx-0 dark:text-gray-300">
                                {__('about.hero.description')}
                            </p>
                        </div>

                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                            <div className="opacity-100 transition-all delay-200 duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                                <Link
                                    href={route('contact')}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-morpho px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-morpho-dark focus:outline-none focus:ring-2 focus:ring-morpho focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                                >
                                    {__('about.hero.contact_btn')}
                                    <ChevronRight className={`h-5 w-5 ${isRtl ? 'rotate-180' : ''}`} />
                                </Link>
                            </div>
                            <div className="opacity-100 transition-all delay-300 duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                                <Link
                                    href="/brochures"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 border-transparent bg-gray-100 px-6 py-3 text-base font-semibold text-morpho-dark transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-800 dark:text-morpho-light dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900"
                                >
                                    <DatabaseZap className="h-5 w-5" />
                                    {__('about.hero.solutions_btn')}
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="relative opacity-100 transition-all delay-200 duration-1000 ease-in-out starting:translate-y-8 starting:opacity-0">
                        <div className="absolute inset-0 -z-10 -translate-x-4 -translate-y-4 rounded-xl bg-[linear-gradient(45deg,theme(colors.gray.50)_25%,transparent_25%),linear-gradient(-45deg,theme(colors.gray.50)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,theme(colors.gray.50)_75%),linear-gradient(-45deg,transparent_75%,theme(colors.gray.50)_75%)] bg-[length:20px_20px] opacity-60 dark:bg-[linear-gradient(45deg,theme(colors.gray.800)_25%,transparent_25%),linear-gradient(-45deg,theme(colors.gray.800)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,theme(colors.gray.800)_75%),linear-gradient(-45deg,transparent_75%,theme(colors.gray.800)_75%)]"></div>

                        <div className="overflow-hidden rounded-xl" ref={emblaRef} dir="ltr">
                            <div className="flex">
                                {images.map((image, index) => (
                                    <div className="min-w-0 flex-shrink-0 flex-grow-0 basis-full" key={index}>
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-64 sm:h-96 object-cover"
                                            loading="lazy"
                                            decoding="async"
                                            style={{ objectFit: "contain" }}
                                        />
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
