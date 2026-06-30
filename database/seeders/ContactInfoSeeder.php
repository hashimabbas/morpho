<?php

namespace Database\Seeders;

use App\Models\ContactInfo;
use Illuminate\Database\Seeder;

class ContactInfoSeeder extends Seeder
{
    public function run(): void
    {
        ContactInfo::upsert([
            [
                'type' => 'phone',
                'label' => 'Phone',
                'label_ar' => 'هاتف',
                'value' => '+968 7997 6223',
                'value_ar' => '+968 7997 6223',
                'icon' => 'phone',
                'href' => 'tel:+96879976223',
                'sort_order' => 1,
            ],
            [
                'type' => 'email',
                'label' => 'Email',
                'label_ar' => 'بريد إلكتروني',
                'value' => 'info@morphosct.com',
                'value_ar' => 'info@morphosct.com',
                'icon' => 'mail',
                'href' => 'mailto:info@morphosct.com',
                'sort_order' => 2,
            ],
            [
                'type' => 'address',
                'label' => 'Our Office',
                'label_ar' => 'مكتبنا',
                'value' => 'Muscat – Ghala, Sultanate of Oman',
                'value_ar' => 'مسقط – غلا، سلطنة عمان',
                'icon' => 'map-pin',
                'href' => null,
                'sort_order' => 3,
            ],
        ], ['type'], ['label', 'label_ar', 'value', 'value_ar', 'icon', 'href', 'sort_order']);
    }
}
