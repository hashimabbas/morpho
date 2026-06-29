<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class StorePricingInquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:50',
            'interested_plan_handle' => 'required|string|max:100',
            'interested_plan_name' => 'required|string|max:255',
            'message' => 'nullable|string|max:1000',
        ];
    }
}
