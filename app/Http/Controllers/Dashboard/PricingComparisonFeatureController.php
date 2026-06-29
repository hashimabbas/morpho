<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StorePricingComparisonFeatureRequest;
use App\Models\PricingComparisonFeature;
use App\Models\PricingPlan;
use Inertia\Inertia;
use Inertia\Response;

class PricingComparisonFeatureController extends Controller
{
    public function index(): Response
    {
        $features = PricingComparisonFeature::orderBy('sort_order')->paginate(20)->withQueryString();
        $plans = PricingPlan::orderBy('sort_order')->get(['id', 'name', 'handle']);

        return Inertia::render('Dashboard/PricingComparisonFeatures', [
            'comparisonFeatures' => $features,
            'plans' => $plans,
        ]);
    }

    public function store(StorePricingComparisonFeatureRequest $request)
    {
        PricingComparisonFeature::create($request->validated());

        return back()->with('success', 'Comparison feature created successfully.');
    }

    public function update(StorePricingComparisonFeatureRequest $request, PricingComparisonFeature $pricingComparisonFeature)
    {
        $pricingComparisonFeature->update($request->validated());

        return back()->with('success', 'Comparison feature updated successfully.');
    }

    public function destroy(PricingComparisonFeature $pricingComparisonFeature)
    {
        $pricingComparisonFeature->delete();

        return back()->with('success', 'Comparison feature deleted successfully.');
    }
}
