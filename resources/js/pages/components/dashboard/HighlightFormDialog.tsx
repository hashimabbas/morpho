import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from './input-error';
import { availableIcons, getIcon } from '@/lib/icons';

type Highlight = {
    id: number;
    icon: string;
    title: string;
    description: string;
    sort_order: number;
    is_visible: boolean;
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    highlight?: Highlight | null;
}

export default function HighlightFormDialog({ isOpen, onClose, highlight }: Props) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST' as string,
        icon: 'thermometer',
        title: '',
        description: '',
        sort_order: 0,
        is_visible: true,
    });

    const isEditing = !!highlight;

    useEffect(() => {
        if (isOpen && isEditing && highlight) {
            setData({
                _method: 'PATCH',
                icon: highlight.icon || 'thermometer',
                title: highlight.title || '',
                description: highlight.description || '',
                sort_order: highlight.sort_order || 0,
                is_visible: highlight.is_visible,
            });
        } else if (isOpen) {
            setData({
                _method: 'POST',
                icon: 'thermometer',
                title: '',
                description: '',
                sort_order: 0,
                is_visible: true,
            });
        }
    }, [isOpen, highlight, isEditing]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => onClose(),
            preserveScroll: true,
        };

        if (isEditing && highlight) {
            post(route('dashboard.highlights.update', highlight.id), options);
        } else {
            post(route('dashboard.highlights.store'), options);
        }
    };

    const handleClose = () => {
        if (!processing) {
            clearErrors();
            reset();
            onClose();
        }
    };

    const PreviewIcon = getIcon(data.icon);

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Highlight' : 'Create New Highlight'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Update the details for this highlight.' : 'Fill in the details for the new highlight card.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="icon" className="text-right">Icon</Label>
                            <div className="col-span-3 flex items-center gap-3">
                                <Select onValueChange={value => setData('icon', value)} value={data.icon}>
                                    <SelectTrigger className="flex-1"><SelectValue placeholder="Select an icon" /></SelectTrigger>
                                    <SelectContent>
                                        {availableIcons.map(iconName => (
                                            <SelectItem key={iconName} value={iconName}>{iconName}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <PreviewIcon className="h-5 w-5 text-morpho" />
                            </div>
                            <InputError message={errors.icon} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">Title</Label>
                            <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} className="col-span-3" />
                            <InputError message={errors.title} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Description</Label>
                            <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} className="col-span-3" rows={3} />
                            <InputError message={errors.description} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sort_order" className="text-right">Order</Label>
                            <Input id="sort_order" type="number" value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} className="col-span-3" />
                            <InputError message={errors.sort_order} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="is_visible" className="text-right">Visible</Label>
                            <div className="col-span-3 flex items-center gap-2">
                                <Checkbox id="is_visible" checked={data.is_visible} onCheckedChange={checked => setData('is_visible', checked === true)} />
                                <span className="text-sm text-muted-foreground">Show on public site</span>
                            </div>
                            <InputError message={errors.is_visible} className="col-span-4 col-start-2" />
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
