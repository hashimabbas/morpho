import { Award, Cpu, Handshake, Landmark, Route } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import React from 'react';

const items = [
    { key: 'item_1', icon: Handshake },
    { key: 'item_2', icon: Cpu },
    { key: 'item_3', icon: Route },
    { key: 'item_4', icon: Landmark },
    { key: 'item_5', icon: Award },
];

export default function Achievements() {
    const { __ } = useTranslation();
    return (
        <section className="bg-white py-16 sm:py-24 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-morpho sm:text-4xl">
                        {__('sections.achievements.title')}
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        {__('sections.achievements.description')}
                    </p>
                </div>

                {/* --- Vertical Timeline --- */}
                <div className="relative mx-auto mt-16 max-w-5xl">
                    {/* The vertical line: shifts to the left on mobile */}
                    <div
                        className="absolute left-8 top-4 h-[calc(100%-2rem)] w-0.5 -translate-x-1/2 bg-gray-200 dark:bg-gray-700 md:left-1/2"
                        aria-hidden="true"
                    ></div>

                    <div className="space-y-12">
                        {items.map((item, index) => (
                            <div
                                key={item.key}
                                className="group relative flex items-center"
                            >
                                <div className="absolute left-8 z-10 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-morpho to-cyan-400 shadow-lg transition-transform duration-300 group-hover:scale-110 md:left-1/2">
                                    <item.icon className="h-8 w-8 text-white" />
                                </div>

                                <div
                                    className={`w-full pl-24 transition-all duration-700 ease-in-out starting:opacity-0 starting:translate-x-8 md:w-5/12
                                    ${index % 2 === 0
                                            ? 'md:ml-auto md:pl-16'
                                            : 'md:mr-auto md:pl-0 md:pr-16 md:text-right starting:md:-translate-x-8'
                                        }`}
                                >
                                    <div className="rounded-lg border border-gray-200 bg-white/60 p-6 shadow-md backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/60">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {__(`sections.achievements.${item.key}_title`)}
                                        </h3>
                                        <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                                            {__(`sections.achievements.${item.key}_desc`)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
