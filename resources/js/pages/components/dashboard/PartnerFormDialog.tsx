import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from './input-error';

type Partner = {
    id: number;
    name: string;
    role: string | null;
    logo: string | null;
    sort_order: number;
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    partner?: Partner | null;
}

export default function PartnerFormDialog({ isOpen, onClose, partner }: Props) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST' as string,
        name: '',
        role: '',
        logo: null as File | null,
        sort_order: 0,
    });

    const isEditing = !!partner;

    useEffect(() => {
        if (isOpen && isEditing && partner) {
            setData({
                _method: 'PATCH',
                name: partner.name || '',
                role: partner.role || '',
                logo: null,
                sort_order: partner.sort_order || 0,
            });
        } else if (isOpen) {
            setData({
                _method: 'POST',
                name: '',
                role: '',
                logo: null,
                sort_order: 0,
            });
        }
    }, [isOpen, partner, isEditing]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => onClose(),
            preserveScroll: true,
        };

        if (isEditing && partner) {
            post(route('dashboard.partners.update', partner.id), options);
        } else {
            post(route('dashboard.partners.store'), options);
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
                    <DialogTitle>{isEditing ? 'Edit Partner' : 'Create New Partner'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Update the details for this partner.' : 'Fill in the details for the new partner.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} className="col-span-3" />
                            <InputError message={errors.name} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">Role</Label>
                            <Input id="role" value={data.role} onChange={e => setData('role', e.target.value)} className="col-span-3" placeholder="e.g. Technology Partner" />
                            <InputError message={errors.role} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sort_order" className="text-right">Order</Label>
                            <Input id="sort_order" type="number" value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} className="col-span-3" />
                            <InputError message={errors.sort_order} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="logo" className="text-right">Logo</Label>
                            <Input id="logo" type="file" onChange={e => setData('logo', e.target.files?.[0] || null)} className="col-span-3" accept="image/png,image/jpg,image/jpeg,image/svg+xml" />
                            <InputError message={errors.logo} className="col-span-4 col-start-2" />
                            {isEditing && partner?.logo && (
                                <div className="col-span-4 col-start-2">
                                    <img src={`/${partner.logo}`} alt={partner.name} className="h-10 w-auto object-contain" />
                                </div>
                            )}
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
