import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import PricingComparisonFeatureFormDialog from '../components/dashboard/PricingComparisonFeatureFormDialog';

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
    created_at: string;
};

interface PaginatedFeatures {
    data: PricingComparisonFeature[];
}

interface Props {
    comparisonFeatures: PaginatedFeatures;
    plans: PricingPlan[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard.index') },
    { title: 'Comparison Features', href: route('dashboard.pricing-comparison-features.index') },
];

export default function PricingComparisonFeatures({ comparisonFeatures, plans }: Props) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingFeature, setEditingFeature] = useState<PricingComparisonFeature | null>(null);

    const openCreateForm = () => {
        setEditingFeature(null);
        setIsFormOpen(true);
    };

    const openEditForm = (feature: PricingComparisonFeature) => {
        setEditingFeature(feature);
        setIsFormOpen(true);
    };

    const handleDelete = (feature: PricingComparisonFeature) => {
        if (confirm(`Are you sure you want to delete "${feature.feature_name}"?`)) {
            router.delete(route('dashboard.pricing-comparison-features.destroy', feature.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pricing Comparison Features" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Comparison Features</CardTitle>
                            <CardDescription>Manage features shown in the pricing comparison table.</CardDescription>
                        </div>
                        <Button onClick={openCreateForm}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Feature
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Feature</TableHead>
                                    {plans.map(plan => (
                                        <TableHead key={plan.handle} className="text-center">{plan.name}</TableHead>
                                    ))}
                                    <TableHead>Order</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {comparisonFeatures.data.length > 0 ? (
                                    comparisonFeatures.data.map((feature) => (
                                        <TableRow key={feature.id}>
                                            <TableCell className="font-medium">{feature.feature_name}</TableCell>
                                            {plans.map(plan => (
                                                <TableCell key={plan.handle} className="text-center">
                                                    {feature.plan_mappings[plan.handle] ? (
                                                        <Check className="h-5 w-5 text-[#0097b2] inline" />
                                                    ) : (
                                                        <X className="h-5 w-5 text-muted-foreground/50 inline" />
                                                    )}
                                                </TableCell>
                                            ))}
                                            <TableCell>{feature.sort_order}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => openEditForm(feature)}>
                                                            <Pencil className="mr-2 h-4 w-4" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDelete(feature)} className="text-destructive">
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={plans.length + 3} className="h-24 text-center">
                                            No comparison features found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <PricingComparisonFeatureFormDialog
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                comparisonFeature={editingFeature}
                plans={plans}
            />
        </AppLayout>
    );
}
