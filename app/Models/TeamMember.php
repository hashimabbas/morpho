<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name', 'role', 'description', 'image_url',
        'name_ar', 'role_ar', 'description_ar',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];
}
