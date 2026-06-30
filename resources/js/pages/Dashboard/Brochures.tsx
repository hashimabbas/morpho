import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Pencil, Trash2, FileText } from 'lucide-react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import BrochureFormDialog from '../components/dashboard/BrochureFormDialog';

interface Brochure {
    id: number;
    name: string;
    description: string;
    name_ar: string | null;
    description_ar: string | null;
    image_url: string | null;
    file: string | null;
    sort_order: number;
    created_at: string;
}

interface PaginatedData {
    data: Brochure[];
}

interface Props {
    brochures: PaginatedData;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard.index') },
    { title: 'Brochures', href: route('dashboard.brochures.index'), isCurrent: true },
];

export default function Brochures({ brochures }: Props) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Brochure | null>(null);

    const openCreateForm = () => {
        setEditingItem(null);
        setIsFormOpen(true);
    };

    const openEditForm = (item: Brochure) => {
        setEditingItem(item);
        setIsFormOpen(true);
    };

    const handleDelete = (item: Brochure) => {
        if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
            router.delete(route('dashboard.brochures.destroy', item.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Brochures Management" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Brochures Management</CardTitle>
                            <CardDescription>Manage the brochures displayed on the Brochures page.</CardDescription>
                        </div>
                        <Button onClick={openCreateForm}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Brochure
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Preview</TableHead>
                                    <TableHead>Name (EN)</TableHead>
                                    <TableHead>Name (AR)</TableHead>
                                    <TableHead>File</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {brochures.data.length > 0 ? (
                                    brochures.data.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt={item.name} className="h-10 w-16 rounded object-cover" />
                                                ) : (
                                                    <FileText className="h-10 w-10 text-muted-foreground" />
                                                )}
                                            </TableCell>
                                            <TableCell className="max-w-xs">
                                                <div className="font-medium truncate">{item.name}</div>
                                                <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                                            </TableCell>
                                            <TableCell className="max-w-xs font-arabic" dir="rtl">
                                                <div className="font-medium truncate">{item.name_ar || <span className="text-muted-foreground italic">—</span>}</div>
                                                <div className="text-xs text-muted-foreground truncate">{item.description_ar || <span className="text-muted-foreground italic">—</span>}</div>
                                            </TableCell>
                                            <TableCell>{item.file || <span className="text-muted-foreground italic">—</span>}</TableCell>
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
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            No brochures found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <BrochureFormDialog
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                brochure={editingItem}
            />
        </AppLayout>
    );
}
