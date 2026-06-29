import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

type CorePurpose = {
    id: number;
    type: string;
    icon: string;
    title: string;
    description: string;
    subtitle: string | null;
};

export default function VisionMission() {
    const { __, locale, isRtl } = useTranslation();
    const [items, setItems] = useState<CorePurpose[]>([]);
    const subtitle = items.find(i => i.subtitle)?.subtitle || '';

    useEffect(() => {
        fetch('/api/core-purposes')
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(() => {});
    }, [locale]);

    return (
        <section className="bg-slate-50 py-16 sm:py-24 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        {__('sections.core_purpose.title')}
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        {subtitle}
                    </p>
                </div>

                <div className="relative mt-16">
                    <div className="absolute -inset-4 -z-10 hidden rounded-3xl bg-gradient-to-br from-morpho/20 to-cyan-400/20 opacity-0 blur-3xl dark:block starting:opacity-0 starting:delay-300 transition-opacity duration-1000 ease-in-out"></div>

                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/60 to-white/30 p-1 shadow-lg ring-1 ring-black/5 backdrop-blur-xl dark:from-gray-800/60 dark:to-gray-900/30 dark:ring-white/10">
                        <div className="grid grid-cols-1 items-stretch divide-y divide-gray-300/50 dark:divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0" dir={isRtl ? 'rtl' : 'ltr'}>
                            {items.map((item) => (
                                <div key={item.id} className={`flex flex-col gap-6 p-8 text-center md:p-10 lg:p-12 ${isRtl ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/80 shadow-inner dark:bg-black/20 md:mx-0">
                                        <img src={item.icon} alt={`${item.title} Icon`} className="h-10 w-10" />
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                                        <p className="mt-4 flex-1 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
