import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Eye, Search, MailOpen, MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import PricingInquiryFormDialog from '../components/dashboard/PricingInquiryFormDialog';

interface PricingInquiry {
    id: number;
    full_name: string;
    company_name: string;
    email: string;
    phone: string;
    interested_plan_handle: string;
    interested_plan_name: string;
    message: string | null;
    is_read: boolean;
    created_at: string;
}

interface PricingPlan {
    id: number;
    name: string;
    handle: string;
}

interface PaginatedInquiries {
    data: PricingInquiry[];
}

interface Props {
    inquiries: PaginatedInquiries;
    plans: PricingPlan[];
    filters: {
        search?: string;
        filter?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard.index') },
    { title: 'Pricing Inquiries', href: route('dashboard.pricing-inquiries.index') },
];

export default function PricingInquiries({ inquiries, plans, filters }: Props) {
    const f = filters || {} as { search?: string; filter?: string };
    const [search, setSearch] = useState(f.search || '');
    const [filter, setFilter] = useState(f.filter || 'all');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [viewingInquiry, setViewingInquiry] = useState<PricingInquiry | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('dashboard.pricing-inquiries.index'), { search, filter: filter !== 'all' ? filter : undefined }, { preserveState: true, preserveScroll: true });
    };

    const handleFilterChange = (value: string) => {
        setFilter(value);
        router.get(route('dashboard.pricing-inquiries.index'), { filter: value !== 'all' ? value : undefined, search: search || undefined }, { preserveState: true, preserveScroll: true });
    };

    const handleMarkAsRead = (inquiry: PricingInquiry) => {
        if (!inquiry.is_read) {
            router.post(route('dashboard.pricing-inquiries.markAsRead', inquiry.id), {}, { preserveScroll: true });
        }
    };

    const handleDelete = (inquiry: PricingInquiry) => {
        if (confirm(`Are you sure you want to delete this inquiry from ${inquiry.full_name}?`)) {
            router.delete(route('dashboard.pricing-inquiries.destroy', inquiry.id), {
                preserveScroll: true,
            });
        }
    };

    const handleView = (inquiry: PricingInquiry) => {
        setViewingInquiry(inquiry);
        setIsFormOpen(true);
    };

    const handleCreate = () => {
        setViewingInquiry(null);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setViewingInquiry(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pricing Inquiries" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <CardTitle>Pricing Inquiries</CardTitle>
                                <CardDescription>Manage inquiries submitted from the Pricing page.</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button onClick={handleCreate}>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Create Inquiry
                                </Button>
                                <Select value={filter} onValueChange={handleFilterChange}>
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="unread">Unread</SelectItem>
                                        <SelectItem value="read">Read</SelectItem>
                                    </SelectContent>
                                </Select>
                                <form onSubmit={handleSearch} className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-9 w-[200px]"
                                    />
                                </form>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="hidden sm:table-cell">Company</TableHead>
                                    <TableHead className="hidden md:table-cell">Plan</TableHead>
                                    <TableHead className="hidden lg:table-cell">Email</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inquiries.data.length > 0 ? (
                                    inquiries.data.map((inquiry) => (
                                        <TableRow key={inquiry.id} className={!inquiry.is_read ? 'bg-muted/30' : ''}>
                                            <TableCell className="font-medium">{inquiry.full_name}</TableCell>
                                            <TableCell className="hidden sm:table-cell">{inquiry.company_name}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <Badge variant="outline">{inquiry.interested_plan_name}</Badge>
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell text-muted-foreground">
                                                {inquiry.email}
                                            </TableCell>
                                            <TableCell>
                                                {inquiry.is_read ? (
                                                    <Badge variant="outline" className="text-muted-foreground">Read</Badge>
                                                ) : (
                                                    <Badge className="bg-[#0097b2]">New</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell text-muted-foreground">
                                                {format(new Date(inquiry.created_at), 'MMM dd, yyyy')}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleView(inquiry)}>
                                                            <Eye className="mr-2 h-4 w-4" /> View
                                                        </DropdownMenuItem>
                                                        {!inquiry.is_read && (
                                                            <DropdownMenuItem onClick={() => handleMarkAsRead(inquiry)}>
                                                                <MailOpen className="mr-2 h-4 w-4" /> Mark as Read
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuItem onClick={() => handleDelete(inquiry)} className="text-destructive">
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            No pricing inquiries found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <PricingInquiryFormDialog
                isOpen={isFormOpen}
                onClose={handleCloseForm}
                inquiry={viewingInquiry}
                plans={plans}
            />
        </AppLayout>
    );
}
