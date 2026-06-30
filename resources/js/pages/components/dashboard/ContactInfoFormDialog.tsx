import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from './input-error';

interface ContactInfo {
    id: number;
    type: string;
    label: string;
    label_ar: string;
    value: string;
    value_ar: string | null;
    icon: string;
    href: string | null;
    sort_order: number;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    contactInfo?: ContactInfo | null;
}

const types = ['phone', 'email', 'address'];

export default function ContactInfoFormDialog({ isOpen, onClose, contactInfo }: Props) {
    const { data, setData, post, patch, processing, errors, reset, clearErrors } = useForm({
        type: 'phone',
        label: '',
        label_ar: '',
        value: '',
        value_ar: '',
        icon: 'phone',
        href: '',
        sort_order: 0,
    });

    const isEditing = !!contactInfo;

    useEffect(() => {
        if (isOpen && contactInfo) {
            setData({
                type: contactInfo.type,
                label: contactInfo.label,
                label_ar: contactInfo.label_ar,
                value: contactInfo.value,
                value_ar: contactInfo.value_ar || '',
                icon: contactInfo.icon,
                href: contactInfo.href || '',
                sort_order: contactInfo.sort_order,
            });
        } else if (isOpen) {
            reset();
        }
    }, [isOpen, contactInfo]);

    const handleIconChange = (type: string) => {
        const iconMap: Record<string, string> = { phone: 'phone', email: 'mail', address: 'map-pin' };
        return iconMap[type] || 'phone';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { ...data, icon: handleIconChange(data.type) };
        const options = { onSuccess: () => { onClose(); }, preserveScroll: true };
        if (isEditing) {
            patch(route('dashboard.contact-infos.update', contactInfo.id), { ...options, data: payload });
        } else {
            post(route('dashboard.contact-infos.store'), { ...options, data: payload });
        }
    };

    const handleClose = () => {
        if (!processing) { clearErrors(); reset(); onClose(); }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Contact Info' : 'Create Contact Info'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Update the contact information entry.' : 'Add a new contact information entry.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">Type</Label>
                            <Select onValueChange={(v) => setData('type', v)} value={data.type}>
                                <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {types.map((t) => (
                                        <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="label" className="text-right">Label (EN)</Label>
                            <Input id="label" value={data.label} onChange={(e) => setData('label', e.target.value)} className="col-span-3" />
                            <InputError message={errors.label} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="label_ar" className="text-right">Label (AR)</Label>
                            <Input id="label_ar" value={data.label_ar} onChange={(e) => setData('label_ar', e.target.value)} className="col-span-3" />
                            <InputError message={errors.label_ar} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="value" className="text-right">Value (EN)</Label>
                            <Input id="value" value={data.value} onChange={(e) => setData('value', e.target.value)} className="col-span-3" />
                            <InputError message={errors.value} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="value_ar" className="text-right">Value (AR)</Label>
                            <Input id="value_ar" value={data.value_ar} onChange={(e) => setData('value_ar', e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="href" className="text-right">Link (href)</Label>
                            <Input id="href" value={data.href} onChange={(e) => setData('href', e.target.value)} placeholder="e.g. tel:+968..." className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sort_order" className="text-right">Sort Order</Label>
                            <Input id="sort_order" type="number" value={data.sort_order} onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)} className="col-span-3" />
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
