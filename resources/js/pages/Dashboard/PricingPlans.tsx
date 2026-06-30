import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Pencil, Trash2, Star } from 'lucide-react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import PricingPlanFormDialog from '../components/dashboard/PricingPlanFormDialog';

interface PricingPlan {
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
    created_at: string;
}

interface PaginatedPlans {
    data: PricingPlan[];
}

interface Props {
    pricingPlans: PaginatedPlans;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard.index') },
    { title: 'Pricing Plans', href: route('dashboard.pricing-plans.index') },
];

export default function PricingPlans({ pricingPlans }: Props) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

    const openCreateForm = () => {
        setEditingPlan(null);
        setIsFormOpen(true);
    };

    const openEditForm = (plan: PricingPlan) => {
        setEditingPlan(plan);
        setIsFormOpen(true);
    };

    const handleDelete = (plan: PricingPlan) => {
        if (confirm(`Are you sure you want to delete "${plan.name}"?`)) {
            router.delete(route('dashboard.pricing-plans.destroy', plan.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pricing Plans Management" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Pricing Plans Management</CardTitle>
                            <CardDescription>Manage pricing plans displayed on the Pricing page.</CardDescription>
                        </div>
                        <Button onClick={openCreateForm}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Plan
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Plan (EN)</TableHead>
                                        <TableHead>Plan (AR)</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead className="hidden md:table-cell">CTA</TableHead>
                                        <TableHead>Order</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="hidden sm:table-cell">Created</TableHead>
                                        <TableHead><span className="sr-only">Actions</span></TableHead>
                                    </TableRow>
                                </TableHeader>
                            <TableBody>
                                {pricingPlans.data.length > 0 ? (
                                    pricingPlans.data.map((plan) => (
                                        <TableRow key={plan.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    {plan.name}
                                                    {plan.is_popular && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-arabic" dir="rtl">{plan.name_ar || <span className="text-muted-foreground italic">—</span>}</TableCell>
                                            <TableCell>
                                                {plan.price_label}
                                                <span className="text-muted-foreground text-sm">{plan.price_period}</span>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">{plan.cta}</TableCell>
                                            <TableCell>{plan.sort_order}</TableCell>
                                            <TableCell>
                                                {plan.is_visible ? (
                                                    <Badge variant="outline" className="text-green-600">Visible</Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-muted-foreground">Hidden</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                {format(new Date(plan.created_at), 'MMM dd, yyyy')}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => openEditForm(plan)}>
                                                            <Pencil className="mr-2 h-4 w-4" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDelete(plan)} className="text-destructive">
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            No pricing plans found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <PricingPlanFormDialog
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                pricingPlan={editingPlan}
            />
        </AppLayout>
    );
}
