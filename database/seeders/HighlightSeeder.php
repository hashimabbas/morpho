<?php

namespace Database\Seeders;

use App\Models\Highlight;
use Illuminate\Database\Seeder;

class HighlightSeeder extends Seeder
{
    public function run(): void
    {
        $highlights = [
            [
                'icon' => 'thermometer',
                'title' => 'High-Precision Temperature Monitoring',
                'description' => 'Continuous, accurate temperature tracking for sensitive shipments, ensuring product integrity throughout the cold chain.',
                'title_ar' => 'مراقبة دقيقة لدرجة الحرارة',
                'description_ar' => 'تتبع مستمر ودقيق لدرجة حرارة الشحنات الحساسة، مما يضمن سلامة المنتج طوال سلسلة التبريد.',
                'sort_order' => 0,
            ],
            [
                'icon' => 'droplets',
                'title' => 'Humidity & Pressure Monitoring',
                'description' => 'Real-time humidity and atmospheric pressure monitoring to detect environmental deviations that may compromise cargo quality.',
                'title_ar' => 'مراقبة الرطوبة والضغط',
                'description_ar' => 'مراقبة فورية للرطوبة والضغط الجوي للكشف عن الانحرافات البيئية التي قد تؤثر على جودة الشحنة.',
                'sort_order' => 1,
            ],
            [
                'icon' => 'activity',
                'title' => 'Shock, Vibration & Tilt Detection',
                'description' => 'Advanced sensors detect impacts, vibrations, and tilt events, providing visibility into handling conditions during transit.',
                'title_ar' => 'كشف الصدمات والاهتزازات والميل',
                'description_ar' => 'أجهزة استشعار متقدمة تكتشف الصدمات والاهتزازات والميل، مما يوفر رؤية واضحة لظروف المناولة أثناء النقل.',
                'sort_order' => 2,
            ],
            [
                'icon' => 'shield-ban',
                'title' => 'Tamper & Door Opening Detection',
                'description' => 'Instant alerts when doors are opened or tampering is detected, preventing unauthorized access and cargo theft.',
                'title_ar' => 'كشف العبث وفتح الأبواب',
                'description_ar' => 'تنبيهات فورية عند فتح الأبواب أو اكتشاف أي عبث، لمنع الوصول غير المصرح به وسرقة الشحنات.',
                'sort_order' => 3,
            ],
            [
                'icon' => 'map-pin',
                'title' => 'Real-Time Geolocation Tracking',
                'description' => 'GPS-enabled satellite tracking provides precise location data for shipments, even in remote and cross-border routes.',
                'title_ar' => 'تتبع الموقع الجغرافي الفوري',
                'description_ar' => 'تتبع عبر الأقمار الصناعية مزود بتقنية GPS يوفر بيانات دقيقة عن موقع الشحنات، حتى في الطرق النائية وعبر الحدود.',
                'sort_order' => 4,
            ],
            [
                'icon' => 'bell',
                'title' => 'Instant Alerts & Notifications',
                'description' => 'Automated alerts for any breach of predefined thresholds, enabling proactive intervention before damage occurs.',
                'title_ar' => 'تنبيهات وإشعارات فورية',
                'description_ar' => 'تنبيهات آلية لأي تجاوز للحدود المحددة مسبقاً، مما يتيح التدخل الاستباقي قبل حدوث الضرر.',
                'sort_order' => 5,
            ],
            [
                'icon' => 'file-text',
                'title' => 'Legally Compliant Digital Reports',
                'description' => 'Regulatory-ready digital reports that demonstrate compliance, accountability, and chain-of-custody for audits and claims.',
                'title_ar' => 'تقارير رقمية متوافقة قانونياً',
                'description_ar' => 'تقارير رقمية جاهزة للجهات التنظيمية تثبت الامتثال والمساءلة وسلسلة الحفظ لعمليات التدقيق والمطالبات.',
                'sort_order' => 6,
            ],
            [
                'icon' => 'eye',
                'title' => 'Real-Time Visibility',
                'description' => 'End-to-end visibility across the entire supply chain — from dispatch to delivery — enabling proactive decision-making.',
                'title_ar' => 'رؤية فورية',
                'description_ar' => 'رؤية شاملة لسلسلة التوريد بأكملها — من الشحن إلى التسليم — مما يتيح اتخاذ قرارات استباقية.',
                'sort_order' => 7,
            ],
            [
                'icon' => 'navigation',
                'title' => 'Intelligent Tracking',
                'description' => 'GPS-enabled satellite tracking with smart sensors providing precise location and condition data, even in remote cross-border routes.',
                'title_ar' => 'تتبع ذكي',
                'description_ar' => 'تتبع عبر الأقمار الصناعية مزود بأجهزة استشعار ذكية توفر بيانات دقيقة عن الموقع والظروف، حتى في الطرق النائية عبر الحدود.',
                'sort_order' => 8,
            ],
            [
                'icon' => 'chart-line',
                'title' => 'Data-Driven Decision Making',
                'description' => 'Advanced analytics and AI-powered insights transform raw sensor data into actionable intelligence for operational excellence.',
                'title_ar' => 'اتخاذ القرارات بناءً على البيانات',
                'description_ar' => 'تحليلات متقدمة ورؤى مدعومة بالذكاء الاصطناعي تحول بيانات الاستشعار الخام إلى معلومات قابلة للتنفيذ لتحقيق التميز التشغيلي.',
                'sort_order' => 9,
            ],
            [
                'icon' => 'zap',
                'title' => 'Operational Optimization',
                'description' => 'Reduce waste, lower costs, and maximize efficiency through automated monitoring, predictive alerts, and streamlined compliance.',
                'title_ar' => 'تحسين العمليات التشغيلية',
                'description_ar' => 'تقليل الهدر وخفض التكاليف وزيادة الكفاءة من خلال المراقبة الآلية والتنبيهات التنبؤية والامتثال المبسط.',
                'sort_order' => 10,
            ],
        ];

        foreach ($highlights as $highlight) {
            Highlight::updateOrCreate(
                ['title' => $highlight['title']],
                $highlight
            );
        }
    }
}
