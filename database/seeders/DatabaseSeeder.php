<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            HighlightSeeder::class,
            TargetEntitySeeder::class,
            PricingPlanSeeder::class,
            SettingSeeder::class,
            CoreValueSeeder::class,
            TeamMemberSeeder::class,
            BrochureSeeder::class,
            ContactInfoSeeder::class,
            SocialLinkSeeder::class,
        ]);
    }
}
