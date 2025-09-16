// resources/js/components/TargetMarket.tsx

import React from 'react';

// Using your updated image paths
const sectors = [
    {
        name: 'Pharmaceutical & Medical',
        description: 'Ensuring the integrity of sensitive medical supplies and pharmaceuticals.',
        imageUrl: '/images/solutions/pharmaceutical.png',
    },
    {
        name: 'Cold Chain Logistics',
        description: 'Advanced monitoring for temperature-sensitive goods on the move.',
        imageUrl: '/images/solutions/cold.png',
    },
    {
        name: 'Food & Beverages',
        description: 'From farm to table, we guarantee freshness and quality for consumables.',
        imageUrl: '/images/solutions/food.png',
    },
    {
        name: 'Fisheries Distribution',
        description: 'Preserving the catch with real-time tracking from ocean to market.',
        imageUrl: '/images/solutions/fisheries.png',
    },
    {
        name: 'Insurance & Risk',
        description: 'Providing verifiable data to mitigate risk and streamline claims.',
        imageUrl: '/images/solutions/insurance.png',
    },
    {
        name: 'Oil, Gas & Chemicals',
        description: 'Safeguarding volatile assets with robust and reliable monitoring.',
        imageUrl: '/images/solutions/oil.png',
    },
    {
        name: 'Construction',
        description: 'Tracking heavy equipment and materials for efficient project management.',
        imageUrl: '/images/solutions/construction.png',
    },
    {
        name: 'Warehousing & Storage',
        description: 'Optimizing inventory control and asset security in modern facilities.',
        imageUrl: '/images/solutions/warehousing.png',
    },
];

export default function TargetMarket() {
    return (
        <section className="bg-white py-16 sm:py-24 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mx-auto max-w-3xl text-center transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        Industries We Empower
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Our solutions are engineered for the critical demands of diverse sectors, ensuring integrity
                        and efficiency at every step.
                    </p>
                </div>

                {/* Grid of Image-based Cards - Updated to be 3 columns on large screens */}
                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
                    {sectors.map((sector, index) => (
                        <div
                            key={sector.name}
                            // Stagger the animation delay for each card, now based on 3 columns
                            className={`group flex flex-col transform-gpu transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0 delay-${100 * (index % 3)}`}
                        >
                            {/* Card container with shadow and hover effects */}
                            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">

                                {/* Image container with aspect ratio */}
                                <div className="relative w-full h-0 pb-[62.5%] overflow-hidden">
                                    <img
                                        src={sector.imageUrl}
                                        alt={sector.name}
                                        width={400}
                                        height={250}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                    />
                                </div>

                                {/* Text content area */}
                                <div className="flex flex-1 flex-col p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {sector.name}
                                    </h3>
                                    <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                                        {sector.description}
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
