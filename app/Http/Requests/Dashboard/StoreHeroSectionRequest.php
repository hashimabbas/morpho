<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class StoreHeroSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'subtitle' => ['required', 'string', 'max:255'],
            'subtitle_ar' => ['required', 'string', 'max:255'],
            'heading' => ['required', 'string'],
            'heading_ar' => ['required', 'string'],
            'description' => ['required', 'string'],
            'description_ar' => ['required', 'string'],
            'feature_1' => ['required', 'string', 'max:255'],
            'feature_1_ar' => ['required', 'string', 'max:255'],
            'feature_2' => ['required', 'string', 'max:255'],
            'feature_2_ar' => ['required', 'string', 'max:255'],
            'feature_2_desc' => ['required', 'string', 'max:255'],
            'feature_2_desc_ar' => ['required', 'string', 'max:255'],
            'cta_text' => ['required', 'string', 'max:255'],
            'cta_text_ar' => ['required', 'string', 'max:255'],
            'explore_text' => ['required', 'string', 'max:255'],
            'explore_text_ar' => ['required', 'string', 'max:255'],
            'images' => ['nullable', 'array'],
            'images.*.src' => ['nullable', 'string'],
            'images.*.alt' => ['required_with:images', 'string', 'max:255'],
            'images.*.alt_ar' => ['required_with:images', 'string', 'max:255'],
            'images.*.file' => ['nullable', 'image', 'mimes:png,jpg,jpeg,webp,svg', 'max:5120'],
            'is_active' => ['boolean'],
        ];
    }
}
