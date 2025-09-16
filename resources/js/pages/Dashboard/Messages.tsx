// resources/js/pages/Dashboard/Messages.tsx

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
import { DownloadIcon, SearchIcon, UserPlus, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import * as XLSX from 'xlsx';
import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

// --- Interfaces (unchanged) ---
interface Message { id: number; name: string; email: string; subject: string; message: string; is_read: boolean; created_at: string; updated_at: string; converted_to_contact_id: number | null; }
interface PaginationLink { url: string | null; label: string; active: boolean; }
interface PaginatedMessages { data: Message[]; links: PaginationLink[]; from: number; to: number; total: number; }
interface Props { messages: PaginatedMessages; filters: { search: string | null; filter: string | null; }; }

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard.index') },
    { title: 'Messages', href: route('dashboard.messages'), isCurrent: true },
];

// --- A safe, default empty paginator object ---
const defaultPaginator: PaginatedMessages = {
    data: [], links: [], from: 0, to: 0, total: 0,
};

// --- A safe, default empty filters object ---
const defaultFilters: { search: string | null; filter: string | null; } = {
    search: null, filter: null,
};


// --- THE PERMANENT FIX: Accept the entire props object first ---
export default function Messages(props: Props) {
    // --- THEN, safely destructure props with defaults INSIDE the component ---
    const { messages = defaultPaginator, filters = defaultFilters } = props;

    // --- State initialization is now 100% safe because `filters` is guaranteed to be an object ---
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    // const [filterStatus, setFilterStatus] = useState(filters.filter || 'all');
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isExporting, setIsExporting] = useState(false);

    // Reset selections if the underlying data changes
    useEffect(() => {
        setSelectedIds([]);
    }, [messages.total]);

    const debouncedSearch = useDebouncedCallback((value) => {
        router.get(route('dashboard.messages'), { search: value, /*filter: filterStatus */ }, { preserveState: true, replace: true, preserveScroll: true });
    }, 300);

    const handleFilterChange = (value: string) => {
        // setFilterStatus(value);
        router.get(route('dashboard.messages'), { search: searchTerm, filter: value }, { preserveState: true, replace: true, preserveScroll: true });
    };
    const openMessage = (msg: Message) => {
        setSelectedMessage(msg);
        setIsMessageDialogOpen(true);
        if (!msg.is_read) router.post(route('dashboard.messages.markAsRead', msg.id), {}, { preserveScroll: true });
    };
    const handleConvert = (e: React.MouseEvent, messageId: number) => {
        e.stopPropagation();
        router.post(route('dashboard.messages.convertToContact', messageId), {}, { preserveScroll: true });
    };
    const closeMessageDialog = () => {
        setIsMessageDialogOpen(false);
        setSelectedMessage(null);
    };
    const handleSelectOne = (id: number) => {
        setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
    };
    const handleSelectAll = () => {
        if (selectedIds.length === messages.data.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(messages.data.map((msg) => msg.id));
        }
    };
    const handleExport = () => {
        if (selectedIds.length === 0) {
            alert('Please select messages to export.');
            return;
        }
        setIsExporting(true);
        const messagesToExport = messages.data.filter(msg => selectedIds.includes(msg.id));
        const dataToExport = messagesToExport.map(msg => ({
            Name: msg.name, Email: msg.email, Subject: msg.subject, Message: msg.message,
            Status: msg.is_read ? 'Read' : 'Unread', 'Received At': format(new Date(msg.created_at), 'yyyy-MM-dd HH:mm:ss'),
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Messages');
        XLSX.writeFile(workbook, 'SelectedMessages.xlsx');
        setIsExporting(false);
    };

    const isAllSelected = messages.data.length > 0 && selectedIds.length === messages.data.length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Messages" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-hidden">
                <div className="flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border dark:bg-gray-800 flex flex-col">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Inbox</h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Browse, filter, and convert contact form messages.</p>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                        <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} aria-label="Select all messages on this page" />
                        <div className="relative flex-1 max-w-sm">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                type="search"
                                placeholder="Search by name, email..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    debouncedSearch(e.target.value);
                                }}
                                className="pl-9"
                            />
                        </div>
                        <Select /* value={filterStatus} */ onValueChange={handleFilterChange}>
                            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Messages</SelectItem>
                                <SelectItem value="unread">Unread</SelectItem>
                                <SelectItem value="read">Read</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" onClick={handleExport} disabled={selectedIds.length === 0 || isExporting} className="ml-auto">
                            <DownloadIcon className="h-4 w-4 mr-2" />
                            Export {selectedIds.length > 0 ? `${selectedIds.length} Selected` : ''}
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {messages.data.length > 0 ? (
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {messages.data.map((msg) => (
                                    <div key={msg.id} className={`flex w-full items-start gap-4 p-4 text-left ${msg.is_read ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-gray-700/50'}`}>
                                        <Checkbox checked={selectedIds.includes(msg.id)} onCheckedChange={() => handleSelectOne(msg.id)} aria-label={`Select message from ${msg.name}`} className="mt-1" />
                                        <div className="flex-1 overflow-hidden cursor-pointer" onClick={() => openMessage(msg)}>
                                            <div className="flex items-center justify-between">
                                                <p className={`text-sm truncate pr-4 ${!msg.is_read && 'font-semibold'} ${msg.is_read ? 'text-gray-900 dark:text-gray-100' : 'text-blue-700 dark:text-blue-200'}`}>
                                                    {msg.name} <span className="text-gray-500 font-normal">({msg.email})</span>
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{format(new Date(msg.created_at), 'MMM dd, yyyy HH:mm')}</p>
                                            </div>
                                            <p className={`mt-1 truncate text-sm ${msg.is_read ? 'text-gray-600 dark:text-gray-300' : 'text-gray-800 dark:text-gray-100'}`}>
                                                <span className="font-medium mr-2">{msg.subject}</span>- {msg.message.substring(0, 100)}{msg.message.length > 100 ? '...' : ''}
                                            </p>
                                        </div>
                                        <div className="ml-auto flex-shrink-0">
                                            {msg.converted_to_contact_id ? (
                                                <Badge variant="secondary" className="cursor-default">
                                                    <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                                                    Converted
                                                </Badge>
                                            ) : (
                                                <Button variant="outline" size="sm" onClick={(e) => handleConvert(e, msg.id)}>
                                                    <UserPlus className="h-4 w-4 mr-2" />
                                                    Convert to Contact
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-4 rounded-md p-12 text-center">
                                <SearchIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">No messages found</h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
                            </div>
                        )}
                    </div>

                    {messages.links.length > 3 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                Showing <span className="font-medium">{messages.from}</span> to <span className="font-medium">{messages.to}</span> of{' '}
                                <span className="font-medium">{messages.total}</span> results
                            </div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                {messages.links.map((link, index) => (
                                    <Link key={index} href={link.url || '#'} className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 dark:ring-gray-600 ${link.active ? 'z-10 bg-indigo-600 text-white' : 'text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-700'} ${link.url === null ? 'cursor-not-allowed opacity-50' : ''} ${index === 0 ? 'rounded-l-md' : ''} ${index === messages.links.length - 1 ? 'rounded-r-md' : ''}`} preserveScroll dangerouslySetInnerHTML={{ __html: link.label }} />
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
                <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
                        <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
                            Received on {selectedMessage?.created_at ? format(new Date(selectedMessage.created_at), 'EEEE, MMM dd, yyyy HH:mm') : ''}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedMessage && (<div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="senderName" className="text-right">From:</Label>
                            <span id="senderName" className="col-span-3 font-medium">{selectedMessage.name} &lt;{selectedMessage.email}&gt;</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="messageSubject" className="text-right">Subject:</Label>
                            <span id="messageSubject" className="col-span-3 font-medium">{selectedMessage.subject}</span>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4 mt-2">
                            <Label htmlFor="messageContent" className="text-right pt-2">Message:</Label>
                            <div id="messageContent" className="col-span-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 max-h-[300px] overflow-y-auto whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">{selectedMessage.message}</div>
                        </div>
                    </div>)}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
