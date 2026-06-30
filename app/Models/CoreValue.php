<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoreValue extends Model
{
    protected $fillable = ['icon', 'title', 'description', 'title_ar', 'description_ar', 'sort_order'];

    protected $casts = [
        'sort_order' => 'integer',
    ];
}
