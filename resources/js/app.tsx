import '../css/app.css';

import { createInertiaApp, usePage } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { useEffect } from 'react';

const appName = import.meta.env.VITE_APP_NAME || 'Morpho';

function LocaleSync() {
    const { locale } = usePage<any>().props;

    useEffect(() => {
        document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = locale === 'ar' ? 'ar' : 'en';
        document.body.classList.remove('font-arabic', 'font-sans');
        document.body.classList.add(locale === 'ar' ? 'font-arabic' : 'font-sans');
    }, [locale]);

    return null;
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        function AppWithLocale({ Component, key, props: pageProps }: any) {
            return (
                <>
                    <Component {...pageProps} />
                    <LocaleSync />
                </>
            );
        }

        root.render(<App {...props}>{AppWithLocale}</App>);
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();
