import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import EcosystemFormDialog from '../components/dashboard/EcosystemFormDialog';
import { getIcon } from '@/lib/icons';

interface Ecosystem {
    id: number;
    type: string;
    slug: string | null;
    icon: string;
    title: string;
    description: string;
    image: string | null;
    href: string | null;
    features: string[];
    subtitle: string | null;
    sort_order: number;
    is_visible: boolean;
    created_at: string;
    title_ar: string | null;
    description_ar: string | null;
    subtitle_ar: string | null;
    features_ar: string[] | null;
    content_ar?: any;
}

interface PaginatedEcosystems {
    data: Ecosystem[];
}

interface Props {
    ecosystems: PaginatedEcosystems;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard.index') },
    { title: 'Ecosystems', href: route('dashboard.ecosystems.index'), isCurrent: true },
];

export default function Ecosystems({ ecosystems }: Props) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Ecosystem | null>(null);

    const openCreateForm = () => {
        setEditingItem(null);
        setIsFormOpen(true);
    };

    const openEditForm = (item: Ecosystem) => {
        setEditingItem(item);
        setIsFormOpen(true);
    };

    const handleDelete = (item: Ecosystem) => {
        if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
            router.delete(route('dashboard.ecosystems.destroy', item.id), {
                preserveScroll: true,
            });
        }
    };

    const viewDetailPage = (item: Ecosystem) => {
        if (item.slug) {
            window.open(`/solutions/${item.slug}`, '_blank');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ecosystems Management" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Ecosystems Management</CardTitle>
                            <CardDescription>Manage the Morpho Smart Ecosystems section cards.</CardDescription>
                        </div>
                        <Button onClick={openCreateForm}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Ecosystem
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Icon</TableHead>
                                    <TableHead>Title (EN)</TableHead>
                                    <TableHead>Title (AR)</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Features</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {ecosystems.data.length > 0 ? (
                                    ecosystems.data.map((item) => {
                                        const Icon = getIcon(item.icon);
                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <Badge variant={item.type === 'project' ? 'default' : 'secondary'}>{item.type}</Badge>
                                                </TableCell>
                                                <TableCell><Icon className="h-5 w-5 text-morpho" /></TableCell>
                                                <TableCell className="font-medium">{item.title}</TableCell>
                                                <TableCell className="text-muted-foreground text-sm">{item.title_ar || '-'}</TableCell>
                                                <TableCell className="text-muted-foreground text-sm">{item.slug || '-'}</TableCell>
                                                <TableCell className="max-w-xs truncate">{item.features.length} features</TableCell>
                                                <TableCell>{item.sort_order}</TableCell>
                                                <TableCell>
                                                    {item.is_visible ? (
                                                        <Badge variant="outline" className="text-green-600">Visible</Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="text-muted-foreground">Hidden</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell>{format(new Date(item.created_at), 'MMM dd, yyyy')}</TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            {item.slug && (
                                                                <DropdownMenuItem onClick={() => viewDetailPage(item)}>
                                                                    <ExternalLink className="mr-2 h-4 w-4" /> View Detail Page
                                                                </DropdownMenuItem>
                                                            )}
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
                                        <TableCell colSpan={10} className="h-24 text-center">No ecosystems found.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <EcosystemFormDialog
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                ecosystem={editingItem}
            />
        </AppLayout>
    );
}
