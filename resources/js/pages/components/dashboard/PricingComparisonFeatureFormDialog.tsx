import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from './input-error';

type PricingPlan = {
    id: number;
    name: string;
    handle: string;
};

type PricingComparisonFeature = {
    id: number;
    feature_name: string;
    plan_mappings: Record<string, boolean>;
    sort_order: number;
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    comparisonFeature?: PricingComparisonFeature | null;
    plans: PricingPlan[];
}

export default function PricingComparisonFeatureFormDialog({ isOpen, onClose, comparisonFeature, plans }: Props) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST',
        feature_name: '',
        plan_mappings: {} as Record<string, boolean>,
        sort_order: 0,
    });

    const isEditing = !!comparisonFeature;

    useEffect(() => {
        if (isOpen && isEditing && comparisonFeature) {
            setData({
                _method: 'PATCH',
                feature_name: comparisonFeature.feature_name || '',
                plan_mappings: comparisonFeature.plan_mappings || {},
                sort_order: comparisonFeature.sort_order || 0,
            });
        } else if (isOpen) {
            const defaultMappings: Record<string, boolean> = {};
            plans.forEach(plan => {
                defaultMappings[plan.handle] = false;
            });
            setData({
                _method: 'POST',
                feature_name: '',
                plan_mappings: defaultMappings,
                sort_order: 0,
            });
        }
    }, [isOpen, comparisonFeature, isEditing, plans]);

    const handleTogglePlan = (handle: string, checked: boolean) => {
        setData('plan_mappings', {
            ...data.plan_mappings,
            [handle]: checked,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => onClose(),
            preserveScroll: true,
        };

        if (isEditing && comparisonFeature) {
            post(route('dashboard.pricing-comparison-features.update', comparisonFeature.id), options);
        } else {
            post(route('dashboard.pricing-comparison-features.store'), options);
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
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Comparison Feature' : 'New Comparison Feature'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Update the comparison feature details.' : 'Add a new feature for the comparison table.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4 px-1">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="feature_name" className="text-right">Feature Name</Label>
                            <Input id="feature_name" value={data.feature_name} onChange={e => setData('feature_name', e.target.value)} className="col-span-3" />
                            <InputError message={errors.feature_name} className="col-span-4 col-start-2" />
                        </div>

                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right pt-1">Available In</Label>
                            <div className="col-span-3 space-y-3">
                                {plans.map(plan => (
                                    <div key={plan.handle} className="flex items-center gap-3">
                                        <Checkbox
                                            id={`plan-${plan.handle}`}
                                            checked={data.plan_mappings[plan.handle] ?? false}
                                            onCheckedChange={(checked) => handleTogglePlan(plan.handle, checked === true)}
                                        />
                                        <Label htmlFor={`plan-${plan.handle}`} className="text-sm font-medium cursor-pointer">
                                            {plan.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                            <InputError message={errors.plan_mappings} className="col-span-4 col-start-2" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sort_order" className="text-right">Order</Label>
                            <Input id="sort_order" type="number" value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} className="col-span-3" />
                            <InputError message={errors.sort_order} className="col-span-4 col-start-2" />
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
