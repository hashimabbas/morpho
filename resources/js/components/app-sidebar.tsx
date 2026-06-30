// resources/js/components/app-sidebar.tsx

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Contact, Cpu, Handshake, LayoutGrid, Mail, Presentation, Sparkles, Target, Crosshair, DollarSign, MessageSquare, Settings, Users, Heart, FileText, Phone, Share2 } from 'lucide-react';
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
    {
        title: 'Core Values',
        href: route('dashboard.core-values.index'),
        icon: Heart,
    },
    {
        title: 'Team Members',
        href: route('dashboard.team-members.index'),
        icon: Users,
    },
    {
        title: 'Target Entities',
        href: route('dashboard.target-entities.index'),
        icon: Crosshair,
    },
    {
        title: 'Pricing Plans',
        href: route('dashboard.pricing-plans.index'),
        icon: DollarSign,
    },
    {
        title: 'Pricing Inquiries',
        href: route('dashboard.pricing-inquiries.index'),
        icon: MessageSquare,
    },
    {
        title: 'Brochures',
        href: route('dashboard.brochures.index'),
        icon: FileText,
    },
    {
        title: 'Contact Infos',
        href: route('dashboard.contact-infos.index'),
        icon: Phone,
    },
    {
        title: 'Social Links',
        href: route('dashboard.social-links.index'),
        icon: Share2,
    },
    {
        title: 'Site Settings',
        href: route('dashboard.settings.index'),
        icon: Settings,
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
