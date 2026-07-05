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
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';

const ecosystemItems = [
    {
        labelKey: 'ecosystem_items.cold_chain',
        href: '/solutions/cold-chain',
        icon: ThermometerSnowflake,
        descriptionKey: 'ecosystem_items.cold_chain_desc',
    },
    {
        labelKey: 'ecosystem_items.livestock',
        href: '/solutions/livestock',
        icon: Activity,
        descriptionKey: 'ecosystem_items.livestock_desc',
    },
    {
        labelKey: 'ecosystem_items.agriculture',
        href: '/solutions/agriculture',
        icon: Sprout,
        descriptionKey: 'ecosystem_items.agriculture_desc',
    },
    {
        labelKey: 'ecosystem_items.marine',
        href: '/solutions/marine',
        icon: Waves,
        descriptionKey: 'ecosystem_items.marine_desc',
    },
    {
        labelKey: 'ecosystem_items.warehousing',
        href: '/solutions/warehousing',
        icon: Warehouse,
        descriptionKey: 'ecosystem_items.warehousing_desc',
    },
];

function NavLinkItem({ href, label, active }: { href: string; label: string; active: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                'relative inline-flex items-center px-1 py-0.5 text-sm font-medium transition-colors duration-200',
                active
                    ? 'text-morpho dark:text-morpho'
                    : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200',
            )}
        >
            {label}
            <span
                className={cn(
                    'absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full transition-all duration-200',
                    active
                        ? 'bg-morpho dark:bg-morpho'
                        : 'bg-transparent group-hover/nav:bg-gray-300 dark:group-hover/nav:bg-gray-600',
                )}
            />
        </Link>
    );
}

