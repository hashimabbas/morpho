<?php

namespace App\Http\Controllers;

use App\Models\PricingInquiry;
use App\Models\PricingPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PricingInquiryController extends Controller
{
    public function index(Request $request): Response
    {
        $request->validate([
            'filter' => 'in:all,read,unread',
            'search' => 'nullable|string|max:255',
        ]);

        $inquiries = PricingInquiry::query()
            ->when($request->input('search'), function ($query, $search) {
                $query->where('full_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('company_name', 'like', "%{$search}%");
            })
            ->when($request->input('filter'), function ($query, $filter) {
                if ($filter === 'read') {
                    $query->where('is_read', true);
                } elseif ($filter === 'unread') {
                    $query->where('is_read', false);
                }
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $plans = PricingPlan::orderBy('sort_order')->get(['id', 'name', 'handle']);

        return Inertia::render('Dashboard/PricingInquiries', [
            'inquiries' => $inquiries,
            'plans' => $plans,
            'filters' => [
                'search' => $request->input('search'),
                'filter' => $request->input('filter', 'all'),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:50',
            'interested_plan_handle' => 'required|string|max:100',
            'interested_plan_name' => 'required|string|max:255',
            'message' => 'nullable|string|max:1000',
        ]);

        PricingInquiry::create($validated);

        return back()->with('success', 'Pricing inquiry created successfully.');
    }

    public function destroy(PricingInquiry $pricingInquiry)
    {
        $pricingInquiry->delete();

        return back()->with('success', 'Pricing inquiry deleted successfully.');
    }

    public function markAsRead(PricingInquiry $pricingInquiry)
    {
        $pricingInquiry->update(['is_read' => true]);
        return back();
    }
}
