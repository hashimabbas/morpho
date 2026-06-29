import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from './input-error';
import { availableIcons, getIcon } from '@/lib/icons';
import ContentSectionBuilder from './ContentSectionBuilder';

type Ecosystem = {
    id: number;
    icon: string;
    title: string;
    description: string;
    image: string | null;
    href: string | null;
    features: string[];
    subtitle: string | null;
    slug?: string | null;
    content?: any;
    sort_order: number;
    is_visible: boolean;
    title_ar: string | null;
    description_ar: string | null;
    subtitle_ar: string | null;
    features_ar: string[] | null;
    content_ar?: any;
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    ecosystem?: Ecosystem | null;
}

export default function EcosystemFormDialog({ isOpen, onClose, ecosystem }: Props) {
    const [langTab, setLangTab] = useState<'en' | 'ar'>('en');

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST' as string,
        type: 'service',
        slug: '',
        icon: 'cpu',
        title: '',
        description: '',
        image: '',
        href: '',
        features: [''] as string[],
        features_ar: [''] as string[],
        content: '',
        content_ar: '',
        subtitle: '',
        title_ar: '',
        description_ar: '',
        subtitle_ar: '',
        sort_order: 0,
        is_visible: true,
    });

    const [contentError, setContentError] = useState('');
    const [dialogKey, setDialogKey] = useState(0);

    const isEditing = !!ecosystem;

    useEffect(() => {
        if (!isOpen) return;
        setDialogKey(k => k + 1);
        if (isEditing && ecosystem) {
            setData({
                _method: 'PATCH',
                type: ecosystem.type || 'service',
                slug: ecosystem.slug || '',
                icon: ecosystem.icon || 'cpu',
                title: ecosystem.title || '',
                description: ecosystem.description || '',
                image: ecosystem.image || '',
                href: ecosystem.href || '',
                features: ecosystem.features.length ? ecosystem.features : [''],
                features_ar: ecosystem.features_ar?.length ? ecosystem.features_ar : [''],
                content: ecosystem.content ? JSON.stringify(ecosystem.content, null, 2) : '',
                content_ar: ecosystem.content_ar ? JSON.stringify(ecosystem.content_ar, null, 2) : '',
                subtitle: ecosystem.subtitle || '',
                title_ar: ecosystem.title_ar || '',
                description_ar: ecosystem.description_ar || '',
                subtitle_ar: ecosystem.subtitle_ar || '',
                sort_order: ecosystem.sort_order || 0,
                is_visible: ecosystem.is_visible,
            });
            setContentError('');
        } else {
            setData({
                _method: 'POST',
                type: 'service',
                slug: '',
                icon: 'cpu',
                title: '',
                description: '',
                image: '',
                href: '',
                features: [''],
                features_ar: [''],
                content: '',
                content_ar: '',
                subtitle: '',
                title_ar: '',
                description_ar: '',
                subtitle_ar: '',
                sort_order: 0,
                is_visible: true,
            });
            setLangTab('en');
            setContentError('');
        }
    }, [isOpen, ecosystem, isEditing]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let parsedContent: any = null;
        if (data.content && typeof data.content === 'string' && data.content.trim()) {
            try {
                parsedContent = JSON.parse(data.content);
                setContentError('');
            } catch {
                setContentError('Invalid JSON format. Please check your content.');
                return;
            }
        }

        setData('content', parsedContent);

        let parsedContentAr: any = null;
        if (data.content_ar && typeof data.content_ar === 'string' && data.content_ar.trim()) {
            try {
                parsedContentAr = JSON.parse(data.content_ar);
                setContentError('');
            } catch {
                setContentError('Invalid JSON format in Arabic content. Please check your content.');
                return;
            }
        }

        setData('content_ar', parsedContentAr);

        setTimeout(() => {
            if (isEditing && ecosystem) {
                post(route('dashboard.ecosystems.update', ecosystem.id), {
                    onSuccess: () => onClose(),
                    preserveScroll: true,
                });
            } else {
                post(route('dashboard.ecosystems.store'), {
                    onSuccess: () => onClose(),
                    preserveScroll: true,
                });
            }
        }, 50);
    };

    const handleClose = () => {
        if (!processing) {
            clearErrors();
            reset();
            onClose();
        }
    };

    const addFeature = () => {
        setData('features', [...data.features, '']);
    };

    const removeFeature = (index: number) => {
        setData('features', data.features.filter((_, i) => i !== index));
    };

    const setFeature = (index: number, value: string) => {
        const updated = [...data.features];
        updated[index] = value;
        setData('features', updated);
    };

    const addFeatureAr = () => {
        setData('features_ar', [...data.features_ar, '']);
    };

    const removeFeatureAr = (index: number) => {
        setData('features_ar', data.features_ar.filter((_, i) => i !== index));
    };

    const setFeatureAr = (index: number, value: string) => {
        const updated = [...data.features_ar];
        updated[index] = value;
        setData('features_ar', updated);
    };

    const PreviewIcon = getIcon(data.icon);

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Ecosystem' : 'Create New Ecosystem'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Update this ecosystem card.' : 'Add a new ecosystem card to the section.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">Type</Label>
                            <Select onValueChange={value => setData('type', value)} value={data.type}>
                                <SelectTrigger className="col-span-3"><SelectValue placeholder="Select type" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="service">Service</SelectItem>
                                    <SelectItem value="project">Project</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.type} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="slug" className="text-right">Slug</Label>
                            <Input id="slug" value={data.slug} onChange={e => setData('slug', e.target.value)} className="col-span-3" placeholder="cold-chain" />
                            <InputError message={errors.slug} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="icon" className="text-right">Icon</Label>
                            <div className="col-span-3 flex items-center gap-3">
                                <Select onValueChange={value => setData('icon', value)} value={data.icon}>
                                    <SelectTrigger className="flex-1"><SelectValue placeholder="Select icon" /></SelectTrigger>
                                    <SelectContent>
                                        {availableIcons.map(name => (
                                            <SelectItem key={name} value={name}>{name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <PreviewIcon className="h-5 w-5 text-morpho" />
                            </div>
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
                                    <Label htmlFor="title" className="text-right">
                                        Title <span className="text-red-500">*</span>
                                    </Label>
                                    <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} className="col-span-3" dir="ltr" />
                                    <InputError message={errors.title} className="col-span-4 col-start-2" />
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="description" className="text-right pt-2">
                                        Description <span className="text-red-500">*</span>
                                    </Label>
                                    <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} className="col-span-3" rows={2} dir="ltr" />
                                    <InputError message={errors.description} className="col-span-4 col-start-2" />
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="subtitle" className="text-right pt-2">Subtitle</Label>
                                    <Textarea id="subtitle" value={data.subtitle} onChange={e => setData('subtitle', e.target.value)} className="col-span-3" rows={2} placeholder="Section subtitle (used from first item)" dir="ltr" />
                                    <InputError message={errors.subtitle} className="col-span-4 col-start-2" />
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    <Label className="text-right pt-2">Features</Label>
                                    <div className="col-span-3 space-y-2">
                                        {data.features.map((feature, index) => (
                                            <div key={index} className="flex gap-2">
                                                <Input value={feature} onChange={e => setFeature(index, e.target.value)} placeholder={`Feature ${index + 1}`} dir="ltr" />
                                                <Button type="button" variant="ghost" size="sm" onClick={() => removeFeature(index)} disabled={data.features.length === 1}>×</Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" size="sm" onClick={addFeature}>+ Add Feature</Button>
                                    </div>
                                    <InputError message={errors.features} className="col-span-4 col-start-2" />
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
                                    <Textarea id="description_ar" value={data.description_ar} onChange={e => setData('description_ar', e.target.value)} className="col-span-3" rows={2} dir="rtl" />
                                    <InputError message={errors.description_ar} className="col-span-4 col-start-2" />
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="subtitle_ar" className="text-right pt-2">النص الفرعي</Label>
                                    <Textarea id="subtitle_ar" value={data.subtitle_ar} onChange={e => setData('subtitle_ar', e.target.value)} className="col-span-3" rows={2} placeholder="النص الفرعي للقسم (يؤخذ من أول عنصر)" dir="rtl" />
                                    <InputError message={errors.subtitle_ar} className="col-span-4 col-start-2" />
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    <Label className="text-right pt-2">الميزات</Label>
                                    <div className="col-span-3 space-y-2">
                                        {data.features_ar.map((feature, index) => (
                                            <div key={index} className="flex gap-2">
                                                <Input value={feature} onChange={e => setFeatureAr(index, e.target.value)} placeholder={`ميزة ${index + 1}`} dir="rtl" />
                                                <Button type="button" variant="ghost" size="sm" onClick={() => removeFeatureAr(index)} disabled={data.features_ar.length === 1}>×</Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" size="sm" onClick={addFeatureAr}>+ إضافة ميزة</Button>
                                    </div>
                                    <InputError message={errors.features_ar} className="col-span-4 col-start-2" />
                                </div>
                            <div className="grid grid-cols-4 gap-4">
                                <Label className="text-right pt-2">Content</Label>
                                <div className="col-span-3">
                                    <ContentSectionBuilder
                                        key={`content_ar-${dialogKey}`}
                                        value={data.content_ar}
                                        onChange={v => { setData('content_ar', v); setContentError(''); }}
                                        onError={setContentError}
                                    />
                                    {contentError && <p className="text-sm text-red-600 mt-1">{contentError}</p>}
                                </div>
                                <InputError message={errors.content_ar} className="col-span-4 col-start-2" />
                            </div>
                        </>
                    )}

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">Image path</Label>
                            <Input id="image" value={data.image} onChange={e => setData('image', e.target.value)} className="col-span-3" placeholder="/images/products.png" />
                            <InputError message={errors.image} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="href" className="text-right">Link</Label>
                            <Input id="href" value={data.href} onChange={e => setData('href', e.target.value)} className="col-span-3" placeholder="/solutions/cold-chain" />
                            <InputError message={errors.href} className="col-span-4 col-start-2" />
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

                        <div className="grid grid-cols-4 gap-4">
                            <Label className="text-right pt-2">Content</Label>
                            <div className="col-span-3">
                                <ContentSectionBuilder
                                    key={dialogKey}
                                    value={data.content}
                                    onChange={v => { setData('content', v); setContentError(''); }}
                                    onError={setContentError}
                                />
                                {contentError && <p className="text-sm text-red-600 mt-1">{contentError}</p>}
                            </div>
                            <InputError message={errors.content} className="col-span-4 col-start-2" />
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
