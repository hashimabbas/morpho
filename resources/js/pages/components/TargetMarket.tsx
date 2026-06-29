import { useTranslation } from '@/hooks/useTranslation';

const sectors = [
    { key: 'pharmaceutical', imageUrl: '/images/solutions/pharmaceutical.png' },
    { key: 'cold_chain', imageUrl: '/images/solutions/cold.png' },
    { key: 'food', imageUrl: '/images/solutions/food.png' },
    { key: 'fisheries', imageUrl: '/images/solutions/fisheries.png' },
    { key: 'insurance', imageUrl: '/images/solutions/insurance.png' },
    { key: 'oil', imageUrl: '/images/solutions/oil.png' },
    { key: 'construction', imageUrl: '/images/solutions/construction.png' },
    { key: 'warehousing', imageUrl: '/images/solutions/warehousing.png' },
];

export default function TargetMarket() {
    const { __ } = useTranslation();

    return (
        <section className="bg-white py-16 sm:py-24 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        {__('sections.target_market.title')}
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        {__('sections.target_market.description')}
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
                    {sectors.map((sector, index) => (
                        <div
                            key={sector.key}
                            className={`group flex flex-col transform-gpu transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0 delay-${100 * (index % 3)}`}
                        >
                            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
                                <div className="relative w-full h-0 pb-[62.5%] overflow-hidden">
                                    <img
                                        src={sector.imageUrl}
                                        alt={__(`sections.target_market.${sector.key}`)}
                                        width={400}
                                        height={250}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {__(`sections.target_market.${sector.key}`)}
                                    </h3>
                                    <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                                        {__(`sections.target_market.${sector.key}_desc`)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
