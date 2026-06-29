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
import TargetEntityFormDialog from '../components/dashboard/TargetEntityFormDialog';
import { getIcon } from '@/lib/icons';

interface TargetEntity {
    id: number;
    group_name: string;
    group_slug: string;
    entity_name: string;
    activity: string | null;
    morpho_solution: string;
    icon: string | null;
    sort_order: number;
    is_visible: boolean;
    created_at: string;
}

interface PaginatedEntities {
    data: TargetEntity[];
}

interface Props {
    targetEntities: PaginatedEntities;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard.index') },
    { title: 'Target Entities', href: route('dashboard.target-entities.index'), isCurrent: true },
];

export default function TargetEntities({ targetEntities }: Props) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEntity, setEditingEntity] = useState<TargetEntity | null>(null);

    const openCreateForm = () => {
        setEditingEntity(null);
        setIsFormOpen(true);
    };

    const openEditForm = (entity: TargetEntity) => {
        setEditingEntity(entity);
        setIsFormOpen(true);
    };

    const handleDelete = (entity: TargetEntity) => {
        if (confirm(`Are you sure you want to delete "${entity.entity_name}"?`)) {
            router.delete(route('dashboard.target-entities.destroy', entity.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Target Entities Management" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Target Entities Management</CardTitle>
                            <CardDescription>Manage strategic entities displayed on the Entities page.</CardDescription>
                        </div>
                        <Button onClick={openCreateForm}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Entity
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Icon</TableHead>
                                    <TableHead>Entity</TableHead>
                                    <TableHead className="hidden md:table-cell">Group</TableHead>
                                    <TableHead className="hidden lg:table-cell">Solution</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="hidden sm:table-cell">Created</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {targetEntities.data.length > 0 ? (
                                    targetEntities.data.map((entity) => {
                                        const Icon = entity.icon ? getIcon(entity.icon) : null;
                                        return (
                                            <TableRow key={entity.id}>
                                                <TableCell>
                                                    {Icon && <Icon className="h-5 w-5 text-morpho" />}
                                                </TableCell>
                                                <TableCell className="font-medium max-w-[200px] truncate">
                                                    {entity.entity_name}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell max-w-[180px] truncate">
                                                    {entity.group_name}
                                                </TableCell>
                                                <TableCell className="hidden lg:table-cell max-w-[250px] truncate text-muted-foreground">
                                                    {entity.morpho_solution}
                                                </TableCell>
                                                <TableCell>{entity.sort_order}</TableCell>
                                                <TableCell>
                                                    {entity.is_visible ? (
                                                        <Badge variant="outline" className="text-green-600">Visible</Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="text-muted-foreground">Hidden</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell">
                                                    {format(new Date(entity.created_at), 'MMM dd, yyyy')}
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
                                                            <DropdownMenuItem onClick={() => openEditForm(entity)}>
                                                                <Pencil className="mr-2 h-4 w-4" /> Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleDelete(entity)} className="text-destructive">
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
                                        <TableCell colSpan={8} className="h-24 text-center">
                                            No target entities found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <TargetEntityFormDialog
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                targetEntity={editingEntity}
            />
        </AppLayout>
    );
}
