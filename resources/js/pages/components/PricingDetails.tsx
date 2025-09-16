import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import React from 'react';

// --- Data remains the same ---
const pricingPlans = [
    {
        name: 'Basic Plan',
        handle: 'basic-plan',
        price: '$XXX',
        pricePeriod: '/ month',
        description: 'Ideal for startups and businesses with basic shipment tracking needs.',
        features: [
            'Supported Devices: Morpho without RFID',
            'Tracking Scope (Temp & Humidity): External environment only',
            'Geographic Range: 10 meters',
            'Smart Alerts (Temperature & Humidity)',
            'Up to 5 devices (not included)',
            'Partial technical support',
            'Includes system and device training',
        ],
        cta: 'Buy Now',
        isPopular: false,
    },
    {
        name: 'Premium Plan',
        handle: 'premium-plan',
        price: '$YYY',
        pricePeriod: '/ month',
        description: 'For growing companies needing advanced tracking and comprehensive support.',
        features: [
            'Supported Devices: Morpho with RFID',
            'Tracking Scope (Temp & Humidity): In-shipment tracking',
            'Geographic Range: 10 meters',
            'Advanced tracking and smart alerts',
            'From 5 to 15 devices (not included)',
            'Comprehensive technical support',
            'Includes system and device training',
        ],
        cta: 'Get Started',
        isPopular: true,
    },
    {
        name: 'Enterprise Plan',
        handle: 'enterprise-plan',
        price: 'Contact Us',
        pricePeriod: '',
        description: 'Fully customized solutions for large enterprises with unique requirements.',
        features: [
            'Supported Devices: Customizable (SMART TRACKING)',
            'Tracking Scope (Temp & Humidity): Customizable',
            'Geographic Range: Customizable',
            'Features: On-demand',
            'Number of Devices: Customizable',
            'Support & Training: Customizable',
            'Advanced features and custom integrations',
        ],
        cta: 'Contact Sales',
        isPopular: false,
    },
];

const comparisonFeatures = [
    { name: 'Supports Multiple Tracking Devices', basic: true, premium: true, enterprise: true },
    { name: 'Supports Refrigerated & Dry Shipments', basic: true, premium: true, enterprise: true },
    { name: 'Live Shipment Tracking', basic: true, premium: true, enterprise: true },
    { name: 'Instant Alerts for Issues', basic: true, premium: true, enterprise: true },
    { name: 'Detailed Dashboard', basic: true, premium: true, enterprise: true },
    { name: 'User-Friendly Interface', basic: true, premium: true, enterprise: true },
    { name: 'Email Alerts', basic: true, premium: true, enterprise: true },
    { name: 'Shipment Sorting & Filtering', basic: true, premium: true, enterprise: true },
    { name: 'Weekly & Monthly Reports', basic: false, premium: true, enterprise: true },
    { name: 'Phone Support', basic: false, premium: true, enterprise: true },
    { name: 'User Onboarding & Training', basic: false, premium: true, enterprise: true },
    { name: 'Multiple User Accounts', basic: false, premium: true, enterprise: true },
    { name: 'SMS Alerts', basic: false, premium: true, enterprise: true },
    { name: 'Share Data with Clients', basic: false, premium: true, enterprise: true },
    { name: 'ERP System Integration', basic: false, premium: false, enterprise: true },
    { name: 'Custom On-Demand Reports', basic: false, premium: false, enterprise: true },
    { name: 'API Access for Integration', basic: false, premium: false, enterprise: true },
    { name: 'Data Storage up to 3 Months', basic: true, premium: true, enterprise: false },
    { name: 'Data Storage up to 6 Months', basic: false, premium: false, enterprise: true },
];

// Helper component for check/cross icons, now uses the brand color directly
const FeatureCheck = ({ enabled }: { enabled: boolean }) => {
    return enabled ? (
        <Check className="h-5 w-5 text-[#0097b2]" />
    ) : (
        <X className="h-5 w-5 text-muted-foreground/50" />
    );
};

// Main Component
export default function PricingDetails() {
    return (
        <div className="bg-background">
            <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-20 lg:px-8">
                {/* --- Header Section --- */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                        Find the Perfect Plan for Your Business
                    </h1>
                    <p className="mt-4 text-xl text-muted-foreground">
                        Simple, transparent pricing. Choose the plan that fits your needs.
                    </p>
                </div>

                {/* --- Pricing Cards Section --- */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
                    {pricingPlans.map((plan) => (
                        <Card key={plan.handle} className={`relative flex flex-col ${plan.isPopular ? 'border-[#0097b2] shadow-2xl' : 'border-border'}`}>
                            {plan.isPopular && (
                                <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                                    <span className="bg-[#0097b2] text-white px-4 py-1 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </span>
                                </div>
                            )}
                            <CardHeader className="pt-10">
                                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="mb-6">
                                    <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                                    <span className="text-lg font-medium text-muted-foreground">{plan.pricePeriod}</span>
                                </div>
                                <ul className="space-y-4">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-[#0097b2] flex-shrink-0 mt-1" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className={`w-full ${plan.isPopular
                                        ? 'bg-[#0097b2] text-white hover:bg-[#007c92]' // Main brand colors for the popular plan
                                        : 'bg-[#e6f5f8] text-[#007c92] hover:bg-opacity-80' // Light brand colors for other plans
                                        }`}
                                    size="lg"
                                >
                                    {plan.cta}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* --- Feature Comparison Table Section --- */}
                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Detailed Feature Comparison
                    </h2>
                    <div className="overflow-x-auto rounded-lg border">
                        <table className="min-w-full divide-y divide-border text-sm">
                            <thead className="bg-[#e6f5f8]">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left font-semibold text-[#007c92]">Feature</th>
                                    <th scope="col" className="w-40 px-6 py-4 text-center font-semibold text-[#007c92]">Basic</th>
                                    <th scope="col" className="w-40 px-6 py-4 text-center font-semibold text-[#007c92] border-x border-border">Premium</th>
                                    <th scope="col" className="w-40 px-6 py-4 text-center font-semibold text-[#007c92]">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {comparisonFeatures.map((feature) => (
                                    <tr key={feature.name} className="hover:bg-[#e6f5f8]/50"> {/* Using light brand color with 50% opacity on hover */}
                                        <td className="px-6 py-4 font-medium text-foreground">{feature.name}</td>
                                        <td className="px-6 py-4"><div className="flex justify-center"><FeatureCheck enabled={feature.basic} /></div></td>
                                        <td className="px-6 py-4 border-x border-border"><div className="flex justify-center"><FeatureCheck enabled={feature.premium} /></div></td>
                                        <td className="px-6 py-4"><div className="flex justify-center"><FeatureCheck enabled={feature.enterprise} /></div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
