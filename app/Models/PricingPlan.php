<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricingPlan extends Model
{
    protected $fillable = [
        'name',
        'handle',
        'description',
        'price_label',
        'price_period',
        'features',
        'cta',
        'is_popular',
        'sort_order',
        'is_visible',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'is_popular' => 'boolean',
            'is_visible' => 'boolean',
        ];
    }

    public function setFeaturesAttribute($value)
    {
        if (is_string($value)) {
            $value = json_decode($value, true) ?? [];
        }
        $this->attributes['features'] = json_encode($value);
    }
}
