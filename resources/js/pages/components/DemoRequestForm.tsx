import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import {
    CheckCircle,
    XCircle,
    User,
    Building2,
    Mail,
    Phone,
    Stethoscope,
    Factory,
    Ship,
    Sprout,
    Box,
    Cpu,
    Globe,
    Warehouse,
    Truck,
    Zap,
    PlayCircle,
    ClipboardCheck,
    Handshake,
    BarChart3,
    ArrowRight,
    ChevronRight
} from "lucide-react";

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface Props {
    successMessage?: string;
}

const SelectableCard = ({
    icon: Icon,
    label,
    value,
    selectedValue,
    onSelect,
    error
}: {
    icon: any;
    label: string;
    value: string;
    selectedValue: string;
    onSelect: (val: string) => void;
    error?: string;
}) => {
    const isSelected = selectedValue === value;
    return (
        <label
            onClick={() => onSelect(value)}
            className={cn(
                "group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-4 text-center transition-all duration-300",
                isSelected
                    ? "border-morpho bg-morpho/5 shadow-md"
                    : "border-gray-100 bg-white hover:border-morpho/30 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-morpho/30"
            )}
        >
            <RadioGroupItem value={value} className="sr-only" />
            <div className={cn(
                "mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300",
                isSelected
                    ? "bg-morpho text-white"
                    : "bg-gray-100 text-gray-500 group-hover:bg-morpho/10 group-hover:text-morpho dark:bg-gray-800"
            )}>
                <Icon className="h-5 w-5" />
            </div>
            <span className={cn(
                "text-xs font-bold uppercase tracking-wider transition-colors duration-300",
                isSelected ? "text-morpho" : "text-gray-500 dark:text-gray-400"
            )}>
                {label}
            </span>
            {isSelected && (
                <div className="absolute right-2 top-2">
                    <CheckCircle className="h-4 w-4 text-morpho" />
                </div>
            )}
        </label>
    );
};

