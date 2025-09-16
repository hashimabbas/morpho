// resources/js/components/ContactFormDialog.tsx

import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from './input-error';

// Type for a single user passed for the owner dropdown
type User = {
    id: number;
    name: string;
}

// Type for a single contact
type Contact = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    company: string | null;
    status: string;
    owner_id: number | null;
}

// Props for our component
interface Props {
    isOpen: boolean;
    onClose: () => void;
    contact?: Contact | null; // The contact to edit (optional)
    users: User[]; // List of users to assign as owner
}

export default function ContactFormDialog({ isOpen, onClose, contact, users }: Props) {
    const { data, setData, post, patch, processing, errors, reset, clearErrors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',
        status: 'lead',
        owner_id: null as number | null,
    });

    const isEditing = !!contact;

    useEffect(() => {
        if (isOpen && isEditing) {
            setData({
                first_name: contact.first_name || '',
                last_name: contact.last_name || '',
                email: contact.email || '',
                phone: contact.phone || '',
                company: contact.company || '',
                status: contact.status || 'lead',
                owner_id: contact.owner_id || null,
            });
        } else {
            reset();
        }
    }, [isOpen, contact, isEditing]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                onClose();
            },
            preserveScroll: true,
        };

        if (isEditing) {
            patch(route('dashboard.contacts.update', contact.id), options);
        } else {
            post(route('dashboard.contacts.store'), options);
        }
    };

    const handleClose = () => {
        if (!processing) {
            clearErrors();
            reset();
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Contact' : 'Create New Contact'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Update the details for this contact.' : 'Fill in the details for the new contact.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* ... other form fields are unchanged ... */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="first_name" className="text-right">First Name</Label>
                            <Input id="first_name" value={data.first_name} onChange={e => setData('first_name', e.target.value)} className="col-span-3" />
                            <InputError message={errors.first_name} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="last_name" className="text-right">Last Name</Label>
                            <Input id="last_name" value={data.last_name} onChange={e => setData('last_name', e.target.value)} className="col-span-3" />
                            <InputError message={errors.last_name} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="col-span-3" />
                            <InputError message={errors.email} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">Phone</Label>
                            <Input id="phone" value={data.phone || ''} onChange={e => setData('phone', e.target.value)} className="col-span-3" />
                            <InputError message={errors.phone} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="company" className="text-right">Company</Label>
                            <Input id="company" value={data.company || ''} onChange={e => setData('company', e.target.value)} className="col-span-3" />
                            <InputError message={errors.company} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">Status</Label>
                            <Select onValueChange={value => setData('status', value)} value={data.status}>
                                <SelectTrigger className="col-span-3"><SelectValue placeholder="Select a status" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="lead">Lead</SelectItem>
                                    <SelectItem value="opportunity">Opportunity</SelectItem>
                                    <SelectItem value="customer">Customer</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="owner" className="text-right">Owner</Label>
                            <Select
                                // --- FIX 1: The value prop now correctly maps a null owner_id to an empty string for the placeholder ---
                                value={data.owner_id?.toString() ?? ""}
                                onValueChange={value => {
                                    // --- FIX 2: Handle the special 'unassigned' value to set owner_id to null ---
                                    const newOwnerId = value === 'unassigned' ? null : Number(value);
                                    setData('owner_id', newOwnerId);
                                }}
                            >
                                <SelectTrigger className="col-span-3"><SelectValue placeholder="Assign an owner" /></SelectTrigger>
                                <SelectContent>
                                    {/* --- FIX 3: Use a non-empty string for the 'Unassigned' option's value --- */}
                                    <SelectItem value="unassigned">Unassigned</SelectItem>
                                    {users.map(user => (
                                        <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
                        <Button type="submit" disabled={processing}>{processing ? 'Saving...' : 'Save'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
