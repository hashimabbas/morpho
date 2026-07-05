import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from './input-error';
import { Plus, Trash2, ArrowUp, ArrowDown, MoveVertical, Star } from 'lucide-react';

type PortfolioImage = {
    id?: number;
    image: string;
    is_cover: boolean;
    sort_order: number;
};

type Portfolio = {
    id: number;
    title: string;
    title_ar: string | null;
    slug: string;
    date: string;
    description: string | null;
    description_ar: string | null;
    cover_image: string | null;
    is_visible: boolean;
    sort_order: number;
    images?: PortfolioImage[];
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    portfolio?: Portfolio | null;
}

export default function PortfolioFormDialog({ isOpen, onClose, portfolio }: Props) {
    const [langTab, setLangTab] = useState<'en' | 'ar'>('en');

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST' as string,
        title: '',
        title_ar: '',
        slug: '',
        date: '',
        description: '',
        description_ar: '',
        cover_image: '',
        is_visible: true,
        sort_order: 0,
        images: [] as PortfolioImage[],
    });

    const isEditing = !!portfolio;

    useEffect(() => {
        return () => { document.body.style.pointerEvents = ''; };
    }, []);

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (portfolio) {
                setData({
                    _method: 'PUT' as string,
                    title: portfolio.title,
                    title_ar: portfolio.title_ar || '',
                    slug: portfolio.slug,
                    date: portfolio.date,
                    description: portfolio.description || '',
                    description_ar: portfolio.description_ar || '',
                    cover_image: portfolio.cover_image || '',
                    is_visible: portfolio.is_visible,
                    sort_order: portfolio.sort_order,
                    images: portfolio.images && portfolio.images.length > 0
                        ? portfolio.images.map((img, i) => ({ ...img, sort_order: img.sort_order ?? i }))
                        : [],
                });
            } else {
                setData({
                    _method: 'POST' as string,
                    title: '',
                    title_ar: '',
                    slug: '',
                    date: '',
                    description: '',
                    description_ar: '',
                    cover_image: '',
                    is_visible: true,
                    sort_order: 0,
                    images: [],
                });
            }
        }
    }, [isOpen, portfolio]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const routeName = isEditing ? 'dashboard.portfolios.update' : 'dashboard.portfolios.store';
        const routeParams = isEditing ? { portfolio: portfolio!.id } : {};
        post(route(routeName, routeParams), {
            preserveScroll: true,
            onSuccess: () => {
                document.body.style.pointerEvents = '';
                reset();
                onClose();
            },
        });
    };

    const handleClose = () => {
        reset();
        clearErrors();
        document.body.style.pointerEvents = '';
        onClose();
    };

    const addImage = () => {
        const newImages = [...data.images, { image: '', is_cover: false, sort_order: data.images.length }];
        setData('images', newImages);
    };

    const removeImage = (index: number) => {
        const newImages = data.images.filter((_, i) => i !== index);
        setData('images', newImages.map((img, i) => ({ ...img, sort_order: i })));
    };

    const moveImage = (index: number, direction: 'up' | 'down') => {
        const newImages = [...data.images];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newImages.length) return;
        [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
        setData('images', newImages.map((img, i) => ({ ...img, sort_order: i })));
    };

    const updateImage = (index: number, field: keyof PortfolioImage, value: string | boolean | number) => {
        const newImages = data.images.map((img, i) => {
            if (i === index) {
                if (field === 'is_cover' && value === true) {
                    return { ...img, is_cover: true, sort_order: img.sort_order };
                }
                return { ...img, [field]: value };
            }
            if (field === 'is_cover' && value === true) {
                return { ...img, is_cover: false };
            }
            return img;
        });
        setData('images', newImages);
    };

    if (!isOpen) return null;

    return (
        <Dialog open={true} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Portfolio' : 'Create Portfolio'}</DialogTitle>
                    <DialogDescription>This information will be displayed on the Portfolio page.</DialogDescription>
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
                                <Label htmlFor="title">Title (English)</Label>
                                <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} />
                                <InputError message={errors.title} />
                            </div>
                            <div>
                                <Label htmlFor="slug">Slug</Label>
                                <Input id="slug" value={data.slug} onChange={e => setData('slug', e.target.value)} placeholder="Auto-generated from title" />
                                <InputError message={errors.slug} />
                            </div>
                            <div>
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" type="date" value={data.date} onChange={e => setData('date', e.target.value)} />
                                <InputError message={errors.date} />
                            </div>
                            <div>
                                <Label htmlFor="description">Description (English)</Label>
                                <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows={3} />
                                <InputError message={errors.description} />
                            </div>
                            <div>
                                <Label htmlFor="cover_image">Cover Image URL</Label>
                                <Input id="cover_image" value={data.cover_image} onChange={e => setData('cover_image', e.target.value)} placeholder="/images/portfolio/project.jpg" />
                                <InputError message={errors.cover_image} />
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="is_visible"
                                        checked={data.is_visible}
                                        onCheckedChange={(checked) => setData('is_visible', checked === true)}
                                    />
                                    <Label htmlFor="is_visible" className="text-sm font-normal">Published</Label>
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor="sort_order">Sort Order</Label>
                                    <Input id="sort_order" type="number" value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} className="w-24" />
                                    <InputError message={errors.sort_order} />
                                </div>
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

                    {/* Images Section */}
                    <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-base font-semibold">Gallery Images</Label>
                            <Button type="button" variant="outline" size="sm" onClick={addImage}>
                                <Plus className="mr-1 h-4 w-4" /> Add Image
                            </Button>
                        </div>
                        <InputError message={errors['images']} />

                        {data.images.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-6">
                                No images added yet. Click "Add Image" to add images to this portfolio.
                            </p>
                        )}

                        {data.images.map((img, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 border rounded-md bg-muted/30">
                                <div className="flex flex-col gap-1 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => moveImage(index, 'up')}
                                        disabled={index === 0}
                                        className="p-1 rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <ArrowUp className="h-3 w-3" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => moveImage(index, 'down')}
                                        disabled={index === data.images.length - 1}
                                        className="p-1 rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <ArrowDown className="h-3 w-3" />
                                    </button>
                                </div>

                                {img.image && (
                                    <div className="h-16 w-20 shrink-0 rounded overflow-hidden border bg-white">
                                        <img
                                            src={img.image}
                                            alt={`Image ${index + 1}`}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://placehold.co/320x240/e2e8f0/94a3b8?text=Error';
                                            }}
                                        />
                                    </div>
                                )}

                                <div className="flex-1 space-y-2">
                                    <Input
                                        value={img.image}
                                        onChange={e => updateImage(index, 'image', e.target.value)}
                                        placeholder="Image URL"
                                        className="h-9 text-sm"
                                    />
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id={`is_cover_${index}`}
                                                checked={img.is_cover}
                                                onCheckedChange={(checked) => updateImage(index, 'is_cover', checked === true)}
                                            />
                                            <Label htmlFor={`is_cover_${index}`} className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Star className="h-3 w-3" /> Cover
                                            </Label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="p-1.5 rounded text-destructive hover:bg-destructive/10 mt-1"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>

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
