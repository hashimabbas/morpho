import { useEffect, useState } from 'react';
import { getIcon } from '@/lib/icons';
import { Building2, Globe, Factory, HardHat, Droplets, ChevronDown } from 'lucide-react';

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

type GroupedEntities = Record<string, TargetEntity[]>;

const groupMeta: Record<string, { label: string; Icon: any; color: string }> = {
    nataj:  { label: 'Nataj — Food Investment', Icon: Building2, color: 'from-emerald-500 to-green-600' },
    asyad:  { label: 'ASYAD — Global Logistics', Icon: Globe, color: 'from-cyan-500 to-blue-600' },
    oq:     { label: 'OQ Group — Energy', Icon: Factory, color: 'from-orange-500 to-red-600' },
    mining: { label: 'Mining Development', Icon: HardHat, color: 'from-amber-500 to-yellow-600' },
    nama:   { label: 'Nama — Water & Wastewater', Icon: Droplets, color: 'from-sky-500 to-indigo-600' },
};

export default function TargetEntities() {
    const [groups, setGroups] = useState<GroupedEntities>({});
    const [activeGroup, setActiveGroup] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/api/settings').then(res => res.json()),
            fetch('/api/target-entities').then(res => res.json()),
        ])
            .then(([settings, data]: [Record<string, string>, TargetEntity[]]) => {
                setIsVisible(settings.show_target_entities_section !== '0');
                const grouped: GroupedEntities = {};
                const order = ['nataj', 'asyad', 'oq', 'mining', 'nama'];
                for (const slug of order) {
                    const items = data.filter(e => e.group_slug === slug);
                    if (items.length) grouped[slug] = items;
                }
                setGroups(grouped);
                const firstKey = Object.keys(grouped)[0];
                if (firstKey) setActiveGroup(firstKey);
            })
            .catch(() => {});
    }, []);

    const groupKeys = Object.keys(groups);
    if (!isVisible || groupKeys.length === 0) return null;

    return (
        <section className="relative overflow-hidden bg-white py-16 sm:py-24 dark:bg-gray-900">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_top_right,rgba(0,169,193,0.04),transparent_70%)]" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,169,193,0.04),transparent_70%)]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        Target Entities
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Our solutions serve strategic entities across Oman's key economic sectors, all backed by the{' '}
                        <span className="font-semibold text-morpho">Oman Investment Authority</span>.
                    </p>
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-3">
                    {groupKeys.map((slug) => {
                        const meta = groupMeta[slug];
                        const isActive = activeGroup === slug;
                        return (
                            <button
                                key={slug}
                                onClick={() => setActiveGroup(slug)}
                                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                                    isActive
                                        ? 'bg-morpho text-white shadow-lg shadow-morpho/25'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                                }`}
                            >
                                <meta.Icon className="h-4 w-4" />
                                {meta.label}
                                <span className={`ml-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                                    isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                                }`}>
                                    {groups[slug].length}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {activeGroup && groups[activeGroup] && (
                    <div className="mt-10">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {groups[activeGroup].map((entity, idx) => {
                                const EntityIcon = entity.icon ? getIcon(entity.icon) : Building2;
                                return (
                                    <div
                                        key={entity.id}
                                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-800/50"
                                        style={{ animationDelay: `${idx * 80}ms` }}
                                    >
                                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-morpho/10 text-morpho transition-colors group-hover:bg-morpho group-hover:text-white">
                                            <EntityIcon className="h-5 w-5" />
                                        </div>

                                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                            {entity.entity_name}
                                        </h3>

                                        {entity.activity && (
                                            <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-3">
                                                {entity.activity}
                                            </p>
                                        )}

                                        <div className="mt-auto pt-4">
                                            <span className="inline-block rounded-md bg-morpho/10 px-3 py-1.5 text-xs font-medium text-morpho dark:bg-morpho/20">
                                                {entity.morpho_solution}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
