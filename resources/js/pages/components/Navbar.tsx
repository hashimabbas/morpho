import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Activity,
    ChevronDown,
    LogOut,
    Menu,
    Moon,
    Settings,
    Sprout,
    Sun,
    ThermometerSnowflake,
    User,
    Warehouse,
    Waves,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { NavLink } from './NavLink';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';

export default function Navbar() {
    const { auth } = usePage<SharedData>().props;
    const { __, isRtl } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileEcosystemOpen, setIsMobileEcosystemOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const navLinks = [
        { href: '/', label: __('nav.home') },
        { href: '/about', label: __('nav.about') },
        { href: '/brochures', label: __('nav.solutions') },
        { href: '/entities', label: __('nav.entities') },
        { href: '/pricing', label: __('nav.pricing') },
        { href: '/demo_request', label: __('nav.demo_request') },
        { href: '/contact', label: __('nav.contact_us') },
    ];

    const ecosystemItems = [
        {
            label: __('ecosystem_items.cold_chain'),
            href: '/solutions/cold-chain',
            icon: ThermometerSnowflake,
            description: __('ecosystem_items.cold_chain_desc'),
        },
        {
            label: __('ecosystem_items.livestock'),
            href: '/solutions/livestock',
            icon: Activity,
            description: __('ecosystem_items.livestock_desc'),
        },
        {
            label: __('ecosystem_items.agriculture'),
            href: '/solutions/agriculture',
            icon: Sprout,
            description: __('ecosystem_items.agriculture_desc'),
        },
        {
            label: __('ecosystem_items.marine'),
            href: '/solutions/marine',
            icon: Waves,
            description: __('ecosystem_items.marine_desc'),
        },
        {
            label: __('ecosystem_items.warehousing'),
            href: '/solutions/warehousing',
            icon: Warehouse,
            description: __('ecosystem_items.warehousing_desc'),
        },
    ];

    return (
        <nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-[#161615]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex shrink-0 items-center">
                            <Link href="/" className="flex items-center py-1">
                                <img
                                    src="/new_logo_transp.png"
                                    alt="Morpho Logo"
                                    className="h-12 w-auto sm:h-14"
                                />
                            </Link>
                        </div>

                        <div className="hidden sm:-my-px sm:ms-10 sm:flex sm:space-x-8 rtl:space-x-reverse">
                            <NavLink href="/" active={usePage().url === '/'}>
                                {__('nav.home')}
                            </NavLink>

                            <DropdownMenu>
                                <DropdownMenuTrigger className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out hover:border-gray-300 hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300">
                                    {__('nav.ecosystem')}
                                    <ChevronDown className="ms-1 h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align={isRtl ? 'end' : 'start'} className="w-[300px] p-2">
                                    <DropdownMenuLabel className="text-xs uppercase tracking-wider text-gray-500">
                                        {__('nav.our_solutions')}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {ecosystemItems.map((item) => (
                                        <DropdownMenuItem key={item.href} asChild>
                                            <Link
                                                href={item.href}
                                                className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                                            >
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-morpho text-white dark:bg-orange-900/20 dark:text-orange-400">
                                                    <item.icon className="h-5 w-5 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                        {item.label}
                                                    </div>
                                                    <p className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {navLinks.filter(link => link.href !== '/').map((link) => (
                                <NavLink key={link.href} href={link.href}>
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                        <LanguageSwitcher />
                        <button
                            onClick={toggleTheme}
                            className="relative me-4 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute inset-0 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">{__('nav.toggle_theme')}</span>
                        </button>

                        {auth.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span className="sr-only">{__('nav.open_user_menu')}</span>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuLabel>{auth.user.name}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href={route('profile.edit')}>
                                            <User className="me-2 h-4 w-4" />
                                            <span>{__('nav.profile')}</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="me-2 h-4 w-4" />
                                        <span>{__('nav.settings')}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href={route('logout')} method="post" as="button" className="w-full">
                                            <LogOut className="me-2 h-4 w-4" />
                                            <span>{__('nav.logout')}</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex space-x-4 rtl:space-x-reverse">
                                <Link
                                    href={route('login')}
                                    className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                >
                                    {__('nav.login')}
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center sm:hidden -me-2">
                        <LanguageSwitcher />
                        <button
                            onClick={toggleTheme}
                            className="relative me-2 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute inset-0 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">{__('nav.toggle_theme')}</span>
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none dark:hover:bg-gray-800"
                        >
                            <span className="sr-only">{__('nav.open_menu')}</span>
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <NavLink
                            href="/"
                            className="block rounded-md px-3 py-2 text-base font-medium"
                        >
                            {__('nav.home')}
                        </NavLink>

                        <div className="space-y-1">
                            <button
                                onClick={() => setIsMobileEcosystemOpen(!isMobileEcosystemOpen)}
                                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                            >
                                {__('nav.ecosystem')}
                                <ChevronDown className={cn("h-4 w-4 transition-transform", isMobileEcosystemOpen && "rotate-180")} />
                            </button>
                            {isMobileEcosystemOpen && (
                                <div className="ms-4 space-y-1">
                                    {ecosystemItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-300"
                                        >
                                            <item.icon className="h-4 w-4 text-orange-500" />
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {navLinks.filter(link => link.href !== '/').map((link) => (
                            <NavLink
                                key={link.href}
                                href={link.href}
                                className="block rounded-md px-3 py-2 text-base font-medium"
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 pb-3 pt-4 dark:border-gray-700">
                        {auth.user ? (
                            <>
                                <div className="flex items-center px-4">
                                    <div className="shrink-0">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="ms-3">
                                        <div className="text-base font-medium text-gray-800 dark:text-white">
                                            {auth.user.name}
                                        </div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {auth.user.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    <Link
                                        href={route('profile.edit')}
                                        className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                    >
                                        <User className="me-3 h-5 w-5" />
                                        {__('nav.profile')}
                                    </Link>
                                    <Link
                                        href="#"
                                        className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                    >
                                        <Settings className="me-3 h-5 w-5" />
                                        {__('nav.settings')}
                                    </Link>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                    >
                                        <LogOut className="me-3 h-5 w-5" />
                                        {__('nav.logout')}
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-1 px-2">
                                <NavLink
                                    href={route('login')}
                                    className="block rounded-md px-3 py-2 text-base font-medium"
                                >
                                    {__('nav.login')}
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
