import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from './input-error';

type PricingPlan = {
    id: number;
    name: string;
    handle: string;
    description: string | null;
    price_label: string;
    price_period: string;
    features: string[] | null;
    cta: string;
    is_popular: boolean;
    sort_order: number;
    is_visible: boolean;
    name_ar: string | null;
    description_ar: string | null;
    features_ar: string[] | null;
    cta_ar: string | null;
    price_label_ar: string | null;
    price_period_ar: string | null;
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    pricingPlan?: PricingPlan | null;
}

export default function PricingPlanFormDialog({ isOpen, onClose, pricingPlan }: Props) {
    const [langTab, setLangTab] = useState<'en' | 'ar'>('en');

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST',
        name: '',
        handle: '',
        description: '',
        price_label: '',
        price_period: '/ month',
        features: '',
        cta: 'Buy Now',
        is_popular: '0',
        sort_order: 0,
        is_visible: '1',
        name_ar: '',
        description_ar: '',
        features_ar: '',
        cta_ar: '',
        price_label_ar: '',
        price_period_ar: '',
    });

    const isEditing = !!pricingPlan;

    useEffect(() => {
        if (isOpen && isEditing && pricingPlan) {
            setData({
                _method: 'PATCH',
                name: pricingPlan.name || '',
                handle: pricingPlan.handle || '',
                description: pricingPlan.description || '',
                price_label: pricingPlan.price_label || '',
                price_period: pricingPlan.price_period || '/ month',
                features: pricingPlan.features ? JSON.stringify(pricingPlan.features, null, 2) : '',
                cta: pricingPlan.cta || 'Buy Now',
                is_popular: pricingPlan.is_popular ? '1' : '0',
                sort_order: pricingPlan.sort_order || 0,
                is_visible: pricingPlan.is_visible ? '1' : '0',
                name_ar: pricingPlan.name_ar || '',
                description_ar: pricingPlan.description_ar || '',
                features_ar: pricingPlan.features_ar ? JSON.stringify(pricingPlan.features_ar, null, 2) : '',
                cta_ar: pricingPlan.cta_ar || '',
                price_label_ar: pricingPlan.price_label_ar || '',
                price_period_ar: pricingPlan.price_period_ar || '',
            });
        } else if (isOpen) {
            setData({
                _method: 'POST',
                name: '',
                handle: '',
                description: '',
                price_label: '',
                price_period: '/ month',
                features: '',
                cta: 'Buy Now',
                is_popular: '0',
                sort_order: 0,
                is_visible: '1',
                name_ar: '',
                description_ar: '',
                features_ar: '',
                cta_ar: '',
                price_label_ar: '',
                price_period_ar: '',
            });
        }
    }, [isOpen, pricingPlan, isEditing]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => onClose(),
            preserveScroll: true,
        };

        if (isEditing && pricingPlan) {
            post(route('dashboard.pricing-plans.update', pricingPlan.id), options);
        } else {
            post(route('dashboard.pricing-plans.store'), options);
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
                    <DialogTitle>{isEditing ? 'Edit Pricing Plan' : 'Create New Pricing Plan'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Update the details for this plan.' : 'Fill in the details for the new plan.'}
                    </DialogDescription>
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

                <form onSubmit={handleSubmit}>
                    {langTab === 'en' ? (
                        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} className="col-span-3" />
                                <InputError message={errors.name} className="col-span-4 col-start-2" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="handle" className="text-right">Handle</Label>
                                <Input id="handle" value={data.handle} onChange={e => setData('handle', e.target.value)} className="col-span-3" placeholder="e.g. basic-plan" />
                                <InputError message={errors.handle} className="col-span-4 col-start-2" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">Description (English)</Label>
                                <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} className="col-span-3" rows={2} />
                                <InputError message={errors.description} className="col-span-4 col-start-2" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price_label" className="text-right">Price Label</Label>
                                <Input id="price_label" value={data.price_label} onChange={e => setData('price_label', e.target.value)} className="col-span-3" placeholder="$XXX" />
                                <InputError message={errors.price_label} className="col-span-4 col-start-2" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price_period" className="text-right">Price Period</Label>
                                <Input id="price_period" value={data.price_period} onChange={e => setData('price_period', e.target.value)} className="col-span-3" placeholder="/ month" />
                                <InputError message={errors.price_period} className="col-span-4 col-start-2" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="cta" className="text-right">CTA Button</Label>
                                <Input id="cta" value={data.cta} onChange={e => setData('cta', e.target.value)} className="col-span-3" placeholder="Buy Now" />
                                <InputError message={errors.cta} className="col-span-4 col-start-2" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="features" className="text-right">Features</Label>
                                <Textarea id="features" value={data.features} onChange={e => setData('features', e.target.value)} className="col-span-3 font-mono text-xs" rows={6} placeholder='["Feature 1", "Feature 2"]' />
                                <InputError message={errors.features} className="col-span-4 col-start-2" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="sort_order" className="text-right">Order</Label>
                                <Input id="sort_order" type="number" value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} className="col-span-3" />
                                <InputError message={errors.sort_order} className="col-span-4 col-start-2" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Popular</Label>
                                <Select value={data.is_popular} onValueChange={v => setData('is_popular', v)}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Popular</SelectItem>
                                        <SelectItem value="0">Not Popular</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.is_popular} className="col-span-4 col-start-2" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Visible</Label>
                                <Select value={data.is_visible} onValueChange={v => setData('is_visible', v)}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Visible</SelectItem>
                                        <SelectItem value="0">Hidden</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.is_visible} className="col-span-4 col-start-2" />
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name_ar" className="text-right">الاسم (عربي)</Label>
                                <Input id="name_ar" value={data.name_ar} onChange={e => setData('name_ar', e.target.value)} className="col-span-3 font-arabic" dir="rtl" />
                                <InputError message={errors.name_ar} className="col-span-4 col-start-2" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description_ar" className="text-right">الوصف (عربي)</Label>
                                <Textarea id="description_ar" value={data.description_ar} onChange={e => setData('description_ar', e.target.value)} className="col-span-3 font-arabic" dir="rtl" rows={2} />
                                <InputError message={errors.description_ar} className="col-span-4 col-start-2" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price_label_ar" className="text-right">سعر (عربي)</Label>
                                <Input id="price_label_ar" value={data.price_label_ar} onChange={e => setData('price_label_ar', e.target.value)} className="col-span-3 font-arabic" dir="rtl" placeholder="مثلاً: اتصل بنا" />
                                <InputError message={errors.price_label_ar} className="col-span-4 col-start-2" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price_period_ar" className="text-right">الفترة (عربي)</Label>
                                <Input id="price_period_ar" value={data.price_period_ar} onChange={e => setData('price_period_ar', e.target.value)} className="col-span-3 font-arabic" dir="rtl" placeholder="/ شهرياً" />
                                <InputError message={errors.price_period_ar} className="col-span-4 col-start-2" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="cta_ar" className="text-right">زر الإجراء (عربي)</Label>
                                <Input id="cta_ar" value={data.cta_ar} onChange={e => setData('cta_ar', e.target.value)} className="col-span-3 font-arabic" dir="rtl" placeholder="اشتري الآن" />
                                <InputError message={errors.cta_ar} className="col-span-4 col-start-2" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="features_ar" className="text-right">الميزات (عربي)</Label>
                                <Textarea id="features_ar" value={data.features_ar} onChange={e => setData('features_ar', e.target.value)} className="col-span-3 font-mono text-xs" rows={6} placeholder='["ميزة 1", "ميزة 2"]' />
                                <InputError message={errors.features_ar} className="col-span-4 col-start-2" />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
                        <Button type="submit" disabled={processing}>{processing ? 'Saving...' : 'Save'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
