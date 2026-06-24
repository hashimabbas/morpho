<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreCorePurposeRequest;
use App\Http\Requests\Dashboard\UpdateCorePurposeRequest;
use App\Models\CorePurpose;
use Inertia\Inertia;
use Inertia\Response;

class CorePurposeController extends Controller
{
    public function index(): Response
    {
        $corePurposes = CorePurpose::orderBy('sort_order')->orderBy('title')->paginate(15)->withQueryString();

        return Inertia::render('Dashboard/CorePurposes', [
            'corePurposes' => $corePurposes,
        ]);
    }

    public function store(StoreCorePurposeRequest $request)
    {
        CorePurpose::create($request->validated());

        return back()->with('success', 'Core purpose created successfully.');
    }

    public function update(UpdateCorePurposeRequest $request, CorePurpose $corePurpose)
    {
        $corePurpose->update($request->validated());

        return back()->with('success', 'Core purpose updated successfully.');
    }

    public function destroy(CorePurpose $corePurpose)
    {
        $corePurpose->delete();

        return back()->with('success', 'Core purpose deleted successfully.');
    }
}