export default function DemoRequestForm({ successMessage }: Props) {
    const [showDialog, setShowDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogDescription, setDialogDescription] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset, wasSuccessful, hasErrors } = useForm({
        full_name: '',
        company_name: '',
        email: '',
        phone: '',
        logistics_sector: '',
        solution_type: '',
        demo_goal: '',
    });

    useEffect(() => {
        if (hasErrors) {
            console.error('Validation Errors:', errors);
        }
    }, [errors, hasErrors]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('demo.store'), {
            onSuccess: () => {
                setDialogTitle("Success!");
                setDialogDescription(successMessage ?? "Your demo request has been submitted successfully. Our team will contact you shortly.");
                setIsSuccess(true);
                setShowDialog(true);
                reset();
            },
            onError: (errors) => {
                setDialogTitle("Something went wrong");
                setDialogDescription(Object.values(errors).join("\n"));
                setIsSuccess(false);
                setShowDialog(true);
            }
        });
    }

    return (
        <div className="relative">
            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
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
                                onClick={() => setShowDialog(false)}
                                className={cn(
                                    "w-full rounded-xl py-6 text-base font-bold text-white transition-all hover:scale-[1.02]",
                                    isSuccess ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                                )}
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            <form onSubmit={handleSubmit} className="space-y-12">
                {/* --- Section 1: Identity --- */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-morpho text-xs font-bold text-white uppercase tracking-wider">
                            01
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Basic Information</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="group space-y-2">
                            <Label htmlFor="full_name" className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                Full Name
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-morpho" />
                                <Input
                                    id="full_name"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                    required
                                    placeholder="John Doe"
                                    className="pl-11 h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-morpho/20 dark:border-gray-800 dark:bg-gray-900/50 dark:focus:bg-gray-900"
                                />
                            </div>
                            {errors.full_name && <p className="text-sm text-red-500">{errors.full_name}</p>}
                        </div>

                        <div className="group space-y-2">
                            <Label htmlFor="company_name" className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                Company Name
                            </Label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-morpho" />
                                <Input
                                    id="company_name"
                                    value={data.company_name}
                                    onChange={(e) => setData('company_name', e.target.value)}
                                    required
                                    placeholder="Morpho Tech"
                                    className="pl-11 h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-morpho/20 dark:border-gray-800 dark:bg-gray-900/50 dark:focus:bg-gray-900"
                                />
                            </div>
                            {errors.company_name && <p className="text-sm text-red-500">{errors.company_name}</p>}
                        </div>

                        <div className="group space-y-2">
                            <Label htmlFor="email" className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-morpho" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    placeholder="you@company.com"
                                    className="pl-11 h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-morpho/20 dark:border-gray-800 dark:bg-gray-900/50 dark:focus:bg-gray-900"
                                />
                            </div>
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div className="group space-y-2">
                            <Label htmlFor="phone" className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                Phone Number
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-morpho" />
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    required
                                    placeholder="+968 1234 5678"
                                    className="pl-11 h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-morpho/20 dark:border-gray-800 dark:bg-gray-900/50 dark:focus:bg-gray-900"
                                />
                            </div>
                            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                        </div>
                    </div>
                </div>

                {/* --- Section 2: Industry & Solution --- */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-morpho text-xs font-bold text-white uppercase tracking-wider">
                            02
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Industry Details</h3>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">Logistics Sector</Label>
                            <RadioGroup
                                value={data.logistics_sector}
                                onValueChange={(val) => setData('logistics_sector', val)}
                                className="grid grid-cols-2 gap-4 md:grid-cols-5"
                            >
                                <SelectableCard icon={Stethoscope} label="Medical" value="medical" selectedValue={data.logistics_sector} onSelect={(v) => setData('logistics_sector', v)} />
                                <SelectableCard icon={Factory} label="Industrial" value="industrial" selectedValue={data.logistics_sector} onSelect={(v) => setData('logistics_sector', v)} />
                                <SelectableCard icon={Ship} label="Food & Cold" value="food" selectedValue={data.logistics_sector} onSelect={(v) => setData('logistics_sector', v)} />
                                <SelectableCard icon={Sprout} label="Agricultural" value="agricultural" selectedValue={data.logistics_sector} onSelect={(v) => setData('logistics_sector', v)} />
                                <SelectableCard icon={Box} label="Other" value="other" selectedValue={data.logistics_sector} onSelect={(v) => setData('logistics_sector', v)} />
                            </RadioGroup>
                            {errors.logistics_sector && <p className="text-sm text-red-500">{errors.logistics_sector}</p>}
                        </div>

                        <div className="space-y-4">
                            <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">Required Solution</Label>
                            <RadioGroup
                                value={data.solution_type}
                                onValueChange={(val) => setData('solution_type', val)}
                                className="grid grid-cols-2 gap-4 md:grid-cols-5"
                            >
                                <SelectableCard icon={Cpu} label="IoT Device" value="iot-device" selectedValue={data.solution_type} onSelect={(v) => setData('solution_type', v)} />
                                <SelectableCard icon={Globe} label="Tracking" value="shipment-platform" selectedValue={data.solution_type} onSelect={(v) => setData('solution_type', v)} />
                                <SelectableCard icon={Warehouse} label="WMS" value="wms" selectedValue={data.solution_type} onSelect={(v) => setData('solution_type', v)} />
                                <SelectableCard icon={Truck} label="TMS" value="tms" selectedValue={data.solution_type} onSelect={(v) => setData('solution_type', v)} />
                                <SelectableCard icon={Zap} label="API" value="api" selectedValue={data.solution_type} onSelect={(v) => setData('solution_type', v)} />
                            </RadioGroup>
                            {errors.solution_type && <p className="text-sm text-red-500">{errors.solution_type}</p>}
                        </div>
                    </div>
                </div>

                {/* --- Section 3: Goals --- */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-morpho text-xs font-bold text-white uppercase tracking-wider">
                            03
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Demo Objectives</h3>
                    </div>

                    <div className="space-y-4">
                        <RadioGroup
                            value={data.demo_goal}
                            onValueChange={(val) => setData('demo_goal', val)}
                            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                        >
                            <SelectableCard icon={PlayCircle} label="Try Solution" value="trial" selectedValue={data.demo_goal} onSelect={(v) => setData('demo_goal', v)} />
                            <SelectableCard icon={ClipboardCheck} label="Evaluate" value="evaluation" selectedValue={data.demo_goal} onSelect={(v) => setData('demo_goal', v)} />
                            <SelectableCard icon={Handshake} label="Partnership" value="partnership" selectedValue={data.demo_goal} onSelect={(v) => setData('demo_goal', v)} />
                            <SelectableCard icon={BarChart3} label="Comparison" value="comparison" selectedValue={data.demo_goal} onSelect={(v) => setData('demo_goal', v)} />
                        </RadioGroup>
                        {errors.demo_goal && <p className="text-sm text-red-500">{errors.demo_goal}</p>}
                    </div>
                </div>

                {/* Submit Action */}
                <div className="pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="group w-full h-14 rounded-2xl bg-morpho text-lg font-bold text-white transition-all hover:bg-morpho-dark hover:scale-[1.01] active:translate-y-0.5"
                    >
                        {processing ? (
                            <div className="flex items-center gap-3">
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                Submitting...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                Submit Request
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </div>
                        )}
                    </Button>

                </div>
            </form>
        </div>
    );
}

