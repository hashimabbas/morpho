<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brochure extends Model
{
    protected $fillable = ['name', 'description', 'image_url', 'file', 'name_ar', 'description_ar', 'sort_order'];

    protected $casts = [
        'sort_order' => 'integer',
    ];
}
