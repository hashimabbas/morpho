<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePricingPlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'handle' => ['required', 'string', 'max:100', Rule::unique('pricing_plans', 'handle')->ignore($this->route('pricing_plan'))],
            'description' => ['nullable', 'string'],
            'price_label' => ['required', 'string', 'max:50'],
            'price_period' => ['nullable', 'string', 'max:50'],
            'features' => ['nullable', 'json'],
            'cta' => ['nullable', 'string', 'max:50'],
            'is_popular' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_visible' => ['nullable', 'boolean'],
        ];
    }
}
