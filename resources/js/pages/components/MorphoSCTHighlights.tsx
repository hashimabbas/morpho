import { useEffect, useState } from 'react';
import { getIcon } from '@/lib/icons';

type Highlight = {
    id: number;
    icon: string;
    title: string;
    description: string;
};

export default function MorphoSCTHighlights() {
    const [highlights, setHighlights] = useState<Highlight[]>([]);

    useEffect(() => {
        fetch('/api/highlights')
            .then(res => res.json())
            .then(data => setHighlights(data))
            .catch(() => {});
    }, []);
    return (
        <section className="bg-slate-50 py-16 sm:py-24 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        Morpho SCT Highlights
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
                        End-to-end visibility and intelligence for cold chain logistics — from origin to final delivery.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {highlights.map((item) => {
                        const Icon = getIcon(item.icon);
                        return (
                            <div
                                key={item.id}
                                className="group relative flex flex-col items-start rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-900"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-morpho/10 text-morpho transition-colors group-hover:bg-morpho group-hover:text-white">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
