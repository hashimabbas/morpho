import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DownloadIcon, SearchIcon } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface RequestDemo {
    id: number;
    full_name: string;
    company_name: string;
    email: string;
    phone: string;
    logistics_sector: string;
    solution_type: string;
    demo_goal: string;
    created_at: string;
    updated_at: string;
    is_read: boolean;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedRequestDemos {
    data: RequestDemo[];
    links: PaginationLink[];
    from: number;
    to: number;
    total: number;
}

interface Props {
    requests: PaginatedRequestDemos;
    filters: { search: string | null; filter: string | null };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard.index') },
    { title: 'Demo Requests', href: route('dashboard.demo-requests.index'), isCurrent: true },
];

const defaultPaginator: PaginatedRequestDemos = {
    data: [],
    links: [],
    from: 0,
    to: 0,
    total: 0,
};

const defaultFilters = { search: null, filter: null };

export default function RequestDemos(props: Props) {
    const { requests = defaultPaginator, filters = defaultFilters } = props;
    const [selectedDemo, setSelectedDemo] = useState<RequestDemo | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [isExporting, setIsExporting] = useState(false);

    useEffect(() => {
        setSelectedIds([]);
    }, [requests.total]);

    const debouncedSearch = useDebouncedCallback((value) => {
        router.get(route('dashboard.demo-requests.index'), { search: value }, { preserveState: true, replace: true, preserveScroll: true });
    }, 300);

    const openDemo = (demo: RequestDemo) => {
        setSelectedDemo(demo);
        setIsDialogOpen(true);
        if (!demo.is_read) router.post(route('dashboard.demo-requests.markAsRead', demo.id), {}, { preserveScroll: true });
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedDemo(null);
    };

    const handleSelectOne = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedIds.length === requests.data.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(requests.data.map((demo) => demo.id));
        }
    };

    const handleExport = () => {
        if (selectedIds.length === 0) {
            alert('Please select demo requests to export.');
            return;
        }
        setIsExporting(true);
        const selected = requests.data.filter(demo => selectedIds.includes(demo.id));
        const dataToExport = selected.map(demo => ({
            'Full Name': demo.full_name,
            'Company': demo.company_name,
            'Email': demo.email,
            'Phone': demo.phone,
            'Sector': demo.logistics_sector,
            'Solution': demo.solution_type,
            'Goal': demo.demo_goal,
            'Requested At': format(new Date(demo.created_at), 'yyyy-MM-dd HH:mm:ss')
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Demo Requests');
        XLSX.writeFile(workbook, 'DemoRequests.xlsx');
        setIsExporting(false);
    };

    const isAllSelected = requests.data.length > 0 && selectedIds.length === requests.data.length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Demo Requests" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-hidden">
                <div className="flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border dark:bg-gray-800 flex flex-col">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Demo Requests</h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Manage and review demo requests from users.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                        <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
                        <div className="relative flex-1 max-w-sm">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                type="search"
                                placeholder="Search by name, company, email..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    debouncedSearch(e.target.value);
                                }}
                                className="pl-9"
                            />
                        </div>
                        <Button variant="outline" onClick={handleExport} disabled={selectedIds.length === 0 || isExporting} className="ml-auto">
                            <DownloadIcon className="h-4 w-4 mr-2" />
                            Export {selectedIds.length > 0 ? `${selectedIds.length} Selected` : ''}
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {requests.data.length > 0 ? (
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {requests.data.map((demo) => (
                                    <div
                                        key={demo.id}
                                        className={`flex w-full items-start gap-4 p-4 text-left cursor-pointer ${demo.is_read ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-gray-700/50'
                                            }`}
                                        onClick={() => openDemo(demo)}
                                    >
                                        <Checkbox
                                            checked={selectedIds.includes(demo.id)}
                                            onCheckedChange={() => handleSelectOne(demo.id)}
                                            className="mt-1"
                                        />
                                        <div className="flex-1 overflow-hidden">
                                            <div className="flex items-center justify-between">
                                                <p
                                                    className={`text-sm truncate pr-4 ${!demo.is_read && 'font-semibold'
                                                        } ${demo.is_read
                                                            ? 'text-gray-900 dark:text-gray-100'
                                                            : 'text-blue-700 dark:text-blue-200'
                                                        }`}
                                                >
                                                    {demo.full_name} <span className="text-gray-500 font-normal">({demo.email})</span>
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                                                    {format(new Date(demo.created_at), 'MMM dd, yyyy HH:mm')}
                                                </p>
                                            </div>
                                            <p
                                                className={`mt-1 truncate text-sm ${demo.is_read ? 'text-gray-600 dark:text-gray-300' : 'text-gray-800 dark:text-gray-100'
                                                    }`}
                                            >
                                                {demo.company_name} - {demo.solution_type}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-4 rounded-md p-12 text-center">
                                <SearchIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">No demo requests found</h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Try adjusting your search.
                                </p>
                            </div>
                        )}
                    </div>

                    {requests.links.length > 3 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                Showing <span className="font-medium">{requests.from}</span> to <span className="font-medium">{requests.to}</span> of{' '}
                                <span className="font-medium">{requests.total}</span> results
                            </div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                {requests.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 dark:ring-gray-600 ${link.active ? 'z-10 bg-indigo-600 text-white' : 'text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-700'
                                            } ${link.url === null ? 'cursor-not-allowed opacity-50' : ''} ${index === 0 ? 'rounded-l-md' : ''} ${index === requests.links.length - 1 ? 'rounded-r-md' : ''
                                            }`}
                                        preserveScroll
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Demo Request from {selectedDemo?.full_name}</DialogTitle>
                        <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
                            Received on{' '}
                            {selectedDemo?.created_at ? format(new Date(selectedDemo.created_at), 'EEEE, MMM dd, yyyy HH:mm') : ''}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedDemo && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="fullName" className="text-right">
                                    Full Name:
                                </Label>
                                <span id="fullName" className="col-span-3 font-medium">
                                    {selectedDemo.full_name}
                                </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="company" className="text-right">
                                    Company:
                                </Label>
                                <span id="company" className="col-span-3 font-medium">
                                    {selectedDemo.company_name}
                                </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email:
                                </Label>
                                <span id="email" className="col-span-3 font-medium">
                                    {selectedDemo.email}
                                </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">
                                    Phone:
                                </Label>
                                <span id="phone" className="col-span-3 font-medium">
                                    {selectedDemo.phone}
                                </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="sector" className="text-right">
                                    Sector:
                                </Label>
                                <span id="sector" className="col-span-3 font-medium">
                                    {selectedDemo.logistics_sector}
                                </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="solution" className="text-right">
                                    Solution:
                                </Label>
                                <span id="solution" className="col-span-3 font-medium">
                                    {selectedDemo.solution_type}
                                </span>
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4 mt-2">
                                <Label htmlFor="goal" className="text-right pt-2">
                                    Goal:
                                </Label>
                                <div
                                    id="goal"
                                    className="col-span-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 max-h-[300px] overflow-y-auto whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200"
                                >
                                    {selectedDemo.demo_goal}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
