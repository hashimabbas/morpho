import { Head, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from '@/components/LanguageSwitcher';

import type { PageProps } from '@/types';
import DemoRequestForm from './components/DemoRequestForm';

export default function DemoRequestKiosk() {
    const { flash } = usePage<PageProps>().props;
    const { __ } = useTranslation();

    return (
        <>
            <Head title={__('demo_request.page_title')} />
            <div className="min-h-screen bg-white dark:bg-gray-900">
                {/* Minimal top bar: logo + language switcher only */}
                <header className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-gray-800 sm:px-6">
                    <img
                        src="/new_logo_transp.png"
                        alt="Morpho"
                        className="h-8 w-auto sm:h-9"
                    />
                    <LanguageSwitcher />
                </header>

                <main className="relative overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 -z-10 h-[300px] bg-gradient-to-b from-morpho/10 to-transparent dark:from-morpho/20"
                    />

                    <section className="relative py-10 sm:py-16">
                        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                            <div className="mb-8 text-center sm:mb-12">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                    {__('demo_request.form.title')}
                                </h1>
                                <p className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-4 sm:text-lg">
                                    {__('demo_request.form.description')}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/80 p-5 shadow-lg backdrop-blur-sm dark:bg-gray-800/80 dark:shadow-gray-900/30 sm:p-8">
                                <DemoRequestForm successMessage={flash?.success} />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