export default function Navbar() {
    const { auth } = usePage<SharedData>().props;
    const url = usePage().url;
    const { __, isRtl } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileEcosystemOpen, setIsMobileEcosystemOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [scrolled, setScrolled] = useState(false);
    const [mobileMounted, setMobileMounted] = useState(false);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => setMobileMounted(true));
        } else {
            document.body.style.overflow = '';
            setMobileMounted(false);
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMobileMenuOpen]);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    const navLinks = [
        { href: '/', label: __('nav.home') },
        { href: '/about', label: __('nav.about') },
        { href: '/brochures', label: __('nav.solutions') },
        { href: '/entities', label: __('nav.entities') },
        { href: '/pricing', label: __('nav.pricing') },
        { href: '/portfolio', label: __('nav.portfolio') },
        { href: '/demo_request', label: __('nav.demo_request') },
        { href: '/contact', label: __('nav.contact_us') },
    ];

    const isActive = (href: string) => {
        if (href === '/') return url === '/';
        return url.startsWith(href);
    };

    return (
        <header
            className={cn(
                'sticky top-0 z-50 transition-all duration-300',
                scrolled
                    ? 'bg-white/75 dark:bg-[#161615]/75 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_rgba(255,255,255,0.05)]'
                    : 'bg-white dark:bg-[#161615]',
            )}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Left: Logo + Desktop Nav */}
                    <div className="flex items-center gap-1 sm:gap-6 lg:gap-10">
                        <Link href="/" className="flex shrink-0 items-center py-1">
                            <img
                                src="/new_logo_transp.png"
                                alt="Morpho Logo"
                                className="h-11 w-auto sm:h-12"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden sm:flex sm:items-center sm:gap-1" aria-label="Main navigation">
                            {/* Home */}
                            <div className="group/nav">
                                <NavLinkItem href="/" label={__('nav.home')} active={isActive('/')} />
                            </div>

                            {/* Ecosystem Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className={cn(
                                            'group/nav relative inline-flex items-center gap-1 px-1 py-0.5 text-sm font-medium transition-colors duration-200',
                                            url.startsWith('/solutions')
                                                ? 'text-morpho dark:text-morpho'
                                                : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200',
                                        )}
                                    >
                                        {__('nav.ecosystem')}
                                        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                        <span
                                            className={cn(
                                                'absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full transition-all duration-200',
                                                url.startsWith('/solutions')
                                                    ? 'bg-morpho dark:bg-morpho'
                                                    : 'bg-transparent',
                                            )}
                                        />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align={isRtl ? 'end' : 'start'}
                                    className="w-[320px] p-2"
                                    sideOffset={12}
                                >
                                    <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                        {__('nav.our_solutions')}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {ecosystemItems.map((item) => (
                                        <DropdownMenuItem key={item.href} asChild>
                                            <Link
                                                href={item.href}
                                                className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-morpho-light/50 dark:hover:bg-morpho/10"
                                            >
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-morpho text-white dark:bg-morpho/20 dark:text-morpho">
                                                    <item.icon className="h-5 w-5" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                        {__(item.labelKey)}
                                                    </div>
                                                    <p className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                                                        {__(item.descriptionKey)}
                                                    </p>
                                                </div>
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Remaining nav links */}
                            {navLinks.filter(link => link.href !== '/').map((link) => (
                                <div key={link.href} className="group/nav">
                                    <NavLinkItem href={link.href} label={link.label} active={isActive(link.href)} />
                                </div>
                            ))}
                        </nav>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        <div className="hidden sm:flex sm:items-center sm:gap-1">
                            <LanguageSwitcher />
                            <button
                                onClick={toggleTheme}
                                className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                aria-label={__('nav.toggle_theme')}
                            >
                                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute inset-0 h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
                            </button>

                            {auth.user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-morpho focus:ring-offset-2 dark:focus:ring-offset-gray-900">
                                            <span className="sr-only">{__('nav.open_user_menu')}</span>
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-morpho to-morpho-dark font-semibold text-white shadow-sm">
                                                {auth.user.name.charAt(0).toUpperCase()}
                                            </div>
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48" sideOffset={8}>
                                        <DropdownMenuLabel className="text-sm font-medium">{auth.user.name}</DropdownMenuLabel>
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
                                <Link
                                    href={route('login')}
                                    className="rounded-lg bg-morpho px-4 py-2 text-sm font-medium text-white transition-all hover:bg-morpho-dark focus:outline-none focus:ring-2 focus:ring-morpho focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                                >
                                    {__('nav.login')}
                                </Link>
                            )}
                        </div>

                        {/* Mobile: Icons */}
                        <div className="flex items-center gap-1 sm:hidden">
                            <LanguageSwitcher />
                            <button
                                onClick={toggleTheme}
                                className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                aria-label={__('nav.toggle_theme')}
                            >
                                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute inset-0 h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
                            </button>
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                aria-label={__('nav.open_menu')}
                                aria-expanded={isMobileMenuOpen}
                            >
                                <Menu className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 sm:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Drawer */}
                    <div
                        className={cn(
                            'absolute top-0 bottom-0 flex w-full max-w-sm flex-col bg-white dark:bg-[#161615] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                            isRtl ? 'left-0' : 'right-0',
                            mobileMounted
                                ? 'translate-x-0'
                                : isRtl
                                  ? 'translate-x-full'
                                  : '-translate-x-full',
                        )}
                        role="dialog"
                        aria-modal="true"
                        aria-label={__('nav.open_menu')}
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 dark:border-gray-800">
                            <Link href="/" className="flex shrink-0 items-center" onClick={() => setIsMobileMenuOpen(false)}>
                                <img
                                    src="/new_logo_transp.png"
                                    alt="Morpho Logo"
                                    className="h-10 w-auto"
                                />
                            </Link>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                aria-label={__('nav.close_menu')}
                                autoFocus
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Drawer Navigation */}
                        <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Mobile navigation">
                            <div className="space-y-1">
                                {/* Home */}
                                <Link
                                    href="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        'flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors',
                                        isActive('/')
                                            ? 'bg-morpho-light/50 text-morpho dark:bg-morpho/10 dark:text-morpho'
                                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900',
                                    )}
                                >
                                    {__('nav.home')}
                                </Link>

                                {/* Ecosystem Accordion */}
                                <div>
                                    <button
                                        onClick={() => setIsMobileEcosystemOpen(!isMobileEcosystemOpen)}
                                        className={cn(
                                            'flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors',
                                            url.startsWith('/solutions')
                                                ? 'bg-morpho-light/50 text-morpho dark:bg-morpho/10 dark:text-morpho'
                                                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900',
                                        )}
                                        aria-expanded={isMobileEcosystemOpen}
                                    >
                                        {__('nav.ecosystem')}
                                        <ChevronDown
                                            className={cn(
                                                'h-4 w-4 transition-transform duration-200',
                                                isMobileEcosystemOpen && 'rotate-180',
                                            )}
                                        />
                                    </button>
                                    <div
                                        className={cn(
                                            'overflow-hidden transition-all duration-200',
                                            isMobileEcosystemOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
                                        )}
                                    >
                                        <div className={cn('space-y-1 py-1', isRtl ? 'pr-4' : 'pl-4')}>
                                            {ecosystemItems.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-300"
                                                >
                                                    <item.icon className="h-4 w-4 text-morpho" />
                                                    {__(item.labelKey)}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Remaining nav links */}
                                {navLinks.filter(link => link.href !== '/').map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            'flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors',
                                            isActive(link.href)
                                                ? 'bg-morpho-light/50 text-morpho dark:bg-morpho/10 dark:text-morpho'
                                                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900',
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </nav>

                        {/* Drawer Footer */}
                        <div className="border-t border-gray-100 px-4 py-4 dark:border-gray-800">
                            {auth.user ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 px-2">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-morpho to-morpho-dark font-semibold text-white shadow-sm">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                {auth.user.name}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {auth.user.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <Link
                                            href={route('profile.edit')}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900"
                                        >
                                            <User className="h-4 w-4" />
                                            {__('nav.profile')}
                                        </Link>
                                        <Link
                                            href="#"
                                            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900"
                                        >
                                            <Settings className="h-4 w-4" />
                                            {__('nav.settings')}
                                        </Link>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            {__('nav.logout')}
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href={route('login')}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex w-full items-center justify-center rounded-lg bg-morpho px-4 py-3 text-sm font-medium text-white transition-all hover:bg-morpho-dark"
                                >
                                    {__('nav.login')}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
