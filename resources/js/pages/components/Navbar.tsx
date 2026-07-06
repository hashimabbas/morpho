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
import { useEffect, useState, useCallback, useRef } from 'react';

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

const NAV_HEIGHT = 64;
const NAV_HEIGHT_SCROLLED = 56;

function NavLinkItem({ href, label, active }: { href: string; label: string; active: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                'relative inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morpho focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900',
                active
                    ? 'text-morpho dark:text-morpho'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/60 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/40',
            )}
        >
            {label}
            {active && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-morpho dark:bg-morpho" />
            )}
        </Link>
    );
}

function EcosystemDropdownTrigger({
    label,
    isActive,
    isOpen,
    ...props
}: {
    label: string;
    isActive: boolean;
    isOpen: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={cn(
                'group relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morpho focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900',
                isActive
                    ? 'text-morpho dark:text-morpho'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/60 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/40',
            )}
        >
            {label}
            <ChevronDown
                className={cn(
                    'h-3.5 w-3.5 transition-transform duration-200',
                    isOpen && 'rotate-180',
                )}
            />
            {isActive && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-morpho dark:bg-morpho" />
            )}
        </button>
    );
}

function ThemeToggle({ theme, onToggle, label }: { theme: string; onToggle: () => void; label: string }) {
    return (
        <button
            onClick={onToggle}
            className={cn(
                'relative rounded-full p-2 text-gray-500 transition-all duration-200',
                'hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morpho focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900',
            )}
            aria-label={label}
        >
            <Sun className={cn(
                'h-[18px] w-[18px] transition-all duration-300',
                theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100',
            )} />
            <Moon className={cn(
                'absolute inset-0 m-auto h-[18px] w-[18px] transition-all duration-300',
                theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0',
            )} />
        </button>
    );
}

