<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactInfo extends Model
{
    protected $fillable = [
        'type',
        'label',
        'label_ar',
        'value',
        'value_ar',
        'icon',
        'href',
        'sort_order',
    ];
}
