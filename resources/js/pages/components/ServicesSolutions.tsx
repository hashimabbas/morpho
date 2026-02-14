// resources/js/components/ServicesSolutions.tsx

import React from 'react';
import {
    Box,
    CheckCircle,
    Cog,
    Thermometer,
    Beef,
    Sprout,
    Anchor,
    Warehouse,
    Cpu,
    ArrowRight
} from 'lucide-react';
import { Link } from '@inertiajs/react';

const sectors = [

    {
        title: 'Cold Chain & Refrigerated Transport',
        description: 'Real-time monitoring for sensitive and high-value shipments during transport.',
        icon: Thermometer,
        image: '/images/products.png',
        href: '/solutions/cold-chain',
        features: [
            'High-precision temperature & humidity monitoring',
            'Real-time GPS tracking & door opening detection',
            'Instant alerts for threshold violations',
            'Compliant digital reports for accountability',
        ],
    },
    {
        title: 'Livestock & Animal IoT Solutions',
        icon: Beef,
        image: '/images/Livestock-2.png',
        href: '/solutions/livestock',
        description: 'Real-time monitoring and management of livestock in remote environments.',
        features: [
            'Real-time location tracking & behavior analysis',
            'Vital indicators (Heart rate, temperature, respiration)',
            'Harsh environment resistance & long battery life',
            'Abnormal behavior and health alerts',
        ],
    },
    {
        title: 'Smart Agriculture & Agri-IoT Ecosystem',
        icon: Sprout,
        image: '/images/Agriculture-2.png',
        href: '/agriculture',
        description: 'Integrated agricultural system to optimize production and resource efficiency.',
        features: [
            'Sensor network for soil health & crop conditions',
            'Reduce water waste by up to 30%',
            'Early warning for disease spread prevention',
            'Satellite connectivity for remote farm coverage',
        ],
    },
    {
        title: 'Marine, Drone & Remote Assets',
        icon: Anchor,
        image: '/images/Marine-1.png',
        href: '/solutions/marine',
        description: 'Maritime security solution featuring smart marine license plate technologies.',
        features: [
            'Autonomous, tamper-resistant & satellite connected',
            'High-precision GPS & load sensors',
            '5–10 year lifespan with IP68 design',
            'Support search & rescue and fishing regulation',
        ],
    },
    {
        title: 'Smart Warehousing & Supply Chain',
        icon: Warehouse,
        image: '/images/warehouse-1.png',
        href: '/solutions/warehousing',
        description: 'Smart monitoring for food, pharmaceutical, and cold storage warehouses.',
        features: [
            'Environmental monitoring & instant alerts',
            'Full inventory visibility & decision-support reports',
            'Integration with existing management systems',
            '24/7 operation without manual intervention',
        ],
    },
];

export default function ServicesSolutions() {
    return (
        <section className="bg-slate-50 py-16 sm:py-24 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mx-auto max-w-3xl text-center opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        Morpho Smart Ecosystems
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Tailored, scalable, and sovereign IoT ecosystems built for industry-specific challenges and national security.
                    </p>
                </div>

                {/* Grid for Sector Cards */}
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-12 lg:max-w-none lg:grid-cols-2">
                    {sectors.map((sector, index) => (
                        <div
                            key={index}
                            className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                        >
                            <div className="opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                                <img
                                    className="h-64 w-full object-cover"
                                    src={sector.image}
                                    alt={sector.title}
                                />
                            </div>
                            <div className="flex flex-1 flex-col p-8 opacity-100 transition-all delay-200 duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                                <sector.icon className="h-10 w-10 text-morpho" />
                                <h3 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                    {sector.title}
                                </h3>
                                <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                                    {sector.description}
                                </p>
                                <ul
                                    role="list"
                                    className="mt-8 flex-1 space-y-4 text-sm leading-6 text-gray-600 dark:text-gray-300"
                                >
                                    {sector.features.map((feature, i) => (
                                        <li key={i} className="flex gap-x-3">
                                            <CheckCircle
                                                className="mt-0.5 h-5 w-5 flex-none text-morpho"
                                                aria-hidden="true"
                                            />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <Link
                                        href={sector.href}
                                        className="inline-flex items-center gap-2 text-morpho font-bold hover:gap-3 transition-all"
                                    >
                                        Learn More <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
