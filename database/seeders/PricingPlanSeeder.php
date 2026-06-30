<?php

namespace Database\Seeders;

use App\Models\PricingPlan;
use App\Models\PricingComparisonFeature;
use Illuminate\Database\Seeder;

class PricingPlanSeeder extends Seeder
{
    public function run(): void
    {
        PricingPlan::updateOrCreate(['handle' => 'basic-plan'], [
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
            'name_ar' => 'الخطة الأساسية',
            'description_ar' => 'مثالية للشركات الناشئة التي تحتاج إلى تتبع أساسي للشحنات.',
            'price_label_ar' => '$XXX',
            'price_period_ar' => '/ شهرياً',
            'features_ar' => [
                'الأجهزة المدعومة: مورفو بدون RFID',
                'نطاق التتبع (درجة الحرارة والرطوبة): البيئة الخارجية فقط',
                'النطاق الجغرافي: 10 أمتار',
                'تنبيهات ذكية (درجة الحرارة والرطوبة)',
                'حتى 5 أجهزة (غير متضمنة)',
                'دعم فني جزئي',
                'يشمل تدريب على النظام والأجهزة',
            ],
            'cta_ar' => 'اشتري الآن',
        ]);

        PricingPlan::updateOrCreate(['handle' => 'premium-plan'], [
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
            'name_ar' => 'الخطة المميزة',
            'description_ar' => 'للشركات المتنامية التي تحتاج إلى تتبع متقدم ودعم شامل.',
            'price_label_ar' => '$YYY',
            'price_period_ar' => '/ شهرياً',
            'features_ar' => [
                'الأجهزة المدعومة: مورفو مع RFID',
                'نطاق التتبع (درجة الحرارة والرطوبة): تتبع داخل الشحنة',
                'النطاق الجغرافي: 10 أمتار',
                'تتبع متقدم وتنبيهات ذكية',
                'من 5 إلى 15 جهازاً (غير متضمنة)',
                'دعم فني شامل',
                'يشمل تدريب على النظام والأجهزة',
            ],
            'cta_ar' => 'ابدأ الآن',
        ]);

        PricingPlan::updateOrCreate(['handle' => 'enterprise-plan'], [
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
            'name_ar' => 'خطة المؤسسات',
            'description_ar' => 'حلول مخصصة بالكامل للمؤسسات الكبيرة ذات المتطلبات الفريدة.',
            'price_label_ar' => 'اتصل بنا',
            'price_period_ar' => '',
            'features_ar' => [
                'الأجهزة المدعومة: قابلة للتخصيص (تتبع ذكي)',
                'نطاق التتبع (درجة الحرارة والرطوبة): قابل للتخصيص',
                'النطاق الجغرافي: قابل للتخصيص',
                'الميزات: حسب الطلب',
                'عدد الأجهزة: قابل للتخصيص',
                'الدعم والتدريب: قابل للتخصيص',
                'ميزات متقدمة وتكاملات مخصصة',
            ],
            'cta_ar' => 'اتصل بالمبيعات',
        ]);

        $comparisonFeatures = [
            ['feature_name' => 'Supports Multiple Tracking Devices', 'feature_name_ar' => 'يدعم أجهزة تتبع متعددة', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 1],
            ['feature_name' => 'Supports Refrigerated & Dry Shipments', 'feature_name_ar' => 'يدعم الشحنات المبردة والجافة', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 2],
            ['feature_name' => 'Live Shipment Tracking', 'feature_name_ar' => 'تتبع مباشر للشحنات', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 3],
            ['feature_name' => 'Instant Alerts for Issues', 'feature_name_ar' => 'تنبيهات فورية للمشكلات', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 4],
            ['feature_name' => 'Detailed Dashboard', 'feature_name_ar' => 'لوحة تحكم مفصلة', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 5],
            ['feature_name' => 'User-Friendly Interface', 'feature_name_ar' => 'واجهة سهلة الاستخدام', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 6],
            ['feature_name' => 'Email Alerts', 'feature_name_ar' => 'تنبيهات البريد الإلكتروني', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 7],
            ['feature_name' => 'Shipment Sorting & Filtering', 'feature_name_ar' => 'فرز وتصفية الشحنات', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 8],
            ['feature_name' => 'Weekly & Monthly Reports', 'feature_name_ar' => 'تقارير أسبوعية وشهرية', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 9],
            ['feature_name' => 'Phone Support', 'feature_name_ar' => 'دعم هاتفي', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 10],
            ['feature_name' => 'User Onboarding & Training', 'feature_name_ar' => 'تدريب المستخدمين', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 11],
            ['feature_name' => 'Multiple User Accounts', 'feature_name_ar' => 'حسابات مستخدمين متعددة', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 12],
            ['feature_name' => 'SMS Alerts', 'feature_name_ar' => 'تنبيهات SMS', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 13],
            ['feature_name' => 'Share Data with Clients', 'feature_name_ar' => 'مشاركة البيانات مع العملاء', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => true, 'enterprise-plan' => true], 'sort_order' => 14],
            ['feature_name' => 'ERP System Integration', 'feature_name_ar' => 'التكامل مع أنظمة ERP', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => false, 'enterprise-plan' => true], 'sort_order' => 15],
            ['feature_name' => 'Custom On-Demand Reports', 'feature_name_ar' => 'تقارير مخصصة حسب الطلب', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => false, 'enterprise-plan' => true], 'sort_order' => 16],
            ['feature_name' => 'API Access for Integration', 'feature_name_ar' => 'الوصول إلى API للتكامل', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => false, 'enterprise-plan' => true], 'sort_order' => 17],
            ['feature_name' => 'Data Storage up to 3 Months', 'feature_name_ar' => 'تخزين البيانات حتى 3 أشهر', 'plan_mappings' => ['basic-plan' => true, 'premium-plan' => true, 'enterprise-plan' => false], 'sort_order' => 18],
            ['feature_name' => 'Data Storage up to 6 Months', 'feature_name_ar' => 'تخزين البيانات حتى 6 أشهر', 'plan_mappings' => ['basic-plan' => false, 'premium-plan' => false, 'enterprise-plan' => true], 'sort_order' => 19],
        ];

        foreach ($comparisonFeatures as $feature) {
            PricingComparisonFeature::updateOrCreate(
                ['feature_name' => $feature['feature_name']],
                $feature
            );
        }
    }
}
