<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEcosystemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => ['required', 'string', 'max:20'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('ecosystems', 'slug')->ignore($this->route('ecosystem'))],
            'icon' => ['required', 'string', 'max:50'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'image' => ['nullable', 'string', 'max:255'],
            'href' => ['nullable', 'string', 'max:255'],
            'features' => ['required', 'array'],
            'features.*' => ['required', 'string', 'max:500'],
            'content' => ['nullable', 'array'],
            'subtitle' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_visible' => ['nullable', 'boolean'],
            'title_ar' => ['nullable', 'string', 'max:255'],
            'description_ar' => ['nullable', 'string'],
            'subtitle_ar' => ['nullable', 'string', 'max:255'],
            'features_ar' => ['nullable', 'array'],
            'features_ar.*' => ['nullable', 'string', 'max:500'],
            'content_ar' => ['nullable', 'array'],
        ];
    }
}
