// resources/js/components/ServicesSolutions.tsx

import { Box, CheckCircle, Cog } from 'lucide-react';

const services = [
    'Morpho Integrated System for Asset Tracking and Supply Chain Management',
    'AI-powered Cloud Platform',
    'Warehouse Management System (WMS)',
    'Transportation Management System (TMS)',
    'Supply Chain Management System (SCM)',
    'On-site and Remote Technical Support',
    'Emergency Logistics Support Points',
];

const products = [
    'Advanced IoT Devices with Satellite Connectivity',
    'Handheld RFID Readers and Tracking Tag Scanners',
    'RFID Printers for Smart Label Printing',
    'A Wide Range of RFID Tags for Various Applications',
    'Smart Warehouse Accessories',
];

export default function ServicesSolutions() {
    return (
        <section className="bg-slate-50 py-16 sm:py-24 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mx-auto max-w-3xl text-center opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        Technical Services & Solutions
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Explore the powerful tools and expert support we provide to secure your supply chain from
                        end to end.
                    </p>
                </div>

                {/* Grid for Services and Products Cards */}
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2 lg:gap-12">
                    {/* Services Card */}
                    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl dark:bg-gray-900">
                        <div className="opacity-100 transition-all delay-100 duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                            <img
                                className="h-auto w-full object-cover"
                                // Replace with your own image for "Services"
                                src="/images/services.png"
                                alt="Team collaborating around a digital interface"
                            />
                        </div>
                        <div className="flex flex-1 flex-col p-8 opacity-100 transition-all delay-200 duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                            <Cog className="h-10 w-10 text-morpho" />
                            <h3 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                Our Services
                            </h3>
                            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                                Comprehensive support and management systems.
                            </p>
                            <ul
                                role="list"
                                className="mt-8 flex-1 space-y-4 text-sm leading-6 text-gray-600 dark:text-gray-300"
                            >
                                {services.map((service) => (
                                    <li key={service} className="flex gap-x-3">
                                        <CheckCircle
                                            className="mt-0.5 h-5 w-5 flex-none text-morpho"
                                            aria-hidden="true"
                                        />
                                        <span>{service}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Products Card */}
                    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl dark:bg-gray-900">
                        <div className="opacity-100 transition-all delay-100 duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                            <img
                                className="h-auto w-full object-cover"
                                // Replace with your own image for "Products"
                                src="/images/products.png"
                                alt="Modern warehouse with shipping containers and logistics equipment"
                            />
                        </div>
                        <div className="flex flex-1 flex-col p-8 opacity-100 transition-all delay-300 duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                            <Box className="h-10 w-10 text-morpho" />
                            <h3 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                Our Products
                            </h3>
                            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                                Cutting-edge hardware for reliable tracking.
                            </p>
                            <ul
                                role="list"
                                className="mt-8 flex-1 space-y-4 text-sm leading-6 text-gray-600 dark:text-gray-300"
                            >
                                {products.map((product) => (
                                    <li key={product} className="flex gap-x-3">
                                        <CheckCircle
                                            className="mt-0.5 h-5 w-5 flex-none text-morpho"
                                            aria-hidden="true"
                                        />
                                        <span>{product}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
