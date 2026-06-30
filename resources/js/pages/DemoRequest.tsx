import { Head, usePage } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useTranslation } from '@/hooks/useTranslation';

import type { PageProps } from '@/types';
import DemoRequestHeader from './components/DemoRequestHeader';
import DemoRequestForm from './components/DemoRequestForm';

export default function DemoRequest() {
    const { flash } = usePage<PageProps>().props;
    const { __ } = useTranslation();

    return (
        <>
            <Head title={__('demo_request.page_title')} />
            <Navbar />
            <main className="relative overflow-hidden">
                {/* Header Section */}
                <DemoRequestHeader />

                {/* Decorative top gradient */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-morpho/10 to-transparent dark:from-morpho/20"
                />

                {/* Form Section */}
                <section
                    id="demo-request-form"
                    className="relative py-20 sm:py-28 bg-white dark:bg-gray-900 scroll-mt-20"
                >
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        {/* Section Heading */}
                        <div className="mb-12 text-center opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                {__('demo_request.form.title')}
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                {__('demo_request.form.description')}
                            </p>
                        </div>

                        {/* Form Card */}
                        <div className="rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:bg-gray-800/80 dark:shadow-gray-900/30 transition-all hover:shadow-xl">
                            <DemoRequestForm successMessage={flash?.success} />
                        </div>
                    </div>
                </section>

                {/* Decorative bottom gradient */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 -z-10 h-[400px] bg-gradient-to-t from-morpho/10 to-transparent dark:from-morpho/20"
                />
            </main>
            <Footer />
        </>
    );
}
