import { Head, Link } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { getIcon } from '@/lib/icons';
import { ChevronRight, CheckCircle2, DatabaseZap } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import EmblaCarouselFade from 'embla-carousel-fade';
import React from 'react';

interface Ecosystem {
    id: number;
    type: string;
    slug: string;
    icon: string;
    title: string;
    description: string;
    image: string | null;
    href: string | null;
    features: string[];
    content: Content | null;
    subtitle: string | null;
    sort_order: number;
    is_visible: boolean;
}

interface Content {
    hero?: {
        title?: string;
        subtitle?: string;
        description?: string;
        badge?: string;
        badgeIcon?: string;
        image?: string;
        images?: { src: string; alt: string }[];
    };
    sections?: Section[];
}

interface Section {
    type: string;
    title?: string;
    description?: string;
    subtitle?: string;
    image?: string;
    bgColor?: string;
    features?: string[];
    items?: SectionItem[];
    stats?: StatItem[];
}

interface SectionItem {
    icon?: string;
    title?: string;
    description?: string;
    label?: string;
    value?: string;
    name?: string;
    step?: string;
}

interface StatItem {
    label: string;
    value: string;
    icon?: string;
}

interface Props {
    ecosystem: Ecosystem;
}

function FormulaSection({ section }: { section: Section }) {
    return (
        <div className={`rounded-3xl ${section.bgColor === 'blue' ? 'bg-blue-900' : 'bg-morpho'} p-8 text-center text-white shadow-xl sm:p-12`}>
            <h2 className="text-2xl font-bold sm:text-3xl">{section.title}</h2>
            {section.subtitle && (
                <p className="mt-4 text-xl font-medium opacity-90 sm:text-2xl">{section.subtitle}</p>
            )}
        </div>
    );
}

