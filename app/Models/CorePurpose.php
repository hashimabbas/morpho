<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CorePurpose extends Model
{
    protected $fillable = [
        'type',
        'icon',
        'title',
        'description',
        'subtitle',
        'sort_order',
        'is_visible',
    ];

    protected function casts(): array
    {
        return [
            'is_visible' => 'boolean',
        ];
    }
}
