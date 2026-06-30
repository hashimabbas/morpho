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
        'name_ar',
        'description_ar',
        'features_ar',
        'cta_ar',
        'price_label_ar',
        'price_period_ar',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'features_ar' => 'array',
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

    public function setFeaturesArAttribute($value)
    {
        if (is_string($value)) {
            $value = json_decode($value, true) ?? [];
        }
        $this->attributes['features_ar'] = json_encode($value);
    }
}
