<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricingInquiry extends Model
{
    protected $fillable = [
        'full_name',
        'company_name',
        'email',
        'phone',
        'interested_plan_handle',
        'interested_plan_name',
        'message',
        'is_read',
    ];

    protected function casts(): array
    {
        return [
            'is_read' => 'boolean',
        ];
    }
}
