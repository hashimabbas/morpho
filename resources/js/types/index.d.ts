import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

// 1. ADD THE GENERIC PageProps TYPE DEFINITION
// This combines your shared data with any page-specific props.
export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & SharedData;

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;

    // 2. ADD THE flash PROPERTY FOR SUCCESS/ERROR MESSAGES
    flash: {
        success?: string;
        error?: string;
    };

    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
