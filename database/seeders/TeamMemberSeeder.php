<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            [
                'name' => 'Manal Ali Saeed Al Hatmi',
                'role' => 'Founder & CEO',
                'description' => 'Extensive technical experience in deploying AI & IoT solutions in complex logistical environments.',
                'image_url' => '/images/team/manal-al-hatmi.jpg',
                'name_ar' => 'منال علي سعيد الحاتمي',
                'role_ar' => 'المؤسس والرئيس التنفيذي',
                'description_ar' => 'خبرة تقنية واسعة في نشر حلول الذكاء الاصطناعي وإنترنت الأشياء في البيئات اللوجستية المعقدة.',
                'sort_order' => 1,
            ],
            [
                'name' => 'Waleed Aldhaybi',
                'role' => 'Co-founder & CTO',
                'description' => 'Systems Architect | Pioneering Satellite-Enabled IoT & Digital Transformation across the GCC | Founder of Intaj Stars.',
                'image_url' => '/images/team/waleed-al-thiyabi.jpeg',
                'name_ar' => 'وليد الذييبي',
                'role_ar' => 'المؤسس المشارك والرئيس التقني',
                'description_ar' => 'مهندس أنظمة | رائد في إنترنت الأشياء عبر الأقمار الصناعية والتحول الرقمي في دول الخليج | مؤسس إنتاج ستارز.',
                'sort_order' => 2,
            ],
        ];

        foreach ($members as $member) {
            TeamMember::create($member);
        }
    }
}
