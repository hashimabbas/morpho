import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from './input-error';

type CorePurpose = {
    id: number;
    type: string;
    icon: string;
    title: string;
    description: string;
    subtitle: string | null;
    title_ar: string | null;
    description_ar: string | null;
    subtitle_ar: string | null;
    sort_order: number;
    is_visible: boolean;
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    corePurpose?: CorePurpose | null;
}

export default function CorePurposeFormDialog({ isOpen, onClose, corePurpose }: Props) {
    const [langTab, setLangTab] = useState<'en' | 'ar'>('en');

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST' as string,
        type: 'custom',
        icon: '/icons/vision.png',
        title: '',
        description: '',
        subtitle: '',
        title_ar: '',
        description_ar: '',
        subtitle_ar: '',
        sort_order: 0,
        is_visible: true,
    });

    const isEditing = !!corePurpose;

    useEffect(() => {
        if (isOpen && isEditing && corePurpose) {
            setData({
                _method: 'PATCH',
                type: corePurpose.type || 'custom',
                icon: corePurpose.icon || '/icons/vision.png',
                title: corePurpose.title || '',
                description: corePurpose.description || '',
                subtitle: corePurpose.subtitle || '',
                title_ar: corePurpose.title_ar || '',
                description_ar: corePurpose.description_ar || '',
                subtitle_ar: corePurpose.subtitle_ar || '',
                sort_order: corePurpose.sort_order || 0,
                is_visible: corePurpose.is_visible,
            });
        } else if (isOpen) {
            setData({
                _method: 'POST',
                type: 'custom',
                icon: '/icons/vision.png',
                title: '',
                description: '',
                subtitle: '',
                title_ar: '',
                description_ar: '',
                subtitle_ar: '',
                sort_order: 0,
                is_visible: true,
            });
            setLangTab('en');
        }
    }, [isOpen, corePurpose, isEditing]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => onClose(),
            preserveScroll: true,
        };

        if (isEditing && corePurpose) {
            post(route('dashboard.core-purposes.update', corePurpose.id), options);
        } else {
            post(route('dashboard.core-purposes.store'), options);
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
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Core Purpose' : 'Create New Core Purpose'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Update this vision/mission item.' : 'Add a new vision or mission item.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">Type</Label>
                            <Input id="type" value={data.type} onChange={e => setData('type', e.target.value)} className="col-span-3" placeholder="e.g. vision, mission" />
                            <InputError message={errors.type} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="icon" className="text-right">Icon path</Label>
                            <Input id="icon" value={data.icon} onChange={e => setData('icon', e.target.value)} className="col-span-3" placeholder="e.g. /icons/vision.png" />
                            <InputError message={errors.icon} className="col-span-4 col-start-2" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Language</Label>
                            <div className="col-span-3 flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setLangTab('en')}
                                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                                        langTab === 'en'
                                            ? 'bg-morpho text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
                                    }`}
                                >
                                    English
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLangTab('ar')}
                                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                                        langTab === 'ar'
                                            ? 'bg-morpho text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
                                    }`}
                                >
                                    العربية
                                </button>
                            </div>
                        </div>

                        {langTab === 'en' ? (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">Title <span className="text-red-500">*</span></Label>
                                    <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} className="col-span-3" dir="ltr" />
                                    <InputError message={errors.title} className="col-span-4 col-start-2" />
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="description" className="text-right pt-2">Description <span className="text-red-500">*</span></Label>
                                    <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} className="col-span-3" rows={4} dir="ltr" />
                                    <InputError message={errors.description} className="col-span-4 col-start-2" />
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="subtitle" className="text-right pt-2">Subtitle</Label>
                                    <Textarea id="subtitle" value={data.subtitle} onChange={e => setData('subtitle', e.target.value)} className="col-span-3" rows={2} placeholder="Section subtitle (used from first item)" dir="ltr" />
                                    <InputError message={errors.subtitle} className="col-span-4 col-start-2" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title_ar" className="text-right">العنوان</Label>
                                    <Input id="title_ar" value={data.title_ar} onChange={e => setData('title_ar', e.target.value)} className="col-span-3" dir="rtl" />
                                    <InputError message={errors.title_ar} className="col-span-4 col-start-2" />
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="description_ar" className="text-right pt-2">الوصف</Label>
                                    <Textarea id="description_ar" value={data.description_ar} onChange={e => setData('description_ar', e.target.value)} className="col-span-3" rows={4} dir="rtl" />
                                    <InputError message={errors.description_ar} className="col-span-4 col-start-2" />
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="subtitle_ar" className="text-right pt-2">العنوان الفرعي</Label>
                                    <Textarea id="subtitle_ar" value={data.subtitle_ar} onChange={e => setData('subtitle_ar', e.target.value)} className="col-span-3" rows={2} dir="rtl" />
                                    <InputError message={errors.subtitle_ar} className="col-span-4 col-start-2" />
                                </div>
                            </>
                        )}

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
