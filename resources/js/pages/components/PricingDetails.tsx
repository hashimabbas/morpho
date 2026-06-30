import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import PricingInquiryDialog from './PricingInquiryDialog';

interface PricingPlan {
    id: number;
    name: string;
    handle: string;
    price_label: string;
    price_period: string;
    description: string;
    features: string[];
    cta: string;
    is_popular: boolean;
    sort_order: number;
    is_visible: boolean;
}

interface ComparisonFeature {
    id: number;
    feature_name: string;
    plan_mappings: Record<string, boolean>;
    sort_order: number;
}

const FeatureCheck = ({ enabled }: { enabled: boolean }) => {
    return enabled ? (
        <Check className="h-5 w-5 text-[#0097b2]" />
    ) : (
        <X className="h-5 w-5 text-muted-foreground/50" />
    );
};

export default function PricingDetails() {
    const { __, locale } = useTranslation();
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [comparisonFeatures, setComparisonFeatures] = useState<ComparisonFeature[]>([]);
    const [loading, setLoading] = useState(true);

    const [inquiryOpen, setInquiryOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<{ name: string; handle: string }>({ name: '', handle: '' });

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const [plansRes, featuresRes] = await Promise.all([
                    fetch('/api/pricing-plans'),
                    fetch('/api/pricing-comparison-features'),
                ]);
                const plansData = await plansRes.json();
                const featuresData = await featuresRes.json();
                setPlans(plansData);
                setComparisonFeatures(featuresData);
            } catch (error) {
                console.error('Failed to load pricing data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [locale]);

    const openInquiry = (plan: PricingPlan) => {
        setSelectedPlan({ name: plan.name, handle: plan.handle });
        setInquiryOpen(true);
    };

    if (loading) {
        return (
            <div className="bg-background">
                <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-20 lg:px-8">
                    <div className="text-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0097b2] border-t-transparent mx-auto" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background">
            <PricingInquiryDialog
                isOpen={inquiryOpen}
                onClose={() => setInquiryOpen(false)}
                planName={selectedPlan.name}
                planHandle={selectedPlan.handle}
            />
            <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-20 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                        {__('pricing.hero.heading')}
                    </h1>
                    <p className="mt-4 text-xl text-muted-foreground">
                        {__('pricing.hero.subheading')}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
                    {plans.map((plan) => (
                        <Card key={plan.handle} className={`relative flex flex-col ${plan.is_popular ? 'border-[#0097b2] shadow-2xl' : 'border-border'}`}>
                            {plan.is_popular && (
                                <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                                    <span className="bg-[#0097b2] text-white px-4 py-1 rounded-full text-sm font-semibold">
                                        {__('pricing.badge.most_popular')}
                                    </span>
                                </div>
                            )}
                            <CardHeader className="pt-10">
                                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="mb-6">
                                    <span className="text-4xl font-extrabold text-foreground">{plan.price_label}</span>
                                    {plan.price_period && (
                                        <span className="text-lg font-medium text-muted-foreground">{plan.price_period}</span>
                                    )}
                                </div>
                                <ul className="space-y-4">
                                    {plan.features?.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-[#0097b2] flex-shrink-0 mt-1" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={() => openInquiry(plan)}
                                    className={`w-full ${plan.is_popular
                                        ? 'bg-[#0097b2] text-white hover:bg-[#007c92]'
                                        : 'bg-[#e6f5f8] text-[#007c92] hover:bg-opacity-80'
                                        }`}
                                    size="lg"
                                >
                                    {plan.cta}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {comparisonFeatures.length > 0 && plans.length > 0 && (
                    <div className="mt-24">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            {__('pricing.comparison.heading')}
                        </h2>
                        <div className="overflow-x-auto rounded-lg border">
                            <table className="min-w-full divide-y divide-border text-sm">
                                <thead className="bg-[#e6f5f8]">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left font-semibold text-[#007c92]">{__('pricing.comparison.feature_header')}</th>
                                        {plans.map((plan, idx) => (
                                            <th
                                                key={plan.handle}
                                                scope="col"
                                                className={`w-40 px-6 py-4 text-center font-semibold text-[#007c92] ${idx > 0 && idx < plans.length - 1 ? 'border-x border-border' : ''} ${idx === 1 ? 'border-x border-border' : ''}`}
                                            >
                                                {plan.name.replace(' Plan', '')}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {comparisonFeatures.map((feature) => (
                                        <tr key={feature.id} className="hover:bg-[#e6f5f8]/50">
                                            <td className="px-6 py-4 font-medium text-foreground">{feature.feature_name}</td>
                                            {plans.map((plan, idx) => (
                                                <td key={plan.handle} className={`px-6 py-4 ${idx === 1 ? 'border-x border-border' : ''}`}>
                                                    <div className="flex justify-center">
                                                        <FeatureCheck enabled={feature.plan_mappings[plan.handle] ?? false} />
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
