<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreCoreValueRequest;
use App\Http\Requests\Dashboard\UpdateCoreValueRequest;
use App\Models\CoreValue;
use Inertia\Inertia;
use Inertia\Response;

class CoreValueController extends Controller
{
    public function index(): Response
    {
        $coreValues = CoreValue::orderBy('sort_order')->paginate(15)->withQueryString();
        return Inertia::render('Dashboard/CoreValues', [
            'coreValues' => $coreValues,
        ]);
    }

    public function store(StoreCoreValueRequest $request)
    {
        CoreValue::create($request->validated());
        return back()->with('success', 'Core Value created successfully.');
    }

    public function update(UpdateCoreValueRequest $request, CoreValue $coreValue)
    {
        $coreValue->update($request->validated());
        return back()->with('success', 'Core Value updated successfully.');
    }

    public function destroy(CoreValue $coreValue)
    {
        $coreValue->delete();
        return back()->with('success', 'Core Value deleted successfully.');
    }
}
