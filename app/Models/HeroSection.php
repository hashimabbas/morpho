<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSection extends Model
{
    protected $fillable = [
        'subtitle', 'subtitle_ar',
        'heading', 'heading_ar',
        'description', 'description_ar',
        'feature_1', 'feature_1_ar',
        'feature_2', 'feature_2_ar',
        'feature_2_desc', 'feature_2_desc_ar',
        'cta_text', 'cta_text_ar',
        'explore_text', 'explore_text_ar',
        'images',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'is_active' => 'boolean',
        ];
    }
}
