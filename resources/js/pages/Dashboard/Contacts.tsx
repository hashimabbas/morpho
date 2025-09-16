// resources/js/Pages/Dashboard/Contacts.tsx

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
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
import ContactFormDialog from '../components/dashboard/ContactFormDialog';

// --- Interfaces for our CRM data ---
interface User {
    id: number;
    name: string;
}

interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    company: string | null;
    phone: string | null;
    status: string;
    created_at: string;
    owner: {
        id: number;
        name: string;
    } | null;
    owner_id: number | null; // Need this for the form
}

interface PaginatedContacts {
    data: Contact[];
    // You can add pagination link types here later if needed
}

interface Props {
    contacts: PaginatedContacts;
    users: User[]; // Users for the owner dropdown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard.index') },
    { title: 'Contacts', href: route('dashboard.contacts.index'), isCurrent: true },
];

export default function Contacts({ contacts, users }: Props) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);

    const openCreateForm = () => {
        setEditingContact(null);
        setIsFormOpen(true);
    };

    const openEditForm = (contact: Contact) => {
        setEditingContact(contact);
        setIsFormOpen(true);
    };

    const handleDelete = (contact: Contact) => {
        if (confirm(`Are you sure you want to delete ${contact.first_name} ${contact.last_name}?`)) {
            router.delete(route('dashboard.contacts.destroy', contact.id), {
                preserveScroll: true,
            });
        }
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CRM Contacts" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Contact Management</CardTitle>
                            <CardDescription>A list of all the contacts in your CRM.</CardDescription>
                        </div>
                        <Button onClick={openCreateForm}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Contact
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email & Phone</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Owner</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contacts.data.length > 0 ? (
                                    contacts.data.map((contact) => (
                                        <TableRow key={contact.id}>
                                            <TableCell className="font-medium">
                                                {contact.first_name} {contact.last_name}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span>{contact.email}</span>
                                                    <span className="text-muted-foreground text-sm">{contact.phone}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{contact.company ?? 'N/A'}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{contact.status}</Badge>
                                            </TableCell>
                                            <TableCell>{contact.owner?.name ?? 'Unassigned'}</TableCell>
                                            <TableCell>
                                                {format(new Date(contact.created_at), 'MMM dd, yyyy')}
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
                                                        <DropdownMenuItem onClick={() => openEditForm(contact)}>
                                                            <Pencil className="mr-2 h-4 w-4" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDelete(contact)} className="text-destructive">
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
                                            No contacts found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <ContactFormDialog
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                contact={editingContact}
                users={users}
            />
        </AppLayout>
    );
}
