import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MoreHorizontal, Pencil, Trash2, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import PortfolioFormDialog from '../components/dashboard/PortfolioFormDialog';

interface PortfolioItem {
    id: number;
    title: string;
    title_ar: string | null;
    slug: string;
    date: string;
    cover_image: string | null;
    is_visible: boolean;
    sort_order: number;
    images_count: number;
    created_at: string;
}

interface PaginatedData {
    data: PortfolioItem[];
}

interface Props {
    portfolios: PaginatedData;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard.index') },
    { title: 'Portfolios', href: route('dashboard.portfolios.index'), isCurrent: true },
];

export default function Portfolios({ portfolios }: Props) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

    const openCreateForm = () => {
        setEditingItem(null);
        setIsFormOpen(true);
    };

    const openEditForm = (item: PortfolioItem) => {
        setEditingItem(item);
        setIsFormOpen(true);
    };

    const handleDelete = (item: PortfolioItem) => {
        if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
            router.delete(route('dashboard.portfolios.destroy', item.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Portfolios Management" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Portfolios Management</CardTitle>
                            <CardDescription>Manage the project portfolio gallery displayed on the public page.</CardDescription>
                        </div>
                        <Button onClick={openCreateForm}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Portfolio
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Cover</TableHead>
                                    <TableHead>Title (EN)</TableHead>
                                    <TableHead>Title (AR)</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Images</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {portfolios.data.length > 0 ? (
                                    portfolios.data.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                {item.cover_image ? (
                                                    <img
                                                        src={item.cover_image}
                                                        alt={item.title}
                                                        className="h-12 w-16 rounded object-cover"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="flex h-12 w-16 items-center justify-center rounded bg-muted">
                                                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="max-w-xs">
                                                <div className="font-medium truncate">{item.title}</div>
                                            </TableCell>
                                            <TableCell className="max-w-xs font-arabic" dir="rtl">
                                                <div className="font-medium truncate">{item.title_ar || <span className="text-muted-foreground italic">—</span>}</div>
                                            </TableCell>
                                            <TableCell>{item.date ? format(new Date(item.date), 'MMM dd, yyyy') : '—'}</TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center gap-1 text-sm">
                                                    <ImageIcon className="h-4 w-4" />
                                                    {item.images_count}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {item.is_visible ? (
                                                    <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                                                        <Eye className="mr-1 h-3 w-3" /> Published
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
                                                        <EyeOff className="mr-1 h-3 w-3" /> Hidden
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>{item.sort_order}</TableCell>
                                            <TableCell>
                                                {format(new Date(item.created_at), 'MMM dd, yyyy')}
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
                                                        <DropdownMenuItem onClick={() => openEditForm(item)}>
                                                            <Pencil className="mr-2 h-4 w-4" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDelete(item)} className="text-destructive">
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={9} className="h-24 text-center">
                                            No portfolios found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {isFormOpen && (
                <PortfolioFormDialog
                    key={editingItem?.id ?? 'new'}
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    portfolio={editingItem}
                />
            )}
        </AppLayout>
    );
}
