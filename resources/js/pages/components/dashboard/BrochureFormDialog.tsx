import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from './input-error';

type Brochure = {
    id: number;
    name: string;
    description: string;
    name_ar: string | null;
    description_ar: string | null;
    image_url: string | null;
    file: string | null;
    sort_order: number;
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    brochure?: Brochure | null;
}

export default function BrochureFormDialog({ isOpen, onClose, brochure }: Props) {
    const [langTab, setLangTab] = useState<'en' | 'ar'>('en');

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST' as string,
        name: '',
        description: '',
        name_ar: '',
        description_ar: '',
        image_url: '',
        file: '',
        sort_order: 0,
    });

    const isEditing = !!brochure;

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (brochure) {
                setData({
                    _method: 'PUT' as string,
                    name: brochure.name,
                    description: brochure.description,
                    name_ar: brochure.name_ar || '',
                    description_ar: brochure.description_ar || '',
                    image_url: brochure.image_url || '',
                    file: brochure.file || '',
                    sort_order: brochure.sort_order,
                });
            } else {
                setData({
                    _method: 'POST' as string,
                    name: '',
                    description: '',
                    name_ar: '',
                    description_ar: '',
                    image_url: '',
                    file: '',
                    sort_order: 0,
                });
            }
        }
    }, [isOpen, brochure]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const routeName = isEditing ? 'dashboard.brochures.update' : 'dashboard.brochures.store';
        const routeParams = isEditing ? { brochure: brochure!.id } : {};
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

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Brochure' : 'Create Brochure'}</DialogTitle>
                    <DialogDescription>This information will be displayed on the Brochures page.</DialogDescription>
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
                                <Label htmlFor="name">Name (English)</Label>
                                <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                                <InputError message={errors.name} />
                            </div>
                            <div>
                                <Label htmlFor="description">Description (English)</Label>
                                <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows={3} />
                                <InputError message={errors.description} />
                            </div>
                            <div>
                                <Label htmlFor="image_url">Image URL</Label>
                                <Input id="image_url" value={data.image_url} onChange={e => setData('image_url', e.target.value)} placeholder="/images/solutions/cold.png" />
                                <InputError message={errors.image_url} />
                            </div>
                            <div>
                                <Label htmlFor="file">PDF File</Label>
                                <Input id="file" value={data.file} onChange={e => setData('file', e.target.value)} placeholder="1.pdf" />
                                <InputError message={errors.file} />
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
                                <Label htmlFor="name_ar">الاسم (عربي)</Label>
                                <Input id="name_ar" value={data.name_ar} onChange={e => setData('name_ar', e.target.value)} dir="rtl" className="font-arabic" />
                                <InputError message={errors.name_ar} />
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
