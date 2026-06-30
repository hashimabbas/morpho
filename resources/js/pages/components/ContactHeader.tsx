import { Mail, Phone } from 'lucide-react';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import EmblaCarouselFade from 'embla-carousel-fade';
import { useTranslation } from '@/hooks/useTranslation';
import { usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';

type ImageType = {
    src: string;
    alt: string;
};

const images: ImageType[] = [
    { src: '/images/header3.png', alt: 'Map showing the location of our main office' },
    { src: '/images/header1.png', alt: 'Our team ready to answer your questions' },
    { src: '/images/header2.png', alt: 'A customer support specialist on a call' },
];

export default function ContactHeader(): JSX.Element {
    const { __ } = useTranslation();
    const { locale } = usePage<PageProps>().props;
    const isRtl = locale === 'ar';

    const [emblaRef] = useEmblaCarousel(
        { loop: true, direction: isRtl ? 'rtl' : 'ltr' },
        [Autoplay({ delay: 3000, stopOnInteraction: false }), EmblaCarouselFade()]
    );

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="grid grid-cols-1 items-center gap-y-16 lg:grid-cols-2 lg:gap-x-24">
                    <div className={`text-center ${isRtl ? 'lg:text-right' : 'lg:text-left'}`}>
                        <div className="opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
                                {__('contact.hero.heading_1')}
                                <span className="mt-2 block bg-gradient-to-r from-morpho to-cyan-400 bg-clip-text text-transparent">
                                    {__('contact.hero.heading_2')}
                                </span>
                            </h1>
                            <p className="mt-6 max-w-xl text-lg text-gray-600 lg:mx-0 dark:text-gray-300">
                                {__('contact.hero.description')}
                            </p>
                        </div>

                        <div className={`mt-10 flex flex-wrap items-center gap-4 ${isRtl ? 'lg:justify-start justify-center' : 'justify-center lg:justify-start'}`}>
                            <div className="opacity-100 transition-all delay-200 duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                                <a
                                    href="#contact-form"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-morpho px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-morpho-dark focus:outline-none focus:ring-2 focus:ring-morpho focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                                >
                                    <Mail className="h-5 w-5" />
                                    {__('contact.hero.cta_send')}
                                </a>
                            </div>
                            <div className="opacity-100 transition-all delay-300 duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                                <a
                                    href="#contact-details"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 border-transparent bg-gray-100 px-6 py-3 text-base font-semibold text-morpho-dark transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-800 dark:text-morpho-light dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900"
                                >
                                    <Phone className="h-5 w-5" />
                                    {__('contact.hero.cta_info')}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="relative opacity-100 transition-all delay-200 duration-1000 ease-in-out starting:translate-y-8 starting:opacity-0">
                        <div className="absolute inset-0 -z-10 -translate-x-4 -translate-y-4 rounded-xl bg-[linear-gradient(45deg,theme(colors.gray.50)_25%,transparent_25%),linear-gradient(-45deg,theme(colors.gray.50)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,theme(colors.gray.50)_75%),linear-gradient(-45deg,transparent_75%,theme(colors.gray.50)_75%)] bg-[length:20px_20px] opacity-60 dark:bg-[linear-gradient(45deg,theme(colors.gray.800)_25%,transparent_25%),linear-gradient(-45deg,theme(colors.gray.800)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,theme(colors.gray.800)_75%),linear-gradient(-45deg,transparent_75%,theme(colors.gray.800)_75%)]"></div>

                        <div className="overflow-hidden rounded-xl" ref={emblaRef}>
                            <div className="flex">
                                {images.map((image, index) => (
                                    <div className="relative min-w-0 flex-shrink-0 flex-grow-0 basis-full" key={index}>
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="relative w-full"
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
