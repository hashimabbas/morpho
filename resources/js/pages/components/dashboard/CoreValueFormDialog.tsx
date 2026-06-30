import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { availableIcons, getIcon } from '@/lib/icons';
import InputError from './input-error';

type CoreValue = {
    id: number;
    icon: string;
    title: string;
    description: string;
    title_ar: string | null;
    description_ar: string | null;
    sort_order: number;
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    coreValue?: CoreValue | null;
}

export default function CoreValueFormDialog({ isOpen, onClose, coreValue }: Props) {
    const [langTab, setLangTab] = useState<'en' | 'ar'>('en');

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST' as string,
        icon: 'zap',
        title: '',
        description: '',
        title_ar: '',
        description_ar: '',
        sort_order: 0,
    });

    const isEditing = !!coreValue;

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (coreValue) {
                setData({
                    _method: 'PUT' as string,
                    icon: coreValue.icon,
                    title: coreValue.title,
                    description: coreValue.description,
                    title_ar: coreValue.title_ar || '',
                    description_ar: coreValue.description_ar || '',
                    sort_order: coreValue.sort_order,
                });
            } else {
                setData({
                    _method: 'POST' as string,
                    icon: 'zap',
                    title: '',
                    description: '',
                    title_ar: '',
                    description_ar: '',
                    sort_order: 0,
                });
            }
        }
    }, [isOpen, coreValue]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const routeName = isEditing ? 'dashboard.core-values.update' : 'dashboard.core-values.store';
        const routeParams = isEditing ? { coreValue: coreValue!.id } : {};
        post(route(routeName, routeParams), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const handleClose = () => {
        reset();
        clearErrors();
        onClose();
    };

    const SelectedIcon = getIcon(data.icon);

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Core Value' : 'Create Core Value'}</DialogTitle>
                    <DialogDescription>This information will be displayed on the About page.</DialogDescription>
                </DialogHeader>

                <div className="flex gap-2 border-b pb-2 mb-4">
                    <button
                        type="button"
                        onClick={() => setLangTab('en')}
                        className={`px-4 py-2 text-sm font-medium rounded-t transition ${langTab === 'en' ? 'border-b-2 border-morpho text-morpho' : 'text-muted-foreground'}`}
                    >
                        English
                    </button>
                    <button
                        type="button"
                        onClick={() => setLangTab('ar')}
                        className={`px-4 py-2 text-sm font-medium rounded-t transition ${langTab === 'ar' ? 'border-b-2 border-morpho text-morpho' : 'text-muted-foreground'}`}
                    >
                        العربية
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {langTab === 'en' ? (
                        <>
                            <div>
                                <Label htmlFor="icon">Icon</Label>
                                <div className="flex flex-wrap gap-2 mt-1 mb-2">
                                    {availableIcons.map((iconName) => {
                                        const IconComp = getIcon(iconName);
                                        return (
                                            <button
                                                key={iconName}
                                                type="button"
                                                onClick={() => setData('icon', iconName)}
                                                className={`p-2 rounded border transition ${data.icon === iconName ? 'border-morpho bg-morpho/10 ring-1 ring-morpho' : 'border-gray-200 hover:border-gray-300'}`}
                                                title={iconName}
                                            >
                                                <IconComp className="h-5 w-5" />
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <SelectedIcon className="h-4 w-4" />
                                    <span>Selected: <code className="bg-muted px-1 rounded">{data.icon}</code></span>
                                </div>
                                <InputError message={errors.icon} />
                            </div>
                            <div>
                                <Label htmlFor="title">Title (English)</Label>
                                <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} />
                                <InputError message={errors.title} />
                            </div>
                            <div>
                                <Label htmlFor="description">Description (English)</Label>
                                <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows={3} />
                                <InputError message={errors.description} />
                            </div>
                            <div>
                                <Label htmlFor="sort_order">Sort Order</Label>
                                <Input id="sort_order" type="number" value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} />
                                <InputError message={errors.sort_order} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <Label htmlFor="title_ar">العنوان (عربي)</Label>
                                <Input id="title_ar" value={data.title_ar} onChange={e => setData('title_ar', e.target.value)} dir="rtl" className="font-arabic" />
                                <InputError message={errors.title_ar} />
                            </div>
                            <div>
                                <Label htmlFor="description_ar">الوصف (عربي)</Label>
                                <Textarea id="description_ar" value={data.description_ar} onChange={e => setData('description_ar', e.target.value)} rows={3} dir="rtl" className="font-arabic" />
                                <InputError message={errors.description_ar} />
                            </div>
                        </>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        <Button type="submit" disabled={processing}>
                            {isEditing ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
