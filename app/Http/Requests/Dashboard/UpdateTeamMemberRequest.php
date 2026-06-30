<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTeamMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'description' => 'required|string',
            'image_url' => 'nullable|string|max:255',
            'name_ar' => 'nullable|string|max:255',
            'role_ar' => 'nullable|string|max:255',
            'description_ar' => 'nullable|string',
            'sort_order' => 'nullable|integer|min:0',
        ];
    }
}
