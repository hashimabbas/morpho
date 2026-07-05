<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use App\Models\PortfolioImage;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'title' => 'Cold Chain Monitoring for Pharmaceutical Distribution',
                'title_ar' => 'مراقبة سلسلة التبريد لتوزيع الأدوية',
                'slug' => 'cold-chain-pharmaceutical-distribution',
                'date' => '2026-05-15',
                'description' => 'Implementation of advanced temperature and humidity monitoring system for a leading pharmaceutical distributor in Oman, ensuring integrity of sensitive medical supplies throughout the supply chain.',
                'description_ar' => 'تنفيذ نظام متقدم لمراقبة درجة الحرارة والرطوبة لموزع أدوية رائد في عمان، لضمان سلامة الإمدادات الطبية الحساسة عبر سلسلة التوريد.',
                'cover_image' => 'https://placehold.co/800x500/00A9C1/FFFFFF?text=Cold+Chain+Pharma',
                'is_visible' => true,
                'sort_order' => 1,
                'images' => [
                    ['image' => 'https://placehold.co/1200x800/00A9C1/FFFFFF?text=Monitoring+Device+Installation', 'is_cover' => false],
                    ['image' => 'https://placehold.co/1200x800/0EA5E9/FFFFFF?text=Temperature+Data+Dashboard', 'is_cover' => false],
                    ['image' => 'https://placehold.co/1200x800/10B981/FFFFFF?text=Storage+Facility+Audit', 'is_cover' => true],
                    ['image' => 'https://placehold.co/1200x800/F59E0B/FFFFFF?text=Team+Training+Session', 'is_cover' => false],
                ],
            ],
            [
                'title' => 'GPS Fleet Tracking for Logistics Company',
                'title_ar' => 'تتبع أسطول بالGPS لشركة لوجستية',
                'slug' => 'gps-fleet-tracking-logistics',
                'date' => '2026-04-20',
                'description' => 'Deployment of real-time GPS tracking devices across a fleet of 150 vehicles, enabling live location monitoring, route optimization, and fuel consumption analysis.',
                'description_ar' => 'نشر أجهزة تتبع GPS فورية عبر أسطول مكون من 150 مركبة، مما يتيح مراقبة المواقع الحية وتحسين المسارات وتحليل استهلاك الوقود.',
                'cover_image' => 'https://placehold.co/800x500/0EA5E9/FFFFFF?text=GPS+Fleet+Tracking',
                'is_visible' => true,
                'sort_order' => 2,
                'images' => [
                    ['image' => 'https://placehold.co/1200x800/0EA5E9/FFFFFF?text=Fleet+Dashboard+Overview', 'is_cover' => true],
                    ['image' => 'https://placehold.co/1200x800/00A9C1/FFFFFF?text=GPS+Device+Installation', 'is_cover' => false],
                    ['image' => 'https://placehold.co/1200x800/8B5CF6/FFFFFF?text=Route+Optimization+Map', 'is_cover' => false],
                ],
            ],
            [
                'title' => 'Security Camera Installation at Industrial Facility',
                'title_ar' => 'تركيب كاميرات مراقبة في منشأة صناعية',
                'slug' => 'security-camera-industrial-facility',
                'date' => '2026-03-10',
                'description' => 'Complete CCTV and access control system installation for a large industrial facility, featuring 48 cameras, centralized monitoring, and AI-powered threat detection.',
                'description_ar' => 'تركيب نظام كامل لكاميرات المراقبة والتحكم في الدخول لمنشأة صناعية كبيرة، يضم 48 كاميرا ومراقبة مركزية وكشف ذكي عن التهديدات.',
                'cover_image' => 'https://placehold.co/800x500/10B981/FFFFFF?text=Security+Cameras',
                'is_visible' => true,
                'sort_order' => 3,
                'images' => [
                    ['image' => 'https://placehold.co/1200x800/10B981/FFFFFF?text=Control+Room+Setup', 'is_cover' => true],
                    ['image' => 'https://placehold.co/1200x800/00A9C1/FFFFFF?text=Camera+Installation+Team', 'is_cover' => false],
                    ['image' => 'https://placehold.co/1200x800/F59E0B/FFFFFF?text=Security+System+Testing', 'is_cover' => false],
                    ['image' => 'https://placehold.co/1200x800/0EA5E9/FFFFFF?text=Access+Control+System', 'is_cover' => false],
                    ['image' => 'https://placehold.co/1200x800/8B5CF6/FFFFFF?text=Night+Vision+Demo', 'is_cover' => false],
                ],
            ],
            [
                'title' => 'Smart Agriculture IoT Deployment',
                'title_ar' => 'نشر إنترنت الأشياء للزراعة الذكية',
                'slug' => 'smart-agriculture-iot',
                'date' => '2026-02-18',
                'description' => 'Implementation of soil moisture sensors, weather stations, and automated irrigation control for a 500-hectare farm, resulting in 30% water consumption reduction.',
                'description_ar' => 'تنفيذ أجهزة استشعار رطوبة التربة ومحطات الطقس والتحكم الآلي في الري لمزرعة مساحتها 500 هكتار، مما أدى إلى خفض استهلاك المياه بنسبة 30%.',
                'cover_image' => 'https://placehold.co/800x500/F59E0B/FFFFFF?text=Smart+Agriculture',
                'is_visible' => true,
                'sort_order' => 4,
                'images' => [
                    ['image' => 'https://placehold.co/1200x800/F59E0B/FFFFFF?text=Soil+Sensor+Installation', 'is_cover' => true],
                    ['image' => 'https://placehold.co/1200x800/00A9C1/FFFFFF?text=Weather+Station+Setup', 'is_cover' => false],
                    ['image' => 'https://placehold.co/1200x800/10B981/FFFFFF?text=Irrigation+Control+System', 'is_cover' => false],
                ],
            ],
            [
                'title' => 'Warehouse Automation & Monitoring',
                'title_ar' => 'أتمتة ومراقبة المستودعات',
                'slug' => 'warehouse-automation-monitoring',
                'date' => '2026-01-25',
                'description' => 'End-to-end warehouse monitoring solution including temperature control, inventory tracking, and security integration for a 10,000 sqm logistics hub.',
                'description_ar' => 'حل متكامل لمراقبة المستودعات يشمل التحكم في درجة الحرارة وتتبع المخزون وتكامل الأمن لمركز لوجستي بمساحة 10,000 متر مربع.',
                'cover_image' => 'https://placehold.co/800x500/8B5CF6/FFFFFF?text=Warehouse+Automation',
                'is_visible' => true,
                'sort_order' => 5,
                'images' => [
                    ['image' => 'https://placehold.co/1200x800/8B5CF6/FFFFFF?text=Warehouse+Sensors+Grid', 'is_cover' => true],
                    ['image' => 'https://placehold.co/1200x800/00A9C1/FFFFFF?text=Inventory+Tracking+Dashboard', 'is_cover' => false],
                    ['image' => 'https://placehold.co/1200x800/0EA5E9/FFFFFF?text=Temperature+Zones+Map', 'is_cover' => false],
                    ['image' => 'https://placehold.co/1200x800/10B981/FFFFFF?text=Security+Integration+Panel', 'is_cover' => false],
                ],
            ],
        ];

        foreach ($items as $item) {
            $images = $item['images'];
            unset($item['images']);

            $portfolio = Portfolio::create($item);

            foreach ($images as $index => $img) {
                PortfolioImage::create([
                    'portfolio_id' => $portfolio->id,
                    'image' => $img['image'],
                    'is_cover' => $img['is_cover'],
                    'sort_order' => $index,
                ]);
            }
        }
    }
}
