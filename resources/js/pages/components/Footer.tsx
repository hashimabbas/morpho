// resources/js/components/Footer.tsx

import { Link } from '@inertiajs/react'; // Ensure Link is imported
import {
    Globe,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    Twitter
} from 'lucide-react';

const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
];

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
    return (
        <footer className="bg-slate-50 dark:bg-gray-950" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Brand and Contact Info */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center m-0 py-1">
                            <img
                                src="/new_logo_transp.png"
                                alt="Morpho Logo"
                                className="h-20  w-auto sm:h-25"
                            />
                        </Link>
                        <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
                            Ensuring the integrity and safety of your shipments with smart, real-time technology from
                            production to customer.
                        </p>
                        <div className="space-y-4 text-sm">
                            <a
                                href="tel:+96879976223"
                                className="flex items-center gap-3 text-gray-600 transition hover:text-morpho dark:text-gray-300 dark:hover:text-morpho"
                            >
                                <Phone className="h-5 w-5 flex-shrink-0" />
                                <span>+968 7997 6223</span>
                            </a>
                            <a
                                href="mailto:info@morphosct.com"
                                className="flex items-center gap-3 text-gray-600 transition hover:text-morpho dark:text-gray-300 dark:hover:text-morpho"
                            >
                                <Mail className="h-5 w-5 flex-shrink-0" />
                                <span>info@morphosct.com</span>
                            </a>
                            <a
                                href="https://www.morphosct.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-600 transition hover:text-morpho dark:text-gray-300 dark:hover:text-morpho"
                            >
                                <Globe className="h-5 w-5 flex-shrink-0" />
                                <span>www.morphosct.com</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                                    Quick Links
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
                                    Legal
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {/* --- MODIFIED LINES START --- */}
                                    <li>
                                        <Link href={route('privacy.policy')} className="text-sm leading-6 text-gray-600 transition hover:text-morpho dark:text-gray-300 dark:hover:text-morpho">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link href={route('terms.service')} className="text-sm leading-6 text-gray-600 transition hover:text-morpho dark:text-gray-300 dark:hover:text-morpho">Terms of Service</Link>
                                    </li>
                                    {/* --- MODIFIED LINES END --- */}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-1 md:gap-8">
                            {/* You could add another link column here or a newsletter signup in the future */}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Copyright and Socials */}
                <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between dark:border-white/10">
                    <div>
                        <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                            © {new Date().getFullYear()} Morpho Supply Chain Technologies. All rights reserved.
                        </p>
                    </div>
                    <div className="mt-4 flex space-x-6 lg:mt-0">
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
