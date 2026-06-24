// resources/js/components/app-sidebar.tsx

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Contact, Cpu, Handshake, LayoutGrid, Mail, Presentation, Sparkles, Target } from 'lucide-react'; // 1. Import the new icons
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
        icon: LayoutGrid, // Icon for Dashboard
    },
    {
        title: 'Messages',
        href: route('dashboard.messages'),
        icon: Mail, // 2. Use the Mail icon for Messages
    },
    {
        title: 'Demo Request',
        href: route('dashboard.demo-requests.index'),
        icon: Presentation, // 2. Use the Presentation  icon for Messages
    },
    {
        title: 'Contacts',
        href: route('dashboard.contacts.index'),
        icon: Contact, // 3. Use the Contact icon for Contacts
    },
    {
        title: 'Partners',
        href: route('dashboard.partners.index'),
        icon: Handshake,
    },
    {
        title: 'Highlights',
        href: route('dashboard.highlights.index'),
        icon: Sparkles,
    },
    {
        title: 'Core Purposes',
        href: route('dashboard.core-purposes.index'),
        icon: Target,
    },
    {
        title: 'Ecosystems',
        href: route('dashboard.ecosystems.index'),
        icon: Cpu,
    },
];

const footerNavItems: NavItem[] = [

];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard.index')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
