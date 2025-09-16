import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react'; // Import Link for navigation
import { format } from 'date-fns'; // For date formatting
import { UserIcon, MailIcon, EyeIcon } from 'lucide-react'; // Example icons, ensure you have them installed
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming you have a Card component

// Define types for the data passed from the controller
interface UserData {
    id: number;
    name: string;
    email: string;
    created_at: string;
}


interface MessageData {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface VisitData {
    id: number;
    ip_address: string;
    user_agent: string;
    url: string;
    user?: { id: number; name: string }; // Optional user if authenticated
    created_at: string;
}

interface DashboardProps {
    totalUsers: number;
    latestUsers: UserData[];
    totalMessages: number;
    unreadMessagesCount: number;
    latestMessages: MessageData[]; // This type implies it's an array
    totalVisits: number;
    uniqueVisitorsToday: number;
    latestVisits: VisitData[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({
    totalUsers,
    latestUsers,
    totalMessages,
    unreadMessagesCount,
    // Add a default empty array for latestMessages just in case
    latestMessages = [],
    totalVisits,
    uniqueVisitorsToday,
    latestVisits,
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Overview Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <UserIcon className="size-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalUsers}</div>
                            <p className="text-xs text-muted-foreground">Registered accounts</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Messages</CardTitle>
                            <MailIcon className="size-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalMessages}</div>
                            <p className="text-xs text-muted-foreground">
                                {unreadMessagesCount} unread
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Website Visits</CardTitle>
                            <EyeIcon className="size-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalVisits}</div>
                            <p className="text-xs text-muted-foreground">
                                {uniqueVisitorsToday} unique visitors today
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Latest Data Sections */}
                <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    {/* Latest Users */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Latest Users</CardTitle>
                            <CardDescription>Recently registered accounts.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Also add a default empty array for latestUsers, just in case */}
                                {(latestUsers || []).length > 0 ? (
                                    latestUsers.map((user) => (
                                        <div key={user.id} className="flex items-center">
                                            <div className="ml-4 space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {user.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <div className="ml-auto font-medium text-xs text-muted-foreground">
                                                {format(new Date(user.created_at), 'MMM dd, yyyy')}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No users registered yet.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Latest Messages */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Latest Messages</CardTitle>
                            <CardDescription>Recent contact form submissions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* This is the line that caused the error previously,
                                    now handled by the default prop value. */}
                                {latestMessages.length > 0 ? (
                                    latestMessages.map((message) => (
                                        <div key={message.id} className="flex flex-col gap-1 border-b pb-2 last:border-b-0">
                                            <p className="text-sm font-medium leading-none">
                                                {message.name} - {message.subject}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {message.message}
                                            </p>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <span>{message.email}</span>
                                                <span className="ml-auto">
                                                    {message.is_read ? 'Read' : 'Unread'} -{' '}
                                                    {format(new Date(message.created_at), 'MMM dd, yyyy HH:mm')}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No messages yet.</p>
                                )}
                                <div className="mt-4 text-right">
                                    <Link href={route('dashboard.messages')} className="text-sm text-primary hover:underline">
                                        View All Messages &rarr;
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Latest Visits */}
                    <Card className="xl:col-span-1">
                        <CardHeader>
                            <CardTitle>Latest Website Visits</CardTitle>
                            <CardDescription>Recent activity on your site.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Also add a default empty array for latestVisits, just in case */}
                                {(latestVisits || []).length > 0 ? (
                                    latestVisits.map((visit) => (
                                        <div key={visit.id} className="flex flex-col gap-1 border-b pb-2 last:border-b-0">
                                            <p className="text-sm font-medium leading-none">
                                                {visit.user?.name || 'Guest'}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {visit.url}
                                            </p>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <span>{visit.ip_address}</span>
                                                <span className="ml-auto">
                                                    {format(new Date(visit.created_at), 'MMM dd, yyyy HH:mm')}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No visits recorded yet.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
