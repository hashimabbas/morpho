import { router } from '@inertiajs/react';
import { Languages } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function LanguageSwitcher() {
    const { __, locale } = useTranslation();

    const toggleLanguage = () => {
        const next = locale === 'en' ? 'ar' : 'en';
        router.post(route('language.switch'), { locale: next });
    };

    return (
        <button
            onClick={toggleLanguage}
            className="relative mr-4 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            title={locale === 'en' ? __('language_switcher.ar') : __('language_switcher.en')}
        >
            <Languages className="h-5 w-5" />
            <span className="sr-only">{locale === 'en' ? __('language_switcher.ar') : __('language_switcher.en')}</span>
        </button>
    );
}
