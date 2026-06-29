<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TargetEntity extends Model
{
    protected $fillable = [
        'group_name',
        'group_slug',
        'owner',
        'entity_name',
        'activity',
        'morpho_solution',
        'icon',
        'image',
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
