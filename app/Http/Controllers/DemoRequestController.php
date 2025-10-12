<?php

namespace App\Http\Controllers;

use App\Models\RequestDemo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DemoRequestController extends Controller
{
    public function index(Request $request): Response
    {
        $request->validate([
            'filter' => 'in:all,read,unread',
            'search' => 'nullable|string|max:255',
        ]);

        $demos = RequestDemo::query()
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

        return Inertia::render('Dashboard/RequestDemos', [
            'requests' => $demos,
            'filters' => $request->only(['search', 'filter']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:50',
            'logistics_sector' => 'required|string',
            'solution_type' => 'required|string',
            'demo_goal' => 'required|string',
        ]);
        // You can save it in the database
        RequestDemo::create($validated);

        // Or send notification / email if needed

        return back()->with('success', 'Your demo request has been submitted successfully.');
    }

    public function markAsRead(RequestDemo $requestDemo)
    {
        $requestDemo->update(['is_read' => true]);
        return back();
    }

}
