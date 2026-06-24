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
                'sort_order' => 0,
            ],
            [
                'icon' => 'droplets',
                'title' => 'Humidity & Pressure Monitoring',
                'description' => 'Real-time humidity and atmospheric pressure monitoring to detect environmental deviations that may compromise cargo quality.',
                'sort_order' => 1,
            ],
            [
                'icon' => 'activity',
                'title' => 'Shock, Vibration & Tilt Detection',
                'description' => 'Advanced sensors detect impacts, vibrations, and tilt events, providing visibility into handling conditions during transit.',
                'sort_order' => 2,
            ],
            [
                'icon' => 'shield-ban',
                'title' => 'Tamper & Door Opening Detection',
                'description' => 'Instant alerts when doors are opened or tampering is detected, preventing unauthorized access and cargo theft.',
                'sort_order' => 3,
            ],
            [
                'icon' => 'map-pin',
                'title' => 'Real-Time Geolocation Tracking',
                'description' => 'GPS-enabled satellite tracking provides precise location data for shipments, even in remote and cross-border routes.',
                'sort_order' => 4,
            ],
            [
                'icon' => 'bell',
                'title' => 'Instant Alerts & Notifications',
                'description' => 'Automated alerts for any breach of predefined thresholds, enabling proactive intervention before damage occurs.',
                'sort_order' => 5,
            ],
            [
                'icon' => 'file-text',
                'title' => 'Legally Compliant Digital Reports',
                'description' => 'Regulatory-ready digital reports that demonstrate compliance, accountability, and chain-of-custody for audits and claims.',
                'sort_order' => 6,
            ],
        ];

        foreach ($highlights as $highlight) {
            Highlight::firstOrCreate(
                ['title' => $highlight['title']],
                $highlight
            );
        }
    }
}
