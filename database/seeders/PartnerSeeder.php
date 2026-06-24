<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    public function run(): void
    {
        $partners = [
            ['name' => 'Telnet Global', 'role' => 'Technology Partner (Tunisia)', 'logo' => 'images/logo/telnet.png', 'sort_order' => 0],
            ['name' => 'Onomondo', 'role' => 'IoT Connectivity Solutions Provider (Denmark)', 'logo' => 'images/logo/onomondo.png', 'sort_order' => 1],
            ['name' => 'INTAJ STARS Technology Services', 'role' => 'Development & Consulting (Oman)', 'logo' => 'images/logo/intaj.png', 'sort_order' => 2],
            ['name' => 'Shenzhen Fuwit Technology Co.,Ltd', 'role' => 'Shenzhen Fuwit Technology Co.,Ltd', 'logo' => 'images/logo/fuwit.png', 'sort_order' => 3],
            ['name' => 'ASYAD', 'role' => 'asyad', 'logo' => 'images/logo/asyad.png', 'sort_order' => 4],
            ['name' => 'AETC', 'role' => 'Business Supply Trading Company "AETC"', 'logo' => 'images/logo/aetc.png', 'sort_order' => 5],
            ['name' => '(AVOD) S.A.O.C', 'role' => 'Areej Vegetable Oils & Derivatives SAOC', 'logo' => 'images/logo/avod.png', 'sort_order' => 6],
        ];

        foreach ($partners as $partner) {
            Partner::firstOrCreate(
                ['name' => $partner['name']],
                $partner
            );
        }
    }
}
