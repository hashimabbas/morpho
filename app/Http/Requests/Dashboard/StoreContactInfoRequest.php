<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactInfoRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'type' => 'required|string|max:255',
            'label' => 'required|string|max:255',
            'label_ar' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'value_ar' => 'nullable|string|max:255',
            'icon' => 'required|string|max:255',
            'href' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer|min:0',
        ];
    }
}
