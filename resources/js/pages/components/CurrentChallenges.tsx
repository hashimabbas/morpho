// resources/js/components/CurrentChallenges.tsx

// 1. Import the new, more positive icon
import { ShieldCheck } from 'lucide-react';

const challenges = [
    'Product spoilage due to poor monitoring during transportation',
    'Inability to trace the source of damage in transported goods',
    'Lack of real-time shipment tracking',
    'Exposure to fines due to regulatory and compliance violations',
    'Temperature fluctuations impacting shipment quality',
    'Weak coordination across the supply chain stages',
    'Increased environmental waste from spoiled products',
    'Lack of transparency in operational processes',
    'Rising costs from unexpected equipment failures',
    'Difficulty proving compliance during official inspections',
    'Absence of early warning tools for in-transit issues',
];

export default function CurrentChallenges() {
    return (
        <section className="bg-slate-50 py-16 sm:py-24 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* 2. Update the header to be solution-focused */}
                <div className="mx-auto max-w-3xl text-center opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        Eliminating Critical Flaws in Cold Chains
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Our technology directly targets and solves the industry's most persistent challenges, turning
                        vulnerabilities into strengths.
                    </p>
                </div>

                {/* Grid of Solved Challenges */}
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                        {challenges.map((challenge, index) => (
                            <div
                                key={challenge}
                                className={`relative pl-16 opacity-100 transition-all delay-${100 * (index % 3)} duration-700 ease-in-out starting:translate-y-4 starting:opacity-0`}
                            >
                                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-morpho">
                                        {/* 3. Use the ShieldCheck icon to signify a solved problem */}
                                        <ShieldCheck className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    <span className="sr-only">Solved Challenge:</span>
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                                    {challenge}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
