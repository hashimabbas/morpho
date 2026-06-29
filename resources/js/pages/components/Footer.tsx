import { Link } from '@inertiajs/react';
import {
    Globe,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    Twitter
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const socialLinks = [
    {
        name: 'Instagram',
        href: 'https://instagram.com/morpho_om',
        icon: Instagram,
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/morpho_om',
        icon: Twitter,
    },
    {
        name: 'LinkedIn',
        href: 'https://linkedin.com/company/morpho-supply-chain-technologies',
        icon: Linkedin,
    },
];

export default function Footer() {
    const { __, isRtl } = useTranslation();

    const quickLinks = [
        { name: __('nav.home'), href: '/' },
        { name: __('nav.about'), href: '/about' },
        { name: __('nav.pricing'), href: '/pricing' },
        { name: __('nav.contact_us'), href: '/contact' },
    ];

    return (
        <footer className="bg-slate-50 dark:bg-gray-950" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                {__('footer.heading')}
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center m-0 py-1">
                            <img
                                src="/new_logo_transp.png"
                                alt="Morpho Logo"
                                className="h-20 w-auto sm:h-25"
                            />
                        </Link>
                        <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
                            {__('footer.description')}
                        </p>
                        <div className="space-y-4 text-sm">
                            <a
                                href="tel:+96879976223"
                                className="flex items-center gap-3 text-gray-600 transition hover:text-morpho dark:text-gray-300 dark:hover:text-morpho"
                            >
                                <Phone className="h-5 w-5 shrink-0" />
                                <span>+968 7997 6223</span>
                            </a>
                            <a
                                href="mailto:info@morphosct.com"
                                className="flex items-center gap-3 text-gray-600 transition hover:text-morpho dark:text-gray-300 dark:hover:text-morpho"
                            >
                                <Mail className="h-5 w-5 shrink-0" />
                                <span>info@morphosct.com</span>
                            </a>
                            <a
                                href="https://www.morphosct.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-600 transition hover:text-morpho dark:text-gray-300 dark:hover:text-morpho"
                            >
                                <Globe className="h-5 w-5 shrink-0" />
                                <span>www.morphosct.com</span>
                            </a>
                        </div>
                    </div>

                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                                    {__('footer.quick_links')}
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {quickLinks.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm leading-6 text-gray-600 transition hover:text-morpho dark:text-gray-300 dark:hover:text-morpho"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                                    {__('footer.legal')}
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link href={route('privacy.policy')} className="text-sm leading-6 text-gray-600 transition hover:text-morpho dark:text-gray-300 dark:hover:text-morpho">{__('footer.privacy_policy')}</Link>
                                    </li>
                                    <li>
                                        <Link href={route('terms.service')} className="text-sm leading-6 text-gray-600 transition hover:text-morpho dark:text-gray-300 dark:hover:text-morpho">{__('footer.terms_of_service')}</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-1 md:gap-8" />
                    </div>
                </div>

                <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between dark:border-white/10">
                    <div>
                        <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                            {__('footer.copyright', { year: String(new Date().getFullYear()) })}
                        </p>
                    </div>
                    <div className="mt-4 flex space-x-6 rtl:space-x-reverse lg:mt-0">
                        {socialLinks.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 transition hover:text-morpho dark:text-gray-400 dark:hover:text-morpho"
                            >
                                <span className="sr-only">{item.name}</span>
                                <item.icon className="h-6 w-6" aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