function MobileNavItem({
    href,
    label,
    active,
    onClick,
    delay,
}: {
    href: string;
    label: string;
    active: boolean;
    onClick: () => void;
    delay: number;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                'flex items-center rounded-xl px-4 py-3 text-base font-medium transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morpho',
                active
                    ? 'bg-morpho/10 text-morpho dark:bg-morpho/[0.12] dark:text-morpho'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-200',
            )}
            style={{ animationDelay: `${delay}ms` }}
        >
            {label}
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
    const [ecosystemOpen, setEcosystemOpen] = useState(false);
    const mobileToggleRef = useRef<HTMLButtonElement>(null);
    const drawerCloseRef = useRef<HTMLButtonElement>(null);
    const prefersReducedMotion = useRef(false);

    useEffect(() => {
        prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 10);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => {
                setMobileMounted(true);
                requestAnimationFrame(() => {
                    drawerCloseRef.current?.focus();
                });
            });
        } else {
            document.body.style.overflow = '';
            setMobileMounted(false);
            requestAnimationFrame(() => {
                mobileToggleRef.current?.focus();
            });
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

    useEffect(() => {
        if (!isMobileMenuOpen) return;
        const handleFocus = (e: FocusEvent) => {
            const drawer = document.getElementById('mobile-drawer');
            if (drawer && !drawer.contains(e.target as Node)) {
                drawerCloseRef.current?.focus();
            }
        };
        document.addEventListener('focusin', handleFocus);
        return () => document.removeEventListener('focusin', handleFocus);
    }, [isMobileMenuOpen]);

    const toggleTheme = useCallback(() => setTheme(prev => prev === 'light' ? 'dark' : 'light'), []);

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

    const isActive = useCallback((href: string) => {
        if (href === '/') return url === '/';
        return url.startsWith(href);
    }, [url]);

    const closeMobile = useCallback(() => {
        setIsMobileMenuOpen(false);
        setIsMobileEcosystemOpen(false);
    }, []);

    const openMobile = useCallback(() => {
        setIsMobileMenuOpen(true);
    }, []);

    const navHeight = scrolled ? NAV_HEIGHT_SCROLLED : NAV_HEIGHT;
    const animDuration = prefersReducedMotion.current ? 0 : undefined;

    return (
        <header
            className={cn(
                'sticky top-0 z-50 transition-all duration-300 ease-out',
                'bg-white/80 dark:bg-[#0a0a0a]/80',
                scrolled
                    ? 'shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:shadow-[0_1px_2px_rgba(255,255,255,0.03)]'
                    : 'shadow-none',
            )}
            style={{ height: navHeight, transitionDuration: animDuration ? `${animDuration}ms` : undefined }}
        >
            <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-full items-center justify-between">
                    <div className="flex items-center gap-1 sm:gap-2 lg:gap-8">
                        <Link
                            href="/"
                            className="flex shrink-0 items-center py-1 transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morpho rounded-lg"
                            aria-label="Morpho Home"
                        >
                            <img
                                src="/new_logo_transp.png"
                                alt="Morpho Logo"
                                className="h-[44px] w-auto sm:h-[48px] transition-all duration-300"
                                style={{ height: scrolled ? 36 : undefined }}
                            />
                        </Link>

                        <nav className="hidden sm:flex sm:items-center sm:gap-0.5" aria-label="Main navigation">
                            <NavLinkItem href="/" label={__('nav.home')} active={isActive('/')} />

                            <DropdownMenu open={ecosystemOpen} onOpenChange={setEcosystemOpen}>
                                <DropdownMenuTrigger asChild>
                                    <EcosystemDropdownTrigger
                                        label={__('nav.ecosystem')}
                                        isActive={url.startsWith('/solutions')}
                                        isOpen={ecosystemOpen}
                                    />
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

                            {navLinks.filter(link => link.href !== '/').map((link) => (
                                <NavLinkItem key={link.href} href={link.href} label={link.label} active={isActive(link.href)} />
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-1.5">
                        <div className="hidden sm:flex sm:items-center sm:gap-1">
                            <LanguageSwitcher />
                            <ThemeToggle theme={theme} onToggle={toggleTheme} label={__('nav.toggle_theme')} />

                            {auth.user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            className={cn(
                                                'flex rounded-full text-sm transition-all duration-200',
                                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morpho focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900',
                                                'hover:ring-2 hover:ring-morpho/30 hover:ring-offset-2 dark:hover:ring-offset-gray-900',
                                            )}
                                        >
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
                                    className={cn(
                                        'rounded-xl bg-morpho px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200',
                                        'hover:bg-morpho-dark hover:shadow-md hover:shadow-morpho/20',
                                        'active:scale-[0.97]',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morpho focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900',
                                    )}
                                >
                                    {__('nav.login')}
                                </Link>
                            )}
                        </div>

                        <div className="flex items-center gap-0.5 sm:hidden">
                            <LanguageSwitcher />
                            <ThemeToggle theme={theme} onToggle={toggleTheme} label={__('nav.toggle_theme')} />
                            <button
                                ref={mobileToggleRef}
                                onClick={openMobile}
                                className={cn(
                                    'inline-flex items-center justify-center rounded-xl p-2.5 text-gray-500 transition-all duration-200',
                                    'hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800',
                                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morpho',
                                )}
                                aria-label={__('nav.open_menu')}
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-drawer"
                            >
                                <Menu className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-50 sm:hidden"
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                >
                    <div
                        className={cn(
                            'absolute inset-0 bg-black/50 transition-opacity duration-300',
                            mobileMounted ? 'opacity-100' : 'opacity-0',
                        )}
                        style={prefersReducedMotion.current ? { transition: 'none' } : undefined}
                        onClick={closeMobile}
                        aria-hidden="true"
                    />

                    <div
                        id="mobile-drawer"
                        className={cn(
                            'absolute top-0 bottom-0 flex w-full max-w-sm flex-col bg-white dark:bg-[#0a0a0a] shadow-2xl transition-transform duration-300 ease-out',
                            isRtl ? 'left-0' : 'right-0',
                            mobileMounted ? 'translate-x-0' : isRtl ? 'translate-x-full' : '-translate-x-full',
                        )}
                        style={prefersReducedMotion.current ? { transition: 'none' } : undefined}
                        role="dialog"
                        aria-modal="true"
                        aria-label={__('nav.mobile_menu')}
                    >
                        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 dark:border-gray-800/60">
                            <Link href="/" onClick={closeMobile} className="transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morpho rounded-lg">
                                <img
                                    src="/new_logo_transp.png"
                                    alt="Morpho Logo"
                                    className="h-[42px] w-auto"
                                />
                            </Link>
                            <button
                                ref={drawerCloseRef}
                                onClick={closeMobile}
                                className={cn(
                                    'rounded-xl p-2.5 text-gray-500 transition-all duration-200',
                                    'hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800',
                                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morpho',
                                )}
                                aria-label={__('nav.close_menu')}
                                autoFocus
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-6" aria-label="Mobile navigation">
                            <div className="space-y-1">
                                <MobileNavItem
                                    href="/"
                                    label={__('nav.home')}
                                    active={isActive('/')}
                                    onClick={closeMobile}
                                    delay={0}
                                />

                                <div>
                                    <button
                                        onClick={() => setIsMobileEcosystemOpen(!isMobileEcosystemOpen)}
                                        className={cn(
                                            'flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all duration-200',
                                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morpho',
                                            url.startsWith('/solutions')
                                                ? 'bg-morpho/10 text-morpho dark:bg-morpho/[0.12] dark:text-morpho'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-200',
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
                                            'overflow-hidden transition-all duration-200 ease-out',
                                            isMobileEcosystemOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
                                        )}
                                    >
                                        <div className={cn('space-y-0.5 py-1.5', isRtl ? 'pr-4' : 'pl-4')}>
                                            {ecosystemItems.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={closeMobile}
                                                    className={cn(
                                                        'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200',
                                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morpho',
                                                        'text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-300',
                                                    )}
                                                >
                                                    <item.icon className="h-4 w-4 text-morpho shrink-0" />
                                                    {__(item.labelKey)}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {navLinks.filter(link => link.href !== '/').map((link, index) => (
                                    <MobileNavItem
                                        key={link.href}
                                        href={link.href}
                                        label={link.label}
                                        active={isActive(link.href)}
                                        onClick={closeMobile}
                                        delay={(index + 1) * 30}
                                    />
                                ))}
                            </div>
                        </nav>

                        <div className="border-t border-gray-100 px-4 py-4 dark:border-gray-800/60" style={{ paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}>
                            {auth.user ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 px-2">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-morpho to-morpho-dark font-semibold text-white shadow-sm shrink-0">
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
                                    <div className="space-y-0.5">
                                        <Link
                                            href={route('profile.edit')}
                                            onClick={closeMobile}
                                            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morpho"
                                        >
                                            <User className="h-4 w-4 shrink-0" />
                                            {__('nav.profile')}
                                        </Link>
                                        <Link
                                            href="#"
                                            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morpho"
                                        >
                                            <Settings className="h-4 w-4 shrink-0" />
                                            {__('nav.settings')}
                                        </Link>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            onClick={closeMobile}
                                            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morpho"
                                        >
                                            <LogOut className="h-4 w-4 shrink-0" />
                                            {__('nav.logout')}
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href={route('login')}
                                    onClick={closeMobile}
                                    className={cn(
                                        'flex w-full items-center justify-center rounded-xl bg-morpho px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200',
                                        'hover:bg-morpho-dark hover:shadow-md hover:shadow-morpho/20',
                                        'active:scale-[0.98]',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morpho focus-visible:ring-offset-2',
                                    )}
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
