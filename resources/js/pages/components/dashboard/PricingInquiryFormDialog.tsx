import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
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
};

type PricingInquiry = {
    id: number;
    full_name: string;
    company_name: string;
    email: string;
    phone: string;
    interested_plan_handle: string;
    interested_plan_name: string;
    message: string | null;
    is_read: boolean;
    created_at: string;
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    inquiry?: PricingInquiry | null;
    plans: PricingPlan[];
}

export default function PricingInquiryFormDialog({ isOpen, onClose, inquiry, plans }: Props) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST',
        full_name: '',
        company_name: '',
        email: '',
        phone: '',
        interested_plan_handle: '',
        interested_plan_name: '',
        message: '',
    });

    const isViewing = !!inquiry && inquiry.id > 0;
    const isCreating = !inquiry;

    useEffect(() => {
        if (isOpen && isViewing && inquiry) {
            setData({
                _method: 'POST',
                full_name: inquiry.full_name,
                company_name: inquiry.company_name,
                email: inquiry.email,
                phone: inquiry.phone,
                interested_plan_handle: inquiry.interested_plan_handle,
                interested_plan_name: inquiry.interested_plan_name,
                message: inquiry.message || '',
            });
        } else if (isOpen && isCreating) {
            setData({
                _method: 'POST',
                full_name: '',
                company_name: '',
                email: '',
                phone: '',
                interested_plan_handle: '',
                interested_plan_name: '',
                message: '',
            });
        }
    }, [isOpen, inquiry, isViewing, isCreating]);

    const handlePlanChange = (handle: string) => {
        const plan = plans.find(p => p.handle === handle);
        setData({
            ...data,
            interested_plan_handle: handle,
            interested_plan_name: plan?.name || '',
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => onClose(),
            preserveScroll: true,
        };
        post(route('dashboard.pricing-inquiries.store'), options);
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
                    <DialogTitle>{isViewing ? 'Inquiry Details' : 'Create Pricing Inquiry'}</DialogTitle>
                    <DialogDescription>
                        {isViewing
                            ? `Submitted by ${inquiry?.full_name} on ${inquiry?.created_at ? new Date(inquiry.created_at).toLocaleDateString() : 'N/A'}`
                            : 'Manually add a pricing inquiry on behalf of a client.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="pif-full_name" className="text-right">Full Name</Label>
                            <Input id="pif-full_name" value={data.full_name} onChange={e => setData('full_name', e.target.value)} className="col-span-3" readOnly={isViewing} />
                            <InputError message={errors.full_name} className="col-span-4 col-start-2" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="pif-company" className="text-right">Company</Label>
                            <Input id="pif-company" value={data.company_name} onChange={e => setData('company_name', e.target.value)} className="col-span-3" readOnly={isViewing} />
                            <InputError message={errors.company_name} className="col-span-4 col-start-2" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="pif-email" className="text-right">Email</Label>
                            <Input id="pif-email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="col-span-3" readOnly={isViewing} />
                            <InputError message={errors.email} className="col-span-4 col-start-2" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="pif-phone" className="text-right">Phone</Label>
                            <Input id="pif-phone" type="tel" value={data.phone} onChange={e => setData('phone', e.target.value)} className="col-span-3" readOnly={isViewing} />
                            <InputError message={errors.phone} className="col-span-4 col-start-2" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Plan</Label>
                            {isViewing ? (
                                <Input value={data.interested_plan_name} className="col-span-3" readOnly />
                            ) : (
                                <>
                                    <Select value={data.interested_plan_handle} onValueChange={handlePlanChange}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a plan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {plans.map(plan => (
                                                <SelectItem key={plan.handle} value={plan.handle}>{plan.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.interested_plan_handle} className="col-span-4 col-start-2" />
                                </>
                            )}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="pif-message" className="text-right">Message</Label>
                            <Textarea id="pif-message" value={data.message} onChange={e => setData('message', e.target.value)} className="col-span-3" rows={3} readOnly={isViewing} />
                            <InputError message={errors.message} className="col-span-4 col-start-2" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={handleClose}>
                            {isViewing ? 'Close' : 'Cancel'}
                        </Button>
                        {!isViewing && (
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save'}
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
