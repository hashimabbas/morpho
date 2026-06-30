<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricingComparisonFeature extends Model
{
    protected $fillable = [
        'feature_name',
        'feature_name_ar',
        'plan_mappings',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'plan_mappings' => 'array',
        ];
    }
}
