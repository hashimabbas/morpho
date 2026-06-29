import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import HighlightFormDialog from '../components/dashboard/HighlightFormDialog';
import { getIcon } from '@/lib/icons';

interface Highlight {
    id: number;
    icon: string;
    title: string;
    description: string;
    title_ar: string | null;
    description_ar: string | null;
    sort_order: number;
    is_visible: boolean;
    created_at: string;
}

interface PaginatedHighlights {
    data: Highlight[];
}

interface Props {
    highlights: PaginatedHighlights;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard.index') },
    { title: 'Highlights', href: route('dashboard.highlights.index'), isCurrent: true },
];

export default function Highlights({ highlights }: Props) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingHighlight, setEditingHighlight] = useState<Highlight | null>(null);

    const openCreateForm = () => {
        setEditingHighlight(null);
        setIsFormOpen(true);
    };

    const openEditForm = (highlight: Highlight) => {
        setEditingHighlight(highlight);
        setIsFormOpen(true);
    };

    const handleDelete = (highlight: Highlight) => {
        if (confirm(`Are you sure you want to delete "${highlight.title}"?`)) {
            router.delete(route('dashboard.highlights.destroy', highlight.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="SCT Highlights Management" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>SCT Highlights Management</CardTitle>
                            <CardDescription>Manage Morpho SCT highlights cards displayed on the homepage.</CardDescription>
                        </div>
                        <Button onClick={openCreateForm}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Highlight
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
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {highlights.data.length > 0 ? (
                                    highlights.data.map((highlight) => {
                                        const Icon = getIcon(highlight.icon);
                                        return (
                                            <TableRow key={highlight.id}>
                                                <TableCell>
                                                    <Icon className="h-5 w-5 text-morpho" />
                                                </TableCell>
                                                <TableCell className="max-w-xs">
                                                    <div className="font-medium truncate">{highlight.title}</div>
                                                    <div className="text-xs text-muted-foreground truncate">{highlight.description}</div>
                                                </TableCell>
                                                <TableCell className="max-w-xs font-arabic" dir="rtl">
                                                    <div className="font-medium truncate">{highlight.title_ar || <span className="text-muted-foreground italic">—</span>}</div>
                                                    <div className="text-xs text-muted-foreground truncate">{highlight.description_ar || <span className="text-muted-foreground italic">—</span>}</div>
                                                </TableCell>
                                                <TableCell>{highlight.sort_order}</TableCell>
                                                <TableCell>
                                                    {highlight.is_visible ? (
                                                        <Badge variant="outline" className="text-green-600">Visible</Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="text-muted-foreground">Hidden</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {format(new Date(highlight.created_at), 'MMM dd, yyyy')}
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
                                                            <DropdownMenuItem onClick={() => openEditForm(highlight)}>
                                                                <Pencil className="mr-2 h-4 w-4" /> Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleDelete(highlight)} className="text-destructive">
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
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            No highlights found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <HighlightFormDialog
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                highlight={editingHighlight}
            />
        </AppLayout>
    );
}
