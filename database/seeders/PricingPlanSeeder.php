<?php

namespace Database\Seeders;

use App\Models\PricingPlan;
use App\Models\PricingComparisonFeature;
use Illuminate\Database\Seeder;

class PricingPlanSeeder extends Seeder
{
    public function run(): void
    {
        PricingPlan::create([
            'name' => 'Basic Plan',
            'handle' => 'basic-plan',
            'price_label' => '$XXX',
            'price_period' => '/ month',
            'description' => 'Ideal for startups and businesses with basic shipment tracking needs.',
            'features' => [
                'Supported Devices: Morpho without RFID',
                'Tracking Scope (Temp & Humidity): External environment only',
                'Geographic Range: 10 meters',
                'Smart Alerts (Temperature & Humidity)',
                'Up to 5 devices (not included)',
                'Partial technical support',
                'Includes system and device training',
            ],
            'cta' => 'Buy Now',
            'is_popular' => false,
            'sort_order' => 1,
            'is_visible' => true,
        ]);

        PricingPlan::create([
            'name' => 'Premium Plan',
            'handle' => 'premium-plan',
            'price_label' => '$YYY',
            'price_period' => '/ month',
            'description' => 'For growing companies needing advanced tracking and comprehensive support.',
            'features' => [
                'Supported Devices: Morpho with RFID',
                'Tracking Scope (Temp & Humidity): In-shipment tracking',
                'Geographic Range: 10 meters',
                'Advanced tracking and smart alerts',
                'From 5 to 15 devices (not included)',
                'Comprehensive technical support',
                'Includes system and device training',
            ],
            'cta' => 'Get Started',
            'is_popular' => true,
            'sort_order' => 2,
            'is_visible' => true,
        ]);

        PricingPlan::create([
            'name' => 'Enterprise Plan',
            'handle' => 'enterprise-plan',
            'price_label' => 'Contact Us',
            'price_period' => '',
            'description' => 'Fully customized solutions for large enterprises with unique requirements.',
            'features' => [
                'Supported Devices: Customizable (SMART TRACKING)',
                'Tracking Scope (Temp & Humidity): Customizable',
                'Geographic Range: Customizable',
                'Features: On-demand',
                'Number of Devices: Customizable',
                'Support & Training: Customizable',
                'Advanced features and custom integrations',
            ],
            'cta' => 'Contact Sales',
            'is_popular' => false,
            'sort_order' => 3,
            'is_visible' => true,
        ]);

        $comparisonFeatures = [
            ['feature_name' => 'Supports Multiple Tracking Devices', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 1],
            ['feature_name' => 'Supports Refrigerated & Dry Shipments', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 2],
            ['feature_name' => 'Live Shipment Tracking', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 3],
            ['feature_name' => 'Instant Alerts for Issues', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 4],
            ['feature_name' => 'Detailed Dashboard', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 5],
            ['feature_name' => 'User-Friendly Interface', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 6],
            ['feature_name' => 'Email Alerts', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 7],
            ['feature_name' => 'Shipment Sorting & Filtering', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 8],
            ['feature_name' => 'Weekly & Monthly Reports', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 9],
            ['feature_name' => 'Phone Support', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 10],
            ['feature_name' => 'User Onboarding & Training', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 11],
            ['feature_name' => 'Multiple User Accounts', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 12],
            ['feature_name' => 'SMS Alerts', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 13],
            ['feature_name' => 'Share Data with Clients', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 14],
            ['feature_name' => 'ERP System Integration', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => false, 'enterprise-plan' => true], 'sort_order' => 15],
            ['feature_name' => 'Custom On-Demand Reports', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => false, 'enterprise-plan' => true], 'sort_order' => 16],
            ['feature_name' => 'API Access for Integration', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => false, 'enterprise-plan' => true], 'sort_order' => 17],
            ['feature_name' => 'Data Storage up to 3 Months', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => false], 'sort_order' => 18],
            ['feature_name' => 'Data Storage up to 6 Months', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => false, 'enterprise-plan' => true], 'sort_order' => 19],
        ];

        foreach ($comparisonFeatures as $feature) {
            PricingComparisonFeature::create($feature);
        }
    }
}
