<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Or add authorization logic if needed
    }

    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:contacts,email',
            'phone' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'status' => 'required|string|max:255',
            'owner_id' => 'nullable|exists:users,id',
        ];
    }
} 
