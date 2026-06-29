<?php

namespace Database\Seeders;

use App\Models\CorePurpose;
use Illuminate\Database\Seeder;

class CorePurposeSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'type' => 'vision',
                'icon' => '/icons/vision.png',
                'title' => 'Our Vision',
                'description' => 'To become the leading provider of smart solutions and Internet of Things (IoT) technologies in the Gulf and the Middle East by transforming industries through intelligent monitoring, sustainability, regulatory compliance, asset protection, and strengthening trust for organizations and stakeholders.',
                'subtitle' => 'Our vision sets the destination, and our mission paves the way—uniting innovation and reliability to redefine the future of logistics.',
                'title_ar' => 'رؤيتنا',
                'description_ar' => 'أن نصبح المزود الرائد للحلول الذكية وتقنيات إنترنت الأشياء في الخليج والشرق الأوسط من خلال تحويل الصناعات عبر المراقبة الذكية والاستدامة والامتثال التنظيمي وحماية الأصول وتعزيز الثقة للمؤسسات وأصحاب المصلحة.',
                'subtitle_ar' => 'تحدد رؤيتنا الوجهة، وتمهد رسالتنا الطريق — لنجمع بين الابتكار والموثوقية لإعادة تعريف مستقبل الخدمات اللوجستية.',
                'sort_order' => 0,
            ],
            [
                'type' => 'mission',
                'icon' => '/icons/mission.png',
                'title' => 'Our Mission',
                'description' => 'Empowering organizations with complete visibility, enabling smart and proactive decision-making, and providing full control over supply chains, livestock, agriculture, warehouses, and maritime assets—transforming traditional operations into intelligent, connected, and sustainable systems.',
                'subtitle' => null,
                'title_ar' => 'رسالتنا',
                'description_ar' => 'تمكين المؤسسات برؤية كاملة، وتمكين اتخاذ القرارات الذكية والاستباقية، وتوفير السيطرة الكاملة على سلاسل التوريد والثروة الحيوانية والزراعة والمستودعات والأصول البحرية — لتحويل العمليات التقليدية إلى أنظمة ذكية ومتصلة ومستدامة.',
                'subtitle_ar' => null,
                'sort_order' => 1,
            ],
        ];

        foreach ($items as $item) {
            CorePurpose::updateOrCreate(
                ['type' => $item['type']],
                $item
            );
        }
    }
}
