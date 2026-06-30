import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEffect, useState } from "react";
import {
    CheckCircle,
    XCircle,
    User,
    Building2,
    Mail,
    Phone,
    MessageSquare,
    Send
} from "lucide-react";
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    planName: string;
    planHandle: string;
    successMessage?: string;
}

export default function PricingInquiryDialog({ isOpen, onClose, planName, planHandle, successMessage }: Props) {
    const { __ } = useTranslation();
    const [showResultDialog, setShowResultDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogDescription, setDialogDescription] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset, hasErrors } = useForm({
        full_name: '',
        company_name: '',
        email: '',
        phone: '',
        interested_plan_handle: planHandle,
        interested_plan_name: planName,
        message: '',
    });

    useEffect(() => {
        if (isOpen) {
            setData('interested_plan_handle', planHandle);
            setData('interested_plan_name', planName);
        }
    }, [isOpen, planHandle, planName]);

    useEffect(() => {
        if (hasErrors) {
            console.error('Validation Errors:', errors);
        }
    }, [errors, hasErrors]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('pricing.inquiry.store'), {
            onSuccess: () => {
                setDialogTitle(__('pricing.inquiry.success_title'));
                setDialogDescription(successMessage ?? __('pricing.inquiry.success_desc'));
                setIsSuccess(true);
                setShowResultDialog(true);
                reset();
                onClose();
            },
            onError: (errors) => {
                setDialogTitle(__('pricing.inquiry.error_title'));
                setDialogDescription(Object.values(errors).join("\n"));
                setIsSuccess(false);
                setShowResultDialog(true);
            }
        });
    }

    const handleDialogClose = () => {
        if (!processing) {
            reset();
            onClose();
        }
    };

    return (
        <>
            <AlertDialog open={showResultDialog} onOpenChange={setShowResultDialog}>
                <AlertDialogContent className="rounded-2xl border-none p-0 overflow-hidden bg-white dark:bg-gray-900">
                    <div className={cn(
                        "h-2 w-full",
                        isSuccess ? "bg-green-500" : "bg-red-500"
                    )} />
                    <div className="p-8 text-center">
                        <div className={cn(
                            "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full",
                            isSuccess ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        )}>
                            {isSuccess ? <CheckCircle className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
                        </div>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                                {dialogTitle}
                            </AlertDialogTitle>
                            <AlertDialogDescription className="mt-4 text-lg text-gray-600 dark:text-gray-400 whitespace-pre-line">
                                {dialogDescription}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-8">
                            <AlertDialogAction
                                onClick={() => setShowResultDialog(false)}
                                className={cn(
                                    "w-full rounded-xl py-6 text-base font-bold text-white transition-all hover:scale-[1.02]",
                                    isSuccess ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                                )}
                            >
                                {__('pricing.inquiry.continue')}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={isOpen} onOpenChange={handleDialogClose}>
                <DialogContent className="sm:max-w-[500px] rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            {__('pricing.inquiry.title')} <span className="text-[#0097b2]">{planName}</span>
                        </DialogTitle>
                        <DialogDescription className="text-base">
                            {__('pricing.inquiry.description')}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="group space-y-2">
                                <Label htmlFor="pi-full_name" className="text-sm font-bold">{__('pricing.inquiry.full_name')}</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#0097b2]" />
                                    <Input
                                        id="pi-full_name"
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        required
                                        placeholder={__('pricing.inquiry.full_name_placeholder')}
                                        className="pl-11 h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0097b2]/20 dark:border-gray-800 dark:bg-gray-900/50"
                                    />
                                </div>
                                {errors.full_name && <p className="text-sm text-red-500">{errors.full_name}</p>}
                            </div>

                            <div className="group space-y-2">
                                <Label htmlFor="pi-company" className="text-sm font-bold">{__('pricing.inquiry.company')}</Label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#0097b2]" />
                                    <Input
                                        id="pi-company"
                                        value={data.company_name}
                                        onChange={(e) => setData('company_name', e.target.value)}
                                        required
                                        placeholder={__('pricing.inquiry.company_placeholder')}
                                        className="pl-11 h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0097b2]/20 dark:border-gray-800 dark:bg-gray-900/50"
                                    />
                                </div>
                                {errors.company_name && <p className="text-sm text-red-500">{errors.company_name}</p>}
                            </div>

                            <div className="group space-y-2">
                                <Label htmlFor="pi-email" className="text-sm font-bold">{__('pricing.inquiry.email')}</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#0097b2]" />
                                    <Input
                                        id="pi-email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        placeholder={__('pricing.inquiry.email_placeholder')}
                                        className="pl-11 h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0097b2]/20 dark:border-gray-800 dark:bg-gray-900/50"
                                    />
                                </div>
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>

                            <div className="group space-y-2">
                                <Label htmlFor="pi-phone" className="text-sm font-bold">{__('pricing.inquiry.phone')}</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#0097b2]" />
                                    <Input
                                        id="pi-phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        required
                                        placeholder={__('pricing.inquiry.phone_placeholder')}
                                        className="pl-11 h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0097b2]/20 dark:border-gray-800 dark:bg-gray-900/50"
                                    />
                                </div>
                                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className="group space-y-2">
                            <Label htmlFor="pi-message" className="text-sm font-bold">{__('pricing.inquiry.message')}</Label>
                            <div className="relative">
                                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-[#0097b2]" />
                                <Textarea
                                    id="pi-message"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    placeholder={__('pricing.inquiry.message_placeholder')}
                                    className="pl-11 min-h-[100px] rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0097b2]/20 dark:border-gray-800 dark:bg-gray-900/50"
                                />
                            </div>
                            {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                        </div>

                        <Button
                            type="submit"
                            disabled={processing}
                            className="group w-full h-14 rounded-2xl bg-[#0097b2] text-lg font-bold text-white transition-all hover:bg-[#007c92] hover:scale-[1.01] active:translate-y-0.5"
                        >
                            {processing ? (
                                <div className="flex items-center gap-3">
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    {__('pricing.inquiry.submitting')}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <Send className="h-5 w-5" />
                                    {__('pricing.inquiry.send')}
                                </div>
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
