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
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'content' => 'array',
            'is_visible' => 'boolean',
        ];
    }
}
