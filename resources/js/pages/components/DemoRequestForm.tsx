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
import { CheckCircle, XCircle } from "lucide-react";

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Props {
    successMessage?: string;
}

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
                setDialogDescription(successMessage ?? "Your demo request has been submitted successfully.");
                setIsSuccess(true);
                setShowDialog(true);
                reset();
            },
            onError: (errors) => {
                setDialogTitle("Something went wrong");
                // You can join all errors into one string
                setDialogDescription(Object.values(errors).join("\n"));
                setIsSuccess(false);
                setShowDialog(true);
            }
        });
    }

    return (
        <div>
            {wasSuccessful && successMessage && (
                <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <div className={`flex items-center gap-2 ${isSuccess ? "text-green-600" : "text-red-600"}`}>
                                {isSuccess ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                                <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                            </div>
                            <AlertDialogDescription className="whitespace-pre-line">
                                {dialogDescription}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction onClick={() => setShowDialog(false)}>
                                OK
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                        id="full_name"
                        type="text"
                        value={data.full_name}
                        onChange={(e) => setData('full_name', e.target.value)}
                        required
                        placeholder="Your full name"
                    />
                    {errors.full_name && <p className="text-sm text-destructive">{errors.full_name}</p>}
                </div>

                {/* Company */}
                <div className="space-y-2">
                    <Label htmlFor="company_name">Company / Organization</Label>
                    <Input
                        id="company_name"
                        type="text"
                        value={data.company_name}
                        onChange={(e) => setData('company_name', e.target.value)}
                        required
                        placeholder="Company name"
                    />
                    {errors.company_name && <p className="text-sm text-destructive">{errors.company_name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        placeholder="you@company.com"
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                        placeholder="e.g. +968 9000 0000"
                    />
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                {/* Logistics Sector */}
                <div className="space-y-2">
                    <Label>Logistics Sector</Label>
                    <RadioGroup
                        value={data.logistics_sector}
                        onValueChange={(val) => setData('logistics_sector', val)}
                    >
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2">
                                <RadioGroupItem value="medical" /> Medical / Pharmaceutical
                            </label>
                            <label className="flex items-center gap-2">
                                <RadioGroupItem value="industrial" /> Industrial
                            </label>
                            <label className="flex items-center gap-2">
                                <RadioGroupItem value="food" /> Food & Cold Chain
                            </label>
                            <label className="flex items-center gap-2">
                                <RadioGroupItem value="agricultural" /> Agricultural
                            </label>
                            <label className="flex items-center gap-2">
                                <RadioGroupItem value="other" /> Other
                            </label>
                        </div>
                    </RadioGroup>
                    {errors.logistics_sector && <p className="text-sm text-destructive">{errors.logistics_sector}</p>}
                </div>

                {/* Solution Type */}
                <div className="space-y-2">
                    <Label>Required Solution</Label>
                    <RadioGroup
                        value={data.solution_type}
                        onValueChange={(val) => setData('solution_type', val)}
                    >
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2">
                                <RadioGroupItem value="iot-device" /> Morpho IoT Tracking Device
                            </label>
                            <label className="flex items-center gap-2">
                                <RadioGroupItem value="shipment-platform" /> Shipment Tracking & Management Platform
                            </label>
                            <label className="flex items-center gap-2">
                                <RadioGroupItem value="wms" /> Warehouse Management System (WMS)
                            </label>
                            <label className="flex items-center gap-2">
                                <RadioGroupItem value="tms" /> Transportation Management System (TMS)
                            </label>
                            <label className="flex items-center gap-2">
                                <RadioGroupItem value="api" /> API Integration / Interfaces
                            </label>
                        </div>
                    </RadioGroup>
                    {errors.solution_type && <p className="text-sm text-destructive">{errors.solution_type}</p>}
                </div>

                {/* Demo Objective */}
                <div className="space-y-2">
                    <Label>Demo Objective</Label>
                    <RadioGroup
                        value={data.demo_goal}
                        onValueChange={(val) => setData('demo_goal', val)}
                    >
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2">
                                <RadioGroupItem value="trial" /> Try the solution before purchase
                            </label>
                            <label className="flex items-center gap-2">
                                <RadioGroupItem value="evaluation" /> Evaluate performance and features
                            </label>
                            <label className="flex items-center gap-2">
                                <RadioGroupItem value="partnership" /> Explore technology partnership
                            </label>
                            <label className="flex items-center gap-2">
                                <RadioGroupItem value="comparison" /> Compare with other solutions
                            </label>
                        </div>
                    </RadioGroup>
                    {errors.demo_goal && <p className="text-sm text-destructive">{errors.demo_goal}</p>}
                </div>

                <Button type="submit" disabled={processing} className="w-full">
                    {processing ? 'Submitting...' : 'Submit Request'}
                </Button>
            </form>
        </div>
    );
}
