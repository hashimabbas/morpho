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
import PartnerFormDialog from '../components/dashboard/PartnerFormDialog';

interface Partner {
    id: number;
    name: string;
    role: string | null;
    logo: string | null;
    sort_order: number;
    created_at: string;
}

interface PaginatedPartners {
    data: Partner[];
}

interface Props {
    partners: PaginatedPartners;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard.index') },
    { title: 'Partners', href: route('dashboard.partners.index'), isCurrent: true },
];

export default function Partners({ partners }: Props) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

    const openCreateForm = () => {
        setEditingPartner(null);
        setIsFormOpen(true);
    };

    const openEditForm = (partner: Partner) => {
        setEditingPartner(partner);
        setIsFormOpen(true);
    };

    const handleDelete = (partner: Partner) => {
        if (confirm(`Are you sure you want to delete ${partner.name}?`)) {
            router.delete(route('dashboard.partners.destroy', partner.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Partners Management" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Partners Management</CardTitle>
                            <CardDescription>Manage your partner ecosystem logos and information.</CardDescription>
                        </div>
                        <Button onClick={openCreateForm}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Partner
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Logo</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {partners.data.length > 0 ? (
                                    partners.data.map((partner) => (
                                        <TableRow key={partner.id}>
                                            <TableCell>
                                                {partner.logo ? (
                                                    <img src={`/${partner.logo}`} alt={partner.name} className="h-8 w-auto object-contain" />
                                                ) : (
                                                    <span className="text-muted-foreground text-sm">—</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="font-medium">{partner.name}</TableCell>
                                            <TableCell>{partner.role ?? '—'}</TableCell>
                                            <TableCell>{partner.sort_order}</TableCell>
                                            <TableCell>
                                                {format(new Date(partner.created_at), 'MMM dd, yyyy')}
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
                                                        <DropdownMenuItem onClick={() => openEditForm(partner)}>
                                                            <Pencil className="mr-2 h-4 w-4" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDelete(partner)} className="text-destructive">
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
                                            No partners found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <PartnerFormDialog
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                partner={editingPartner}
            />
        </AppLayout>
    );
}
