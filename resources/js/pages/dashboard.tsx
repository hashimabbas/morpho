import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, Mail, Eye, MessageSquare, UserPlus, Building2, ImageIcon, Target, FileText, Globe, Link2, Star, Layers, BookOpen, Tags, MapPin, Puzzle, Send, CheckCircle, AlertCircle, TrendingUp, Activity, Handshake, Crosshair } from 'lucide-react';

interface UserData { id: number; name: string; email: string; created_at: string; }
interface MessageData { id: number; name: string; email: string; subject: string; message: string; is_read: boolean; created_at: string; }
interface VisitData { id: number; ip_address: string; user_agent: string; url: string; user?: { id: number; name: string }; created_at: string; }
interface DayData { date: string; count: number; unique_count?: number; }
interface SectionCounts { partners: number; portfolios: number; coreValues: number; corePurposes: number; brochures: number; teamMembers: number; ecosystems: number; highlights: number; socialLinks: number; targetEntities: number; contactInfos: number; pricingPlans: number; }

interface DashboardProps {
    totalUsers: number; latestUsers: UserData[];
    totalMessages: number; unreadMessagesCount: number; readMessagesCount: number; latestMessages: MessageData[]; messagesPerDay: DayData[];
    totalVisits: number; uniqueVisitorsToday: number; latestVisits: VisitData[]; visitsPerDay: DayData[];
    sectionCounts: SectionCounts;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#a855f7', '#d946ef'];

const sectionMeta: Record<keyof SectionCounts, { label: string; icon: any; href: string; color: string }> = {
    partners: { label: 'Partners', icon: Handshake, href: '/dashboard/partners', color: 'bg-indigo-500' },
    portfolios: { label: 'Portfolios', icon: ImageIcon, href: '/dashboard/portfolios', color: 'bg-purple-500' },
    coreValues: { label: 'Core Values', icon: Star, href: '/dashboard/core-values', color: 'bg-pink-500' },
    corePurposes: { label: 'Core Purposes', icon: Target, href: '/dashboard/core-purposes', color: 'bg-rose-500' },
    brochures: { label: 'Brochures', icon: FileText, href: '/dashboard/brochures', color: 'bg-orange-500' },
    teamMembers: { label: 'Team', icon: Users, href: '/dashboard/team-members', color: 'bg-amber-500' },
    ecosystems: { label: 'Ecosystems', icon: Layers, href: '/dashboard/ecosystems', color: 'bg-yellow-500' },
    highlights: { label: 'Highlights', icon: Activity, href: '/dashboard/highlights', color: 'bg-lime-500' },
    socialLinks: { label: 'Social Links', icon: Link2, href: '/dashboard/social-links', color: 'bg-green-500' },
    targetEntities: { label: 'Target Entities', icon: Crosshair, href: '/dashboard/target-entities', color: 'bg-teal-500' },
    contactInfos: { label: 'Contact Info', icon: MapPin, href: '/dashboard/contact-infos', color: 'bg-cyan-500' },
    pricingPlans: { label: 'Pricing Plans', icon: Tags, href: '/dashboard/pricing-plans', color: 'bg-blue-500' },
};

export default function Dashboard({ totalUsers, latestUsers = [], totalMessages, unreadMessagesCount, readMessagesCount = 0, latestMessages = [], messagesPerDay = [], totalVisits, uniqueVisitorsToday, latestVisits = [], visitsPerDay = [], sectionCounts }: DashboardProps) {
    const messagePieData = [
        { name: 'Read', value: readMessagesCount, color: '#22c55e' },
        { name: 'Unread', value: unreadMessagesCount, color: '#f43f5e' },
    ];

    const stats = [
        { title: 'Total Users', value: totalUsers, icon: Users, href: '#', color: 'from-indigo-500 to-purple-600' },
        { title: 'Messages', value: totalMessages, subtitle: `${unreadMessagesCount} unread`, icon: Mail, href: '/dashboard/messages', color: 'from-pink-500 to-rose-600' },
        { title: 'Website Visits', value: totalVisits, subtitle: `${uniqueVisitorsToday} unique today`, icon: Eye, href: '#', color: 'from-amber-500 to-orange-600' },
        { title: 'Contacts', value: sectionCounts?.contactInfos ?? 0, subtitle: 'Contact info entries', icon: BookOpen, href: '/dashboard/contacts', color: 'from-emerald-500 to-teal-600' },
    ];

    const hasChartData = messagesPerDay.length > 0 || visitsPerDay.length > 0;
    const chartDays = messagesPerDay.length > 0 ? messagesPerDay : visitsPerDay.length > 0 ? visitsPerDay : [];
    const chartData = chartDays.map(d => ({
        date: format(new Date(d.date), 'MMM dd'),
        messages: messagesPerDay.find(m => m.date === d.date)?.count ?? 0,
        visits: visitsPerDay.find(v => v.date === d.date)?.count ?? 0,
        unique: visitsPerDay.find(v => v.date === d.date)?.unique_count ?? 0,
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 overflow-y-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-sm text-muted-foreground mt-1">Welcome back! Here's what's happening on your platform.</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Activity className="h-4 w-4" />
                        <span>Last 14 days</span>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <Link key={stat.title} href={stat.href} className="block">
                            <Card className="overflow-hidden border-l-4 border-l-transparent hover:border-l-indigo-500 transition-all duration-200 hover:shadow-md group cursor-pointer">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                                    <div className={`rounded-lg bg-gradient-to-br ${stat.color} p-2 text-white`}>
                                        <stat.icon className="size-4" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">{stat.value}</div>
                                    {stat.subtitle && <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {hasChartData && (
                        <Card className="xl:col-span-2">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg">Activity Overview</CardTitle>
                                        <CardDescription>Messages and visits over the last 14 days</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs">
                                        <div className="flex items-center gap-1">
                                            <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                                            <span className="text-muted-foreground">Messages</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                                            <span className="text-muted-foreground">Visits</span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-72">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData} barGap={4}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                                            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
                                            <Bar dataKey="messages" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="visits" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Message Status</CardTitle>
                            <CardDescription>Read vs unread overview</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 flex items-center justify-center">
                                {totalMessages > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={messagePieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                                                {messagePieData.map((entry, i) => (
                                                    <Cell key={i} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No messages yet</p>
                                )}
                            </div>
                            <div className="flex justify-center gap-6 text-sm">
                                {messagePieData.map(entry => (
                                    <div key={entry.name} className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                                        <span className="text-muted-foreground">{entry.name}: <strong>{entry.value}</strong></span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Content Overview</CardTitle>
                        <CardDescription>Quick access to all sections of your platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {Object.entries(sectionMeta).map(([key, meta]) => {
                                const count = sectionCounts?.[key as keyof SectionCounts] ?? 0;
                                const IconComponent = meta.icon;
                                return (
                                    <Link key={key} href={meta.href} className="group">
                                        <div className="relative overflow-hidden rounded-xl border bg-card p-4 transition-all duration-200 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 cursor-pointer">
                                            <div className={`absolute right-0 top-0 h-16 w-16 -translate-y-1/2 translate-x-1/2 rounded-full ${meta.color} opacity-10`} />
                                            <div className={`mb-3 inline-flex rounded-lg ${meta.color} p-2 text-white`}>
                                                <IconComponent className="h-4 w-4" />
                                            </div>
                                            <p className="text-sm font-medium truncate">{meta.label}</p>
                                            <p className="text-2xl font-bold mt-1">{count}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">items</p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-base">Latest Users</CardTitle>
                                <CardDescription>Recent registrations</CardDescription>
                            </div>
                            <UserPlus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {latestUsers.length > 0 ? latestUsers.map((user) => (
                                    <div key={user.id} className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold dark:bg-indigo-900 dark:text-indigo-300">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{user.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                        </div>
                                        <span className="text-xs text-muted-foreground shrink-0">{format(new Date(user.created_at), 'MMM dd')}</span>
                                    </div>
                                )) : <p className="text-sm text-muted-foreground">No users registered yet.</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-base">Latest Messages</CardTitle>
                                <CardDescription>Recent submissions</CardDescription>
                            </div>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {latestMessages.length > 0 ? latestMessages.map((msg) => (
                                    <div key={msg.id} className="flex items-start gap-3">
                                        <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full ${msg.is_read ? 'bg-gray-100 text-gray-500 dark:bg-gray-800' : 'bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-300'}`}>
                                            {msg.is_read ? <CheckCircle className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{msg.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{msg.subject}</p>
                                        </div>
                                        <span className="text-xs text-muted-foreground shrink-0">{format(new Date(msg.created_at), 'MMM dd')}</span>
                                    </div>
                                )) : <p className="text-sm text-muted-foreground">No messages yet.</p>}
                                <div className="pt-2 text-right">
                                    <Link href={route('dashboard.messages')} className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                                        View all &rarr;
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-base">Latest Visits</CardTitle>
                                <CardDescription>Recent site activity</CardDescription>
                            </div>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {latestVisits.length > 0 ? latestVisits.map((visit) => (
                                    <div key={visit.id} className="flex items-start gap-3">
                                        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300">
                                            <Eye className="h-3.5 w-3.5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{visit.user?.name || 'Guest'}</p>
                                            <p className="text-xs text-muted-foreground truncate">{visit.url}</p>
                                        </div>
                                        <span className="text-xs text-muted-foreground shrink-0">{format(new Date(visit.created_at), 'MMM dd')}</span>
                                    </div>
                                )) : <p className="text-sm text-muted-foreground">No visits recorded yet.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
