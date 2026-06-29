<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ecosystem extends Model
{
    protected $fillable = [
        'type',
        'slug',
        'icon',
        'title',
        'description',
        'image',
        'href',
        'features',
        'content',
        'subtitle',
        'sort_order',
        'is_visible',
        'title_ar',
        'description_ar',
        'subtitle_ar',
        'features_ar',
        'content_ar',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'features_ar' => 'array',
            'content' => 'array',
            'content_ar' => 'array',
            'is_visible' => 'boolean',
        ];
    }
}
