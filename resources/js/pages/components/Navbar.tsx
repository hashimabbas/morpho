// resources/js/Components/Navbar.tsx
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LogOut, Menu, Moon, Settings, Sun, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavLink } from './NavLink';

export default function Navbar() {
    const { auth } = usePage<SharedData>().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Persist theme with localStorage
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
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/contact', label: 'Contact Us' },
    ];

    return (
        <nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-[#161615]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    {/* Left Section: Logo and Main Nav */}
                    <div className="flex">
                        {/* Logo */}
                        <div className="flex shrink-0 items-center">
                            <Link href="/" className="flex items-center py-1">
                                <img
                                    src="/new_logo_transp.png"
                                    alt="Morpho Logo"
                                    className="h-12 w-auto sm:h-14"
                                />
                            </Link>
                        </div>



                        {/* Desktop Navigation Links */}
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            {navLinks.map((link) => (
                                <NavLink key={link.href} href={link.href}>
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Right Section: Theme Toggle and Auth */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <button
                            onClick={toggleTheme}
                            className="relative mr-4 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute inset-0 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </button>

                        {auth.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span className="sr-only">Open user menu</span>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuLabel>{auth.user.name}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href={route('profile.edit')}>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href={route('logout')} method="post" as="button" className="w-full">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log Out</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="space-x-4">
                                <Link
                                    href={route('login')}
                                    className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Log in
                                </Link>
                                {/* <Link
                                    href={route('register')}
                                    className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Register
                                </Link> */}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={toggleTheme}
                            className="relative mr-2 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute inset-0 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none dark:hover:bg-gray-800"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            {isMobileMenuOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navLinks.map((link) => (
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
                                    <div className="ml-3">
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
                                        <User className="mr-3 h-5 w-5" />
                                        Profile
                                    </Link>
                                    <Link
                                        href="#"
                                        className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                    >
                                        <Settings className="mr-3 h-5 w-5" />
                                        Settings
                                    </Link>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                    >
                                        <LogOut className="mr-3 h-5 w-5" />
                                        Log Out
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-1 px-2">
                                <NavLink
                                    href={route('login')}
                                    className="block rounded-md px-3 py-2 text-base font-medium"
                                >
                                    Log In
                                </NavLink>
                                <NavLink
                                    href={route('register')}
                                    className="block rounded-md px-3 py-2 text-base font-medium"
                                >
                                    Register
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
