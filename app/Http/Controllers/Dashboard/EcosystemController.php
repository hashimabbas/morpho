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
        $data = $request->validated();

        if ($request->hasFile('image_upload')) {
            $file = $request->file('image_upload');
            $filename = 'images/ecosystems/' . $file->hashName();
            $file->move(public_path('images/ecosystems'), $filename);
            $data['image'] = '/' . $filename;
        }
        unset($data['image_upload']);

        Ecosystem::create($data);

        return back()->with('success', 'Ecosystem created successfully.');
    }

    public function update(UpdateEcosystemRequest $request, Ecosystem $ecosystem)
    {
        $data = $request->validated();

        if ($request->hasFile('image_upload')) {
            $file = $request->file('image_upload');
            $filename = 'images/ecosystems/' . $file->hashName();
            $file->move(public_path('images/ecosystems'), $filename);
            $data['image'] = '/' . $filename;
        }
        unset($data['image_upload']);

        $ecosystem->update($data);

        return back()->with('success', 'Ecosystem updated successfully.');
    }

    public function destroy(Ecosystem $ecosystem)
    {
        $ecosystem->delete();

        return back()->with('success', 'Ecosystem deleted successfully.');
    }
}
