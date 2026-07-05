<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePortfolioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'title_ar' => 'nullable|string|max:255',
            'slug' => 'nullable|string|max:255|unique:portfolios,slug,' . $this->route('portfolio'),
            'date' => 'required|date',
            'description' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'cover_image' => 'nullable|string|max:255',
            'is_visible' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
            'images' => 'nullable|array',
            'images.*.id' => 'nullable|integer|exists:portfolio_images,id',
            'images.*.image' => 'required_with:images|string|max:255',
            'images.*.is_cover' => 'boolean',
            'images.*.sort_order' => 'nullable|integer|min:0',
        ];
    }
}
