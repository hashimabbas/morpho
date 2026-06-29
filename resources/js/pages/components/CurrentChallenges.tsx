import { ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const challengeKeys = Array.from({ length: 11 }, (_, i) => `challenge_${i + 1}`);

export default function CurrentChallenges() {
    const { __ } = useTranslation();

    return (
        <section className="bg-slate-50 py-16 sm:py-24 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        {__('sections.current_challenges.title')}
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        {__('sections.current_challenges.description')}
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                        {challengeKeys.map((key, index) => (
                            <div
                                key={key}
                                className={`relative pl-16 opacity-100 transition-all delay-${100 * (index % 3)} duration-700 ease-in-out starting:translate-y-4 starting:opacity-0`}
                            >
                                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-morpho">
                                        <ShieldCheck className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    <span className="sr-only">Solved Challenge:</span>
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                                    {__(`sections.current_challenges.${key}`)}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
