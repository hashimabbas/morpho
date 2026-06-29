import { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { getIcon } from '@/lib/icons';
import {
    Building2, Globe, Factory, HardHat, Droplets,
    ChevronDown, ChevronRight, ArrowRight, ShieldCheck
} from 'lucide-react';

type TargetEntity = {
    id: number;
    group_name: string;
    group_slug: string;
    owner: string | null;
    entity_name: string;
    activity: string | null;
    morpho_solution: string;
    icon: string | null;
};

type GroupMeta = {
    label: string;
    Icon: any;
    color: string;
    bgGradient: string;
    description: string;
};

const groupMeta: Record<string, GroupMeta> = {
    nataj: {
        label: 'Nataj — Food Investment',
        Icon: Building2,
        color: 'text-emerald-600 dark:text-emerald-400',
        bgGradient: 'from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
        description: 'Oman Food Investment Company — unifying food entities under a single vision to reduce costs and improve decision-making.',
    },
    asyad: {
        label: 'ASYAD — Global Logistics',
        Icon: Globe,
        color: 'text-cyan-600 dark:text-cyan-400',
        bgGradient: 'from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30',
        description: 'The fourth largest logistics company in MENA — managing ports, free zones, and global shipping.',
    },
    oq: {
        label: 'OQ Group — Energy',
        Icon: Factory,
        color: 'text-orange-600 dark:text-orange-400',
        bgGradient: 'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
        description: 'A global integrated energy company operating in 17 countries — the largest sector in OIA\'s portfolio.',
    },
    mining: {
        label: 'Mining Development',
        Icon: HardHat,
        color: 'text-amber-600 dark:text-amber-400',
        bgGradient: 'from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30',
        description: 'An emerging economic diversification priority under Oman Vision 2040 with vast mineral reserves.',
    },
    nama: {
        label: 'Nama — Water & Wastewater',
        Icon: Droplets,
        color: 'text-sky-600 dark:text-sky-400',
        bgGradient: 'from-sky-50 to-indigo-50 dark:from-sky-950/30 dark:to-indigo-950/30',
        description: 'Serving over 938,000 water subscribers across Oman with 27+ active infrastructure projects.',
    },
};

const groupOrder = ['nataj', 'asyad', 'oq', 'mining', 'nama'];

export default function Entities() {
    const [groups, setGroups] = useState<Record<string, TargetEntity[]>>({});
    const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/api/settings').then(res => res.json()),
            fetch('/api/target-entities').then(res => res.json()),
        ])
            .then(([settings, data]: [Record<string, string>, TargetEntity[]]) => {
                setIsVisible(settings.show_target_entities_section !== '0');
                const grouped: Record<string, TargetEntity[]> = {};
                for (const slug of groupOrder) {
                    const items = data.filter(e => e.group_slug === slug);
                    if (items.length) grouped[slug] = items;
                }
                setGroups(grouped);
            })
            .catch(() => {});
    }, []);

    const groupKeys = Object.keys(groups);

    if (!isVisible) {
        return (
            <>
                <Head title="Target Entities - Morpho" />
                <Navbar />
                <main>
                    <section className="relative flex min-h-[60vh] items-center justify-center bg-white dark:bg-gray-900">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                This page is currently unavailable.
                            </h1>
                            <p className="mt-2 text-gray-500">
                                The Target Entities section has been hidden by the administrator.
                            </p>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Head title="Target Entities - Morpho" />
            <Navbar />
            <main>
                <section className="relative overflow-hidden bg-white py-20 sm:py-28 dark:bg-gray-900">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_left,rgba(0,169,193,0.05),transparent_50%)]" />
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,169,193,0.03),transparent_50%)]" />
                    </div>

                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <span className="inline-block rounded-full bg-morpho/10 px-4 py-1.5 text-sm font-semibold text-morpho mb-6">
                                Strategic Partnerships
                            </span>
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                                Our Target Entities
                            </h1>
                            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                                Morpho Supply Chain Technologies serves strategic entities across Oman's key economic
                                sectors — including food, logistics, energy, mining, and water — all backed by the{' '}
                                <span className="font-semibold text-morpho">Oman Investment Authority</span>.
                            </p>
                        </div>

                        <div className="mt-16 space-y-6">
                            {groupKeys.map((slug) => {
                                const meta = groupMeta[slug];
                                const entityList = groups[slug];
                                const isExpanded = expandedGroup === slug;

                                return (
                                    <div
                                        key={slug}
                                        className={`group overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br ${meta.bgGradient} transition-all duration-300 dark:border-gray-700 ${
                                            isExpanded ? 'shadow-xl' : 'shadow-sm hover:shadow-md'
                                        }`}
                                    >
                                        <button
                                            onClick={() => setExpandedGroup(isExpanded ? null : slug)}
                                            className="flex w-full items-center justify-between p-6 sm:p-8 text-left"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-gray-800 ${
                                                    isExpanded ? 'ring-2 ring-morpho/30' : ''
                                                }`}>
                                                    <meta.Icon className={`h-7 w-7 ${meta.color}`} />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                                                        {meta.label}
                                                    </h2>
                                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                        {entityList.length} entities · {meta.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 dark:bg-gray-800 ${
                                                isExpanded ? 'rotate-180' : ''
                                            }`}>
                                                <ChevronDown className="h-5 w-5 text-gray-500" />
                                            </div>
                                        </button>

                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                            isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                            <div className="border-t border-gray-200 dark:border-gray-700" />
                                            <div className="p-6 sm:p-8">
                                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                                    {entityList.map((entity) => {
                                                        const EntityIcon = entity.icon ? getIcon(entity.icon) : Building2;
                                                        return (
                                                            <div
                                                                key={entity.id}
                                                                className="group/card flex flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/80"
                                                            >
                                                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-morpho/10 text-morpho group-hover/card:bg-morpho group-hover/card:text-white transition-colors">
                                                                    <EntityIcon className="h-5 w-5" />
                                                                </div>
                                                                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                                                    {entity.entity_name}
                                                                </h3>
                                                                {entity.activity && (
                                                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                                                                        {entity.activity}
                                                                    </p>
                                                                )}
                                                                <div className="mt-4 flex items-start gap-2 rounded-lg bg-morpho/5 p-3 dark:bg-morpho/10">
                                                                    <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-morpho" />
                                                                    <span className="text-xs font-medium text-morpho leading-relaxed">
                                                                        {entity.morpho_solution}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-16 text-center">
                            <div className="inline-flex items-center gap-2 rounded-full bg-morpho/5 px-6 py-3 text-sm text-gray-600 dark:text-gray-400 dark:bg-morpho/10">
                                <span className="font-semibold text-morpho">Note:</span>
                                All entities are wholly or majority-owned by the Oman Investment Authority (OIA)
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
