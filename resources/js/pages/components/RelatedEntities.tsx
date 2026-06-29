import { useEffect, useState } from 'react';
import { getIcon } from '@/lib/icons';
import { ShieldCheck, Building2 } from 'lucide-react';

type TargetEntity = {
    id: number;
    group_name: string;
    group_slug: string;
    entity_name: string;
    activity: string | null;
    morpho_solution: string;
    icon: string | null;
};

interface Props {
    groupSlugs: string[];
    title?: string;
}

export default function RelatedEntities({ groupSlugs, title }: Props) {
    const [entities, setEntities] = useState<TargetEntity[]>([]);

    useEffect(() => {
        fetch('/api/target-entities')
            .then(res => res.json())
            .then((data: TargetEntity[]) => {
                const filtered = data.filter(e => groupSlugs.includes(e.group_slug));
                setEntities(filtered);
            })
            .catch(() => {});
    }, [groupSlugs.join(',')]);

    if (entities.length === 0) return null;

    return (
        <section className="bg-white py-16 sm:py-20 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                        {title || 'Related Target Entities'}
                    </h2>
                    <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                        These strategic entities benefit from Morpho's solutions in this sector.
                    </p>
                </div>

                <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
                    {entities.map((entity) => {
                        const EntityIcon = entity.icon ? getIcon(entity.icon) : Building2;
                        return (
                            <div
                                key={entity.id}
                                className="group flex flex-col rounded-xl border border-gray-100 bg-gray-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/50"
                            >
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-morpho/10 text-morpho group-hover:bg-morpho group-hover:text-white transition-colors">
                                    <EntityIcon className="h-5 w-5" />
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                    {entity.entity_name}
                                </h3>
                                {entity.activity && (
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                        {entity.activity}
                                    </p>
                                )}
                                <div className="mt-3 flex items-start gap-2 rounded-md bg-morpho/5 p-2.5 dark:bg-morpho/10">
                                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-morpho" />
                                    <span className="text-xs font-medium text-morpho leading-relaxed">
                                        {entity.morpho_solution}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
