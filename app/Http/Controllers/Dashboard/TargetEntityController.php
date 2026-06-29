<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreTargetEntityRequest;
use App\Http\Requests\Dashboard\UpdateTargetEntityRequest;
use App\Models\TargetEntity;
use Inertia\Inertia;
use Inertia\Response;

class TargetEntityController extends Controller
{
    public function index(): Response
    {
        $entities = TargetEntity::orderBy('sort_order')->orderBy('entity_name')->paginate(15)->withQueryString();

        return Inertia::render('Dashboard/TargetEntities', [
            'targetEntities' => $entities,
        ]);
    }

    public function store(StoreTargetEntityRequest $request)
    {
        TargetEntity::create($request->validated());

        return back()->with('success', 'Target entity created successfully.');
    }

    public function update(UpdateTargetEntityRequest $request, TargetEntity $targetEntity)
    {
        $targetEntity->update($request->validated());

        return back()->with('success', 'Target entity updated successfully.');
    }

    public function destroy(TargetEntity $targetEntity)
    {
        $targetEntity->delete();

        return back()->with('success', 'Target entity deleted successfully.');
    }
}
