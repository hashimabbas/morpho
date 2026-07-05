import { useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from './input-error';
import { Trash2, Upload } from 'lucide-react';

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
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const pdfInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST' as string,
        name: '',
        description: '',
        name_ar: '',
        description_ar: '',
        image_upload: null as File | null,
        image_url: '',
        file_upload: null as File | null,
        file: '',
        sort_order: 0,
    });

    const isEditing = !!brochure;

    useEffect(() => {
        return () => { document.body.style.pointerEvents = ''; };
    }, []);

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            setImageFile(null);
            setPdfFile(null);
            if (brochure) {
                setData({
                    _method: 'PUT' as string,
                    name: brochure.name,
                    description: brochure.description,
                    name_ar: brochure.name_ar || '',
                    description_ar: brochure.description_ar || '',
                    image_upload: null,
                    image_url: brochure.image_url || '',
                    file_upload: null,
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
                    image_upload: null,
                    image_url: '',
                    file_upload: null,
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
            forceFormData: true,
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

    const handleImageSelect = (file: File | null) => {
        setImageFile(file);
        setData('image_upload', file);
        if (file) {
            setData('image_url', '');
        }
    };

    const handlePdfSelect = (file: File | null) => {
        setPdfFile(file);
        setData('file_upload', file);
        if (file) {
            setData('file', '');
        }
    };

    const imagePreview = imageFile
        ? URL.createObjectURL(imageFile)
        : (data.image_url || null);

    if (!isOpen) return null;

    return (
        <Dialog open={true} onOpenChange={handleClose}>
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

                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
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

                    <div>
                        <Label>Image</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-xs text-muted-foreground">Upload image</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        ref={imageInputRef}
                                        type="file"
                                        accept="image/png,image/jpg,image/jpeg,image/webp,image/svg+xml"
                                        onChange={e => handleImageSelect(e.target.files?.[0] || null)}
                                        className="flex-1"
                                    />
                                    {imageFile && (
                                        <Button type="button" variant="ghost" size="sm" onClick={() => { handleImageSelect(null); if (imageInputRef.current) imageInputRef.current.value = ''; }}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Or enter image URL</Label>
                                <Input
                                    value={data.image_url}
                                    onChange={e => setData('image_url', e.target.value)}
                                    placeholder="/images/brochures/..."
                                    disabled={!!imageFile}
                                />
                            </div>
                        </div>
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="mt-2 h-16 w-auto object-contain rounded border" />
                        )}
                        <InputError message={errors.image_url || errors.image_upload} />
                    </div>

                    <div>
                        <Label>PDF File</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-xs text-muted-foreground">Upload PDF</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        ref={pdfInputRef}
                                        type="file"
                                        accept=".pdf,application/pdf"
                                        onChange={e => handlePdfSelect(e.target.files?.[0] || null)}
                                        className="flex-1"
                                    />
                                    {pdfFile && (
                                        <Button type="button" variant="ghost" size="sm" onClick={() => { handlePdfSelect(null); if (pdfInputRef.current) pdfInputRef.current.value = ''; }}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Or enter PDF path</Label>
                                <Input
                                    value={data.file}
                                    onChange={e => setData('file', e.target.value)}
                                    placeholder="/files/brochures/..."
                                    disabled={!!pdfFile}
                                />
                            </div>
                        </div>
                        {(pdfFile || data.file) && (
                            <p className="mt-1 text-xs text-muted-foreground">
                                📄 {pdfFile ? pdfFile.name : data.file}
                            </p>
                        )}
                        <InputError message={errors.file || errors.file_upload} />
                    </div>

                    <div>
                        <Label htmlFor="sort_order">Sort Order</Label>
                        <Input id="sort_order" type="number" value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} />
                        <InputError message={errors.sort_order} />
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
