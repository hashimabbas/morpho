<?php

namespace Database\Seeders;

use App\Models\CoreValue;
use Illuminate\Database\Seeder;

class CoreValueSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'icon' => 'zap',
                'title' => 'Innovation',
                'description' => 'Integrating the latest technologies for superior performance and market needs.',
                'title_ar' => 'الابتكار',
                'description_ar' => 'دمج أحدث التقنيات لتحقيق أداء متميز وتلبية احتياجات السوق.',
                'sort_order' => 1,
            ],
            [
                'icon' => 'shield-check',
                'title' => 'Trust & Security',
                'description' => 'Ensuring product safety and quality throughout the supply chain with precise tools.',
                'title_ar' => 'الثقة والأمان',
                'description_ar' => 'ضمان سلامة وجودة المنتجات عبر سلسلة التوريد بأدوات دقيقة.',
                'sort_order' => 2,
            ],
            [
                'icon' => 'leaf',
                'title' => 'Sustainability',
                'description' => 'Adopting smart solutions that reduce waste and protect the environment.',
                'title_ar' => 'الاستدامة',
                'description_ar' => 'اعتماد حلول ذكية تقلل الهدر وتحافظ على البيئة.',
                'sort_order' => 3,
            ],
            [
                'icon' => 'target',
                'title' => 'Professionalism & Efficiency',
                'description' => 'Delivering flexible, results-oriented solutions with dedication and intelligence.',
                'title_ar' => 'الاحترافية والكفاءة',
                'description_ar' => 'تقديم حلول مرنة تركز على النتائج بتفانٍ وذكاء.',
                'sort_order' => 4,
            ],
            [
                'icon' => 'handshake',
                'title' => 'Transparency',
                'description' => 'Absolute transparency in collaboration with our clients and partners.',
                'title_ar' => 'الشفافية',
                'description_ar' => 'شفافية مطلقة في التعاون مع عملائنا وشركائنا.',
                'sort_order' => 5,
            ],
        ];

        foreach ($items as $item) {
            CoreValue::create($item);
        }
    }
}
