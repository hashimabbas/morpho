import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from './input-error';

interface SocialLink {
    id: number;
    platform: string;
    url: string;
    icon: string;
    label: string;
    label_ar: string;
    sort_order: number;
    is_active: boolean;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    socialLink?: SocialLink | null;
}

const iconOptions = [
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'Twitter' },
];

export default function SocialLinkFormDialog({ isOpen, onClose, socialLink }: Props) {
    const { data, setData, post, patch, processing, errors, reset, clearErrors } = useForm({
        platform: '',
        url: '',
        icon: 'linkedin',
        label: '',
        label_ar: '',
        sort_order: 0,
        is_active: true,
    });

    const isEditing = !!socialLink;

    useEffect(() => {
        if (isOpen && socialLink) {
            setData({
                platform: socialLink.platform,
                url: socialLink.url,
                icon: socialLink.icon,
                label: socialLink.label,
                label_ar: socialLink.label_ar,
                sort_order: socialLink.sort_order,
                is_active: socialLink.is_active,
            });
        } else if (isOpen) {
            reset();
        }
    }, [isOpen, socialLink]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = { onSuccess: () => { onClose(); }, preserveScroll: true };
        if (isEditing) {
            patch(route('dashboard.social-links.update', socialLink.id), { ...options, data });
        } else {
            post(route('dashboard.social-links.store'), { ...options, data });
        }
    };

    const handleClose = () => {
        if (!processing) { clearErrors(); reset(); onClose(); }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Social Link' : 'Create Social Link'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Update the social media link.' : 'Add a new social media link.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="platform" className="text-right">Platform</Label>
                            <Input id="platform" value={data.platform} onChange={(e) => setData('platform', e.target.value)} placeholder="e.g. linkedin" className="col-span-3" />
                            <InputError message={errors.platform} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="url" className="text-right">URL</Label>
                            <Input id="url" value={data.url} onChange={(e) => setData('url', e.target.value)} placeholder="https://..." className="col-span-3" />
                            <InputError message={errors.url} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="icon" className="text-right">Icon</Label>
                            <Select onValueChange={(v) => setData('icon', v)} value={data.icon}>
                                <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {iconOptions.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
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
                            <Label htmlFor="sort_order" className="text-right">Sort Order</Label>
                            <Input id="sort_order" type="number" value={data.sort_order} onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="is_active" className="text-right">Active</Label>
                            <div className="col-span-3 flex items-center gap-2">
                                <Checkbox id="is_active" checked={data.is_active} onCheckedChange={(v) => setData('is_active', v === true)} />
                                <span className="text-sm text-gray-500">Show on the contact page</span>
                            </div>
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
