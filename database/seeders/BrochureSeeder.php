<?php

namespace Database\Seeders;

use App\Models\Brochure;
use Illuminate\Database\Seeder;

class BrochureSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'name' => 'Cold Chain Logistics',
                'description' => 'Precision temperature and humidity tracking for sensitive goods.',
                'name_ar' => 'خدمات سلسلة التبريد',
                'description_ar' => 'تتبع دقيق لدرجة الحرارة والرطوبة للبضائع الحساسة.',
                'file' => '1.pdf',
                'image_url' => '/images/solutions/cold.png',
                'sort_order' => 1,
            ],
            [
                'name' => 'Agriculture IoT',
                'description' => 'Smart sensors for soil and crop health optimization.',
                'name_ar' => 'الزراعة الذكية',
                'description_ar' => 'أجهزة استشعار ذكية لتحسين صحة التربة والمحاصيل.',
                'file' => '2.pdf',
                'image_url' => '/images/Agriculture-1.png',
                'sort_order' => 2,
            ],
            [
                'name' => 'Warehouse Monitoring',
                'description' => 'Smart solutions for monitoring warehouses and supply chains.',
                'name_ar' => 'مراقبة المستودعات',
                'description_ar' => 'حلول ذكية لمراقبة المستودعات وسلاسل التوريد.',
                'file' => '5.pdf',
                'image_url' => '/images/solutions/warehousing.png',
                'sort_order' => 3,
            ],
            [
                'name' => 'Livestock Tracking',
                'description' => 'Real-time health and location monitoring for livestock.',
                'name_ar' => 'تتبع الماشية',
                'description_ar' => 'مراقبة فورية للصحة والموقع للماشية.',
                'file' => '3.pdf',
                'image_url' => '/images/Livestock-1.png',
                'sort_order' => 4,
            ],
            [
                'name' => 'Maritime Security',
                'description' => 'Advanced security and tracking for maritime assets.',
                'name_ar' => 'الأمن البحري',
                'description_ar' => 'أمان متقدم وتتبع للأصول البحرية.',
                'file' => '4.pdf',
                'image_url' => '/images/Marine-1.png',
                'sort_order' => 5,
            ],
        ];

        foreach ($items as $item) {
            Brochure::create($item);
        }
    }
}