function ChallengesSection({ section }: { section: Section }) {
    return (
        <>
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">{section.title}</h2>
                {section.description && (
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">{section.description}</p>
                )}
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {section.items?.map((item, index) => {
                    const Icon = item.icon ? getIcon(item.icon) : CheckCircle2;
                    return (
                        <div
                            key={index}
                            className="relative rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100/50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                <Icon className="h-6 w-6 text-morpho" />
                            </div>
                            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                            {item.description && (
                                <p className="mt-2 text-gray-600 dark:text-gray-400">{item.description}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

function SolutionSection({ section }: { section: Section }) {
    return (
        <div className="rounded-3xl bg-white p-8 shadow-lg dark:bg-gray-900 sm:p-16 border border-gray-100 dark:border-gray-800">
            <div className="lg:flex lg:items-center lg:gap-16">
                <div className="lg:w-1/2">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{section.title}</h2>
                    {section.description && (
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{section.description}</p>
                    )}
                    {section.features && section.features.length > 0 && (
                        <ul className="mt-8 space-y-4">
                            {section.features.map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-morpho" />
                                    <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {section.image && (
                    <div className="mt-12 lg:mt-0 lg:w-1/2">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img src={section.image} alt={section.title || ''} className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function CapabilitiesSection({ section }: { section: Section }) {
    return (
        <>
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">{section.title}</h2>
                {section.description && (
                    <p className="mt-4 text-gray-600 dark:text-gray-400">{section.description}</p>
                )}
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {section.items?.map((item, index) => {
                    const Icon = item.icon ? getIcon(item.icon) : CheckCircle2;
                    return (
                        <div key={index} className="group p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-sm hover:shadow-md transition-shadow dark:border dark:border-gray-800">
                            <Icon className="h-10 w-10 text-morpho mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold dark:text-white mb-2">{item.title}</h3>
                            {item.description && (
                                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

function ValuesSection({ section }: { section: Section }) {
    return (
        <div className={`${section.bgColor === 'dark' ? 'bg-gray-900' : 'bg-white dark:bg-gray-900'} rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden`}>
            <div className="relative z-10">
                <h2 className="text-3xl font-extrabold sm:text-4xl text-center mb-16">{section.title}</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {section.items?.map((item, index) => (
                        <div key={index} className="border-l-4 border-morpho bg-white/5 p-6 backdrop-blur-sm">
                            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">{item.label}</p>
                            <p className="mt-1 text-2xl font-extrabold text-white">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute top-0 right-0 h-64 w-64 bg-morpho blur-[100px] rounded-full" />
        </div>
    );
}

function SectorsSection({ section }: { section: Section }) {
    return (
        <>
            <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">{section.title}</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                {section.items?.map((item, index) => {
                    const Icon = item.icon ? getIcon(item.icon) : CheckCircle2;
                    return (
                        <div key={index} className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 font-bold text-gray-700 dark:text-gray-300">
                            <Icon className="h-5 w-5 text-morpho" />
                            {item.name}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

function OverviewSection({ section }: { section: Section }) {
    return (
        <div className="lg:flex lg:items-center lg:gap-16">
            <div className="lg:w-1/2">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">{section.title}</h2>
                {section.description && (
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{section.description}</p>
                )}
                {section.stats && section.stats.length > 0 && (
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        {section.stats.map((stat, index) => {
                            const StatIcon = stat.icon ? getIcon(stat.icon) : CheckCircle2;
                            return (
                                <div key={index} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
                                    <StatIcon className="h-5 w-5 text-morpho" />
                                    <div>
                                        <p className="text-xs text-gray-500">{stat.label}</p>
                                        <p className="font-bold text-gray-900 dark:text-white">{stat.value}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            {section.image && (
                <div className="mt-12 lg:mt-0 lg:w-1/2">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-blue-900/20 p-4">
                        <img src={section.image} alt={section.title || ''} className="rounded-xl w-full h-full object-cover" />
                    </div>
                </div>
            )}
        </div>
    );
}

function OfferingsSection({ section }: { section: Section }) {
    return (
        <>
            <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">{section.title}</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {section.items?.map((item, index) => {
                    const Icon = item.icon ? getIcon(item.icon) : CheckCircle2;
                    return (
                        <div key={index} className="group p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-sm hover:shadow-md transition-shadow dark:border dark:border-gray-800 flex gap-6">
                            <div className="flex-shrink-0">
                                <Icon className="h-10 w-10 text-morpho group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold dark:text-white mb-2">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

function WorkflowSection({ section }: { section: Section }) {
    return (
        <>
            <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">{section.title}</h2>
            </div>
            <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800 hidden lg:block -translate-y-1/2" />
                <div className="grid gap-12 lg:grid-cols-4 relative">
                    {section.items?.map((item, index) => (
                        <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm text-center relative">
                            <div className="h-10 w-10 bg-morpho text-white rounded-full flex items-center justify-center font-bold mx-auto mb-6 ring-8 ring-gray-50 dark:ring-gray-800/50">
                                {item.step}
                            </div>
                            <h3 className="text-lg font-bold dark:text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

function SecuritySection({ section }: { section: Section }) {
    return (
        <div className="rounded-3xl bg-white p-8 shadow-lg dark:bg-gray-900 sm:p-16 border border-gray-100 dark:border-gray-800">
            <div className="lg:flex lg:items-center lg:gap-16">
                <div className="lg:w-1/2">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{section.title}</h2>
                    {section.description && (
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{section.description}</p>
                    )}
                    {section.features && section.features.length > 0 && (
                        <ul className="mt-8 space-y-4">
                            {section.features.map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-morpho" />
                                    <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="mt-12 lg:mt-0 lg:w-1/2">
                    <div className="relative rounded-2xl p-8 bg-blue-50 dark:bg-blue-900/10 border-2 border-dashed border-blue-200 dark:border-blue-800">
                        <div className="relative z-10 text-center py-12">
                            <div className="text-center">
                                <CheckCircle2 className="h-16 w-16 text-morpho mx-auto mb-6" />
                            </div>
                            <h4 className="text-2xl font-bold dark:text-white">{section.subtitle || 'Sovereign Architecture'}</h4>
                            {section.image && (
                                <p className="mt-2 text-gray-500">{section.image}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DecisionSupportSection({ section }: { section: Section }) {
    return (
        <>
            <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white italic">
                    {section.title ? `"${section.title}"` : ''}
                </h2>
            </div>
            <div className="grid gap-12 lg:grid-cols-2">
                {section.items?.map((item, index) => (
                    <div key={index} className="flex gap-6">
                        <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-morpho text-white font-bold">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

function ProblemsSection({ section }: { section: Section }) {
    return (
        <>
            <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{section.title}</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {section.items?.map((item, index) => {
                    const Icon = item.icon ? getIcon(item.icon) : CheckCircle2;
                    return (
                        <div
                            key={index}
                            className="relative rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100/50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                                <Icon className="h-6 w-6 text-morpho" />
                            </div>
                            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

const sectionRenderers: Record<string, React.ComponentType<{ section: Section }>> = {
    formula: FormulaSection,
    challenges: ChallengesSection,
    solution: SolutionSection,
    capabilities: CapabilitiesSection,
    values: ValuesSection,
    sectors: SectorsSection,
    overview: OverviewSection,
    offerings: OfferingsSection,
    workflow: WorkflowSection,
    security: SecuritySection,
    'decision-support': DecisionSupportSection,
    problems: ProblemsSection,
};

function renderSection(section: Section, index: number) {
    const Renderer = sectionRenderers[section.type];
    if (!Renderer) return null;

    return (
        <div key={index} className={section.type === 'formula' ? '' : 'mt-24'}>
            <Renderer section={section} />
        </div>
    );
}

function SolutionHero({ ecosystem }: { ecosystem: Ecosystem }) {
    const content = ecosystem.content;
    const hero = content?.hero;
    const images = hero?.images || [
        { src: ecosystem.image || '/images/products.png', alt: ecosystem.title },
    ];
    const [emblaRef] = useEmblaCarousel(
        { loop: true },
        [Autoplay({ delay: 5000, stopOnInteraction: false }), EmblaCarouselFade()]
    );
    const BadgeIcon = hero?.badgeIcon ? getIcon(hero.badgeIcon) : undefined;

    const isCarousel = images.length > 1;

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="grid grid-cols-1 items-center gap-y-16 lg:grid-cols-2 lg:gap-x-24">
                    <div className="text-center lg:text-left">
                        <div className="opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                            {hero?.badge && (
                                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 mb-4">
                                    {BadgeIcon && <BadgeIcon className="h-4 w-4" />}
                                    <span>{hero.badge}</span>
                                </div>
                            )}
                            <h1 className="text-4xl font-extrabold text-morpho tracking-tight from-morpho to-cyan-400 sm:text-5xl lg:text-6xl dark:text-white">
                                {hero?.title || ecosystem.title}
                                {hero?.subtitle && (
                                    <span className="mt-2 text-3xl block text-gray-700 bg-gradient-to-r from-morpho to-cyan-400 bg-clip-text">
                                        {hero.subtitle}
                                    </span>
                                )}
                            </h1>
                            <p className="mt-6 max-w-xl text-lg text-gray-800 lg:mx-0 dark:text-gray-300">
                                {hero?.description || ecosystem.description}
                            </p>
                        </div>

                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                            <div className="opacity-100 transition-all delay-200 duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                                <Link
                                    href={route('contact')}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-morpho px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-morpho-dark focus:outline-none focus:ring-2 focus:ring-morpho focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                                >
                                    Contact Us
                                    <ChevronRight className="h-5 w-5" />
                                </Link>
                            </div>
                            <div className="opacity-100 transition-all delay-300 duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                                <Link
                                    href="/pricing"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 border-transparent bg-gray-100 px-6 py-3 text-base font-semibold text-morpho-dark transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-800 dark:text-morpho-light dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900"
                                >
                                    <DatabaseZap className="h-5 w-5" />
                                    Discover Our Solutions
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="relative opacity-100 transition-all delay-200 duration-1000 ease-in-out starting:translate-y-8 starting:opacity-0">
                        <div className="absolute inset-0 -z-10 -translate-x-4 -translate-y-4 rounded-xl bg-[linear-gradient(45deg,theme(colors.gray.50)_25%,transparent_25%),linear-gradient(-45deg,theme(colors.gray.50)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,theme(colors.gray.50)_75%),linear-gradient(-45deg,transparent_75%,theme(colors.gray.50)_75%)] bg-[length:20px_20px] opacity-60 dark:bg-[linear-gradient(45deg,theme(colors.gray.800)_25%,transparent_25%),linear-gradient(-45deg,theme(colors.gray.800)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,theme(colors.gray.800)_75%),linear-gradient(-45deg,transparent_75%,theme(colors.gray.800)_75%)]"></div>

                        {isCarousel ? (
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
                        ) : (
                            <div className="rounded-xl overflow-hidden">
                                <img
                                    src={images[0].src}
                                    alt={images[0].alt}
                                    className="w-full h-64 sm:h-96 object-cover"
                                    loading="lazy"
                                    decoding="async"
                                    style={{ objectFit: "contain" }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function SolutionDetail({ ecosystem }: Props) {
    const content = ecosystem.content;

    return (
        <>
            <Head title={`${ecosystem.title} - Morpho`} />
            <Navbar />
            <main>
                <SolutionHero ecosystem={ecosystem} />

                {content?.sections && content.sections.length > 0 && (
                    <div id="details" className="bg-gray-50 py-24 dark:bg-gray-800/50">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            {content.sections.map((section, index) => renderSection(section, index))}
                        </div>
                    </div>
                )}

                {(!content?.sections || content.sections.length === 0) && ecosystem.features && (
                    <div id="details" className="bg-gray-50 py-24 dark:bg-gray-800/50">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Key Features</h2>
                            </div>
                            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {ecosystem.features.map((feature, index) => (
                                    <div key={index} className="rounded-2xl bg-white p-8 shadow-md dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100/50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                            <CheckCircle2 className="h-6 w-6 text-morpho" />
                                        </div>
                                        <p className="mt-4 text-lg font-medium text-gray-900 dark:text-white">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
