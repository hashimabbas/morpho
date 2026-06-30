<?php

namespace Database\Seeders;

use App\Models\SocialLink;
use Illuminate\Database\Seeder;

class SocialLinkSeeder extends Seeder
{
    public function run(): void
    {
        SocialLink::upsert([
            [
                'platform' => 'linkedin',
                'url' => 'https://www.linkedin.com/company/morpho-supply-chain-technologies/',
                'icon' => 'linkedin',
                'label' => 'LinkedIn',
                'label_ar' => 'لينكد إن',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'platform' => 'instagram',
                'url' => 'https://www.instagram.com/morpho_om/',
                'icon' => 'instagram',
                'label' => 'Instagram',
                'label_ar' => 'إنستغرام',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'platform' => 'twitter',
                'url' => 'https://twitter.com/morpho_om',
                'icon' => 'twitter',
                'label' => 'Twitter (X)',
                'label_ar' => 'تويتر (إكس)',
                'sort_order' => 3,
                'is_active' => true,
            ],
        ], ['platform'], ['url', 'icon', 'label', 'label_ar', 'sort_order', 'is_active']);
    }
}
