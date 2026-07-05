<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class StoreBrochureRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image_upload' => 'nullable|image|mimes:png,jpg,jpeg,webp,svg|max:5120',
            'image_url' => 'nullable|string|max:255',
            'file_upload' => 'nullable|file|mimes:pdf|max:20480',
            'file' => 'nullable|string|max:255',
            'name_ar' => 'nullable|string|max:255',
            'description_ar' => 'nullable|string',
            'sort_order' => 'nullable|integer|min:0',
        ];
    }
}
