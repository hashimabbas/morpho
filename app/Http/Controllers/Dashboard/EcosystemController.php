<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreEcosystemRequest;
use App\Http\Requests\Dashboard\UpdateEcosystemRequest;
use App\Models\Ecosystem;
use Inertia\Inertia;
use Inertia\Response;

class EcosystemController extends Controller
{
    public function index(): Response
    {
        $ecosystems = Ecosystem::orderBy('sort_order')->paginate(15)->withQueryString();

        return Inertia::render('Dashboard/Ecosystems', [
            'ecosystems' => $ecosystems,
        ]);
    }

    public function store(StoreEcosystemRequest $request)
    {
        Ecosystem::create($request->validated());

        return back()->with('success', 'Ecosystem created successfully.');
    }

    public function update(UpdateEcosystemRequest $request, Ecosystem $ecosystem)
    {
        $ecosystem->update($request->validated());

        return back()->with('success', 'Ecosystem updated successfully.');
    }

    public function destroy(Ecosystem $ecosystem)
    {
        $ecosystem->delete();

        return back()->with('success', 'Ecosystem deleted successfully.');
    }
}
