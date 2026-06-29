<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTargetEntityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'group_name' => ['required', 'string', 'max:255'],
            'group_slug' => ['required', 'string', 'max:100'],
            'owner' => ['nullable', 'string', 'max:255'],
            'entity_name' => ['required', 'string', 'max:255'],
            'activity' => ['nullable', 'string'],
            'morpho_solution' => ['required', 'string'],
            'icon' => ['nullable', 'string', 'max:50'],
            'image' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_visible' => ['nullable', 'boolean'],
        ];
    }
}
