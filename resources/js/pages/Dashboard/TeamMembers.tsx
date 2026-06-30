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
import TeamMemberFormDialog from '../components/dashboard/TeamMemberFormDialog';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    description: string;
    image_url: string | null;
    name_ar: string | null;
    role_ar: string | null;
    description_ar: string | null;
    sort_order: number;
    created_at: string;
}

interface PaginatedData {
    data: TeamMember[];
}

interface Props {
    teamMembers: PaginatedData;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard.index') },
    { title: 'Team Members', href: route('dashboard.team-members.index'), isCurrent: true },
];

export default function TeamMembers({ teamMembers }: Props) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TeamMember | null>(null);

    const openCreateForm = () => {
        setEditingItem(null);
        setIsFormOpen(true);
    };

    const openEditForm = (item: TeamMember) => {
        setEditingItem(item);
        setIsFormOpen(true);
    };

    const handleDelete = (item: TeamMember) => {
        if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
            router.delete(route('dashboard.team-members.destroy', item.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Team Members Management" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Team Members Management</CardTitle>
                            <CardDescription>Manage the team members displayed on the About page.</CardDescription>
                        </div>
                        <Button onClick={openCreateForm}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Member
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Photo</TableHead>
                                    <TableHead>Name (EN)</TableHead>
                                    <TableHead>Name (AR)</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {teamMembers.data.length > 0 ? (
                                    teamMembers.data.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt={item.name} className="h-10 w-10 rounded-full object-cover" />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
                                                        {item.name.charAt(0)}
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="max-w-xs">
                                                <div className="font-medium truncate">{item.name}</div>
                                                <div className="text-xs text-muted-foreground truncate">{item.role}</div>
                                            </TableCell>
                                            <TableCell className="max-w-xs font-arabic" dir="rtl">
                                                <div className="font-medium truncate">{item.name_ar || <span className="text-muted-foreground italic">—</span>}</div>
                                                <div className="text-xs text-muted-foreground truncate">{item.role_ar || <span className="text-muted-foreground italic">—</span>}</div>
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
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            No team members found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <TeamMemberFormDialog
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                teamMember={editingItem}
            />
        </AppLayout>
    );
}
