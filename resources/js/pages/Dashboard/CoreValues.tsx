import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getIcon } from '@/lib/icons';
import CoreValueFormDialog from '../components/dashboard/CoreValueFormDialog';

interface CoreValue {
    id: number;
    icon: string;
    title: string;
    description: string;
    title_ar: string | null;
    description_ar: string | null;
    sort_order: number;
    created_at: string;
}

interface PaginatedData {
    data: CoreValue[];
}

interface Props {
    coreValues: PaginatedData;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard.index') },
    { title: 'Core Values', href: route('dashboard.core-values.index'), isCurrent: true },
];

export default function CoreValues({ coreValues }: Props) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<CoreValue | null>(null);

    const openCreateForm = () => {
        setEditingItem(null);
        setIsFormOpen(true);
    };

    const openEditForm = (item: CoreValue) => {
        setEditingItem(item);
        setIsFormOpen(true);
    };

    const handleDelete = (item: CoreValue) => {
        if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
            router.delete(route('dashboard.core-values.destroy', item.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Core Values Management" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Core Values Management</CardTitle>
                            <CardDescription>Manage the Core Values section displayed on the About page.</CardDescription>
                        </div>
                        <Button onClick={openCreateForm}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Item
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Icon</TableHead>
                                    <TableHead>Title (EN)</TableHead>
                                    <TableHead>Title (AR)</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {coreValues.data.length > 0 ? (
                                    coreValues.data.map((item) => {
                                        const IconComponent = getIcon(item.icon);
                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <IconComponent className="h-8 w-8 text-morpho" />
                                                </TableCell>
                                                <TableCell className="max-w-xs">
                                                    <div className="font-medium truncate">{item.title}</div>
                                                    <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                                                </TableCell>
                                                <TableCell className="max-w-xs font-arabic" dir="rtl">
                                                    <div className="font-medium truncate">{item.title_ar || <span className="text-muted-foreground italic">—</span>}</div>
                                                    <div className="text-xs text-muted-foreground truncate">{item.description_ar || <span className="text-muted-foreground italic">—</span>}</div>
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
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            No core values found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <CoreValueFormDialog
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                coreValue={editingItem}
            />
        </AppLayout>
    );
}
