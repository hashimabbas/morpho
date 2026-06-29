<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StorePricingPlanRequest;
use App\Http\Requests\Dashboard\UpdatePricingPlanRequest;
use App\Models\PricingPlan;
use Inertia\Inertia;
use Inertia\Response;

class PricingPlanController extends Controller
{
    public function index(): Response
    {
        $plans = PricingPlan::orderBy('sort_order')->paginate(15)->withQueryString();

        return Inertia::render('Dashboard/PricingPlans', [
            'pricingPlans' => $plans,
        ]);
    }

    public function store(StorePricingPlanRequest $request)
    {
        PricingPlan::create($request->validated());

        return back()->with('success', 'Pricing plan created successfully.');
    }

    public function update(UpdatePricingPlanRequest $request, PricingPlan $pricingPlan)
    {
        $pricingPlan->update($request->validated());

        return back()->with('success', 'Pricing plan updated successfully.');
    }

    public function destroy(PricingPlan $pricingPlan)
    {
        $pricingPlan->delete();

        return back()->with('success', 'Pricing plan deleted successfully.');
    }
}
