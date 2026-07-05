import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Plus, Trash2, Globe, Languages } from 'lucide-react';
import { useState, useRef } from 'react';

interface HeroImage {
    src: string;
    alt: string;
    alt_ar: string;
}

interface HeroData {
    id?: number;
    subtitle: string;
    subtitle_ar: string;
    heading: string;
    heading_ar: string;
    description: string;
    description_ar: string;
    feature_1: string;
    feature_1_ar: string;
    feature_2: string;
    feature_2_ar: string;
    feature_2_desc: string;
    feature_2_desc_ar: string;
    cta_text: string;
    cta_text_ar: string;
    explore_text: string;
    explore_text_ar: string;
    images: HeroImage[];
    is_active: boolean;
}

interface Props {
    hero: HeroData;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard.index') },
    { title: 'Hero Section', href: route('dashboard.hero.edit'), isCurrent: true },
];

export default function HeroSection({ hero }: Props) {
    const [lang, setLang] = useState<'en' | 'ar'>('en');
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const { data, setData, processing, errors } = useForm({
        _method: hero.id ? 'PATCH' : 'POST',
        subtitle: hero.subtitle ?? '',
        subtitle_ar: hero.subtitle_ar ?? '',
        heading: hero.heading ?? '',
        heading_ar: hero.heading_ar ?? '',
        description: hero.description ?? '',
        description_ar: hero.description_ar ?? '',
        feature_1: hero.feature_1 ?? '',
        feature_1_ar: hero.feature_1_ar ?? '',
        feature_2: hero.feature_2 ?? '',
        feature_2_ar: hero.feature_2_ar ?? '',
        feature_2_desc: hero.feature_2_desc ?? '',
        feature_2_desc_ar: hero.feature_2_desc_ar ?? '',
        cta_text: hero.cta_text ?? '',
        cta_text_ar: hero.cta_text_ar ?? '',
        explore_text: hero.explore_text ?? '',
        explore_text_ar: hero.explore_text_ar ?? '',
        images: hero.images ?? [],
        is_active: hero.is_active ?? true,
    });

    const [imageFiles, setImageFiles] = useState<(File | null)[]>(
        hero.images?.map(() => null) ?? []
    );

    const addImage = () => {
        setData('images', [...data.images, { src: '', alt: '', alt_ar: '' }]);
        setImageFiles([...imageFiles, null]);
    };

    const removeImage = (index: number) => {
        setData('images', data.images.filter((_, i) => i !== index));
        setImageFiles(imageFiles.filter((_, i) => i !== index));
    };

    const updateImage = (index: number, field: keyof HeroImage, value: string) => {
        const updated = [...data.images];
        updated[index] = { ...updated[index], [field]: value };
        setData('images', updated);
    };

    const handleFileSelect = (index: number, file: File | null) => {
        const newFiles = [...imageFiles];
        newFiles[index] = file;
        setImageFiles(newFiles);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', data._method);
        formData.append('subtitle', data.subtitle);
        formData.append('subtitle_ar', data.subtitle_ar);
        formData.append('heading', data.heading);
        formData.append('heading_ar', data.heading_ar);
        formData.append('description', data.description);
        formData.append('description_ar', data.description_ar);
        formData.append('feature_1', data.feature_1);
        formData.append('feature_1_ar', data.feature_1_ar);
        formData.append('feature_2', data.feature_2);
        formData.append('feature_2_ar', data.feature_2_ar);
        formData.append('feature_2_desc', data.feature_2_desc);
        formData.append('feature_2_desc_ar', data.feature_2_desc_ar);
        formData.append('cta_text', data.cta_text);
        formData.append('cta_text_ar', data.cta_text_ar);
        formData.append('explore_text', data.explore_text);
        formData.append('explore_text_ar', data.explore_text_ar);
        formData.append('is_active', data.is_active ? '1' : '0');

        data.images.forEach((image, index) => {
            formData.append(`images[${index}][src]`, image.src);
            formData.append(`images[${index}][alt]`, image.alt);
            formData.append(`images[${index}][alt_ar]`, image.alt_ar);
        });

        imageFiles.forEach((file, index) => {
            if (file) {
                formData.append(`images[${index}][file]`, file);
            }
        });

        router.post(route('dashboard.hero.update'), formData, {
            preserveScroll: true,
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    };

    const previewUrl = (index: number) => {
        const file = imageFiles[index];
        if (file) return URL.createObjectURL(file);
        return data.images[index]?.src || '';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hero Section" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold">Hero Section</h2>
                            <p className="text-sm text-muted-foreground">Manage the main hero section content on the homepage.</p>
                        </div>
                        <Button type="submit" disabled={processing}>
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </div>

                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Language</CardTitle>
                                        <CardDescription>Switch between English and Arabic content.</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant={lang === 'en' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setLang('en')}
                                        >
                                            <Globe className="mr-2 h-4 w-4" /> English
                                        </Button>
                                        <Button
                                            type="button"
                                            variant={lang === 'ar' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setLang('ar')}
                                        >
                                            <Languages className="mr-2 h-4 w-4" /> العربية
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>

                        {lang === 'en' ? (
                            <EnglishFields data={data} setData={setData} errors={errors} />
                        ) : (
                            <ArabicFields data={data} setData={setData} errors={errors} />
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle>Carousel Images</CardTitle>
                                <CardDescription>Upload new images or use existing URLs for the hero carousel.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {data.images.map((image, index) => (
                                    <div key={index} className="flex gap-4 items-start p-4 border rounded-lg">
                                        <div className="flex-1 space-y-3">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label>Upload Image</Label>
                                                    <div className="flex items-center gap-2">
                                                        <Input
                                                            ref={el => { fileInputRefs.current[index] = el; }}
                                                            type="file"
                                                            accept="image/png,image/jpg,image/jpeg,image/webp,image/svg+xml"
                                                            onChange={e => handleFileSelect(index, e.target.files?.[0] || null)}
                                                            className="flex-1"
                                                        />
                                                        {imageFiles[index] && (
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => {
                                                                    handleFileSelect(index, null);
                                                                    if (fileInputRefs.current[index]) {
                                                                        fileInputRefs.current[index]!.value = '';
                                                                    }
                                                                }}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label>Or enter image URL</Label>
                                                    <Input
                                                        value={image.src}
                                                        onChange={e => updateImage(index, 'src', e.target.value)}
                                                        placeholder="/images/example.png"
                                                        disabled={!!imageFiles[index]}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label>Alt Text (EN)</Label>
                                                    <Input
                                                        value={image.alt}
                                                        onChange={e => updateImage(index, 'alt', e.target.value)}
                                                        placeholder="English alt text"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Alt Text (AR)</Label>
                                                    <Input
                                                        value={image.alt_ar}
                                                        onChange={e => updateImage(index, 'alt_ar', e.target.value)}
                                                        placeholder="النص البديل بالعربية"
                                                    />
                                                </div>
                                            </div>
                                            {previewUrl(index) && (
                                                <img src={previewUrl(index)} alt={image.alt} className="h-20 w-auto object-contain rounded border" />
                                            )}
                                        </div>
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeImage(index)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addImage}>
                                    <Plus className="mr-2 h-4 w-4" /> Add Image
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

function EnglishFields({ data, setData, errors }: { data: any; setData: any; errors: any }) {
    const fields = [
        { key: 'subtitle', label: 'Subtitle', type: 'input' },
        { key: 'heading', label: 'Heading', type: 'textarea' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'feature_1', label: 'Feature 1', type: 'input' },
        { key: 'feature_2', label: 'Feature 2', type: 'input' },
        { key: 'feature_2_desc', label: 'Feature 2 Description', type: 'input' },
        { key: 'cta_text', label: 'CTA Button Text', type: 'input' },
        { key: 'explore_text', label: 'Explore Button Text', type: 'input' },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>English Content</CardTitle>
                <CardDescription>Edit the English version of the hero section.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {fields.map(({ key, label, type }) => (
                    <div key={key}>
                        <Label htmlFor={key}>{label}</Label>
                        {type === 'textarea' ? (
                            <Textarea
                                id={key}
                                value={data[key]}
                                onChange={e => setData(key, e.target.value)}
                                rows={3}
                            />
                        ) : (
                            <Input id={key} value={data[key]} onChange={e => setData(key, e.target.value)} />
                        )}
                        {errors[key] && <p className="text-sm text-destructive mt-1">{errors[key]}</p>}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function ArabicFields({ data, setData, errors }: { data: any; setData: any; errors: any }) {
    const fields = [
        { key: 'subtitle_ar', label: 'العنوان الفرعي', type: 'input' },
        { key: 'heading_ar', label: 'العنوان الرئيسي', type: 'textarea' },
        { key: 'description_ar', label: 'الوصف', type: 'textarea' },
        { key: 'feature_1_ar', label: 'الميزة 1', type: 'input' },
        { key: 'feature_2_ar', label: 'الميزة 2', type: 'input' },
        { key: 'feature_2_desc_ar', label: 'وصف الميزة 2', type: 'input' },
        { key: 'cta_text_ar', label: 'نص زر الإجراء', type: 'input' },
        { key: 'explore_text_ar', label: 'نص زر الاستكشاف', type: 'input' },
    ];

    return (
        <Card dir="rtl">
            <CardHeader>
                <CardTitle>المحتوى العربي</CardTitle>
                <CardDescription>تعديل المحتوى العربي لقسم الهيرو.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {fields.map(({ key, label, type }) => (
                    <div key={key}>
                        <Label htmlFor={key}>{label}</Label>
                        {type === 'textarea' ? (
                            <Textarea
                                id={key}
                                value={data[key]}
                                onChange={e => setData(key, e.target.value)}
                                rows={3}
                            />
                        ) : (
                            <Input id={key} value={data[key]} onChange={e => setData(key, e.target.value)} />
                        )}
                        {errors[key] && <p className="text-sm text-destructive mt-1">{errors[key]}</p>}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
