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
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    ecosystem?: Ecosystem | null;
}

export default function EcosystemFormDialog({ isOpen, onClose, ecosystem }: Props) {
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
        content: '',
        subtitle: '',
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
                content: ecosystem.content ? JSON.stringify(ecosystem.content, null, 2) : '',
                subtitle: ecosystem.subtitle || '',
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
                content: '',
                subtitle: '',
                sort_order: 0,
                is_visible: true,
            });
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
                            <Label htmlFor="title" className="text-right">Title</Label>
                            <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} className="col-span-3" />
                            <InputError message={errors.title} className="col-span-4 col-start-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Description</Label>
                            <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} className="col-span-3" rows={2} />
                            <InputError message={errors.description} className="col-span-4 col-start-2" />
                        </div>
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
                            <Label htmlFor="subtitle" className="text-right">Subtitle</Label>
                            <Textarea id="subtitle" value={data.subtitle} onChange={e => setData('subtitle', e.target.value)} className="col-span-3" rows={2} placeholder="Section subtitle (used from first item)" />
                            <InputError message={errors.subtitle} className="col-span-4 col-start-2" />
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
                            <Label className="text-right pt-2">Features</Label>
                            <div className="col-span-3 space-y-2">
                                {data.features.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input value={feature} onChange={e => setFeature(index, e.target.value)} placeholder={`Feature ${index + 1}`} />
                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFeature(index)} disabled={data.features.length === 1}>×</Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={addFeature}>+ Add Feature</Button>
                            </div>
                            <InputError message={errors.features} className="col-span-4 col-start-2" />
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
