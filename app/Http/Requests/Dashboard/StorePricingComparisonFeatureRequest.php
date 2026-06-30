<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class StorePricingComparisonFeatureRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'feature_name' => ['required', 'string', 'max:255'],
            'plan_mappings' => ['required', 'json'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'feature_name_ar' => ['nullable', 'string', 'max:255'],
        ];
    }
}
