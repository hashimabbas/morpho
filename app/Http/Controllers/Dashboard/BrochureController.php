<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreBrochureRequest;
use App\Http\Requests\Dashboard\UpdateBrochureRequest;
use App\Models\Brochure;
use Inertia\Inertia;
use Inertia\Response;

class BrochureController extends Controller
{
    public function index(): Response
    {
        $brochures = Brochure::orderBy('sort_order')->paginate(15)->withQueryString();
        return Inertia::render('Dashboard/Brochures', [
            'brochures' => $brochures,
        ]);
    }

    public function store(StoreBrochureRequest $request)
    {
        Brochure::create($request->validated());
        return back()->with('success', 'Brochure created successfully.');
    }

    public function update(UpdateBrochureRequest $request, Brochure $brochure)
    {
        $brochure->update($request->validated());
        return back()->with('success', 'Brochure updated successfully.');
    }

    public function destroy(Brochure $brochure)
    {
        $brochure->delete();
        return back()->with('success', 'Brochure deleted successfully.');
    }
}
