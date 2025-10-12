// resources/js/components/app-sidebar.tsx

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Contact, LayoutGrid, Mail, Presentation } from 'lucide-react'; // 1. Import the new icons
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
