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
        $data = $request->validated();

        if ($request->hasFile('image_upload')) {
            $file = $request->file('image_upload');
            $filename = 'images/brochures/' . $file->hashName();
            $file->move(public_path('images/brochures'), $filename);
            $data['image_url'] = '/' . $filename;
        }
        unset($data['image_upload']);

        if ($request->hasFile('file_upload')) {
            $file = $request->file('file_upload');
            $filename = 'files/brochures/' . $file->hashName();
            $file->move(public_path('files/brochures'), $filename);
            $data['file'] = '/' . $filename;
        }
        unset($data['file_upload']);

        Brochure::create($data);
        return back()->with('success', 'Brochure created successfully.');
    }

    public function update(UpdateBrochureRequest $request, Brochure $brochure)
    {
        $data = $request->validated();

        if ($request->hasFile('image_upload')) {
            $file = $request->file('image_upload');
            $filename = 'images/brochures/' . $file->hashName();
            $file->move(public_path('images/brochures'), $filename);
            $data['image_url'] = '/' . $filename;
        }
        unset($data['image_upload']);

        if ($request->hasFile('file_upload')) {
            $file = $request->file('file_upload');
            $filename = 'files/brochures/' . $file->hashName();
            $file->move(public_path('files/brochures'), $filename);
            $data['file'] = '/' . $filename;
        }
        unset($data['file_upload']);

        $brochure->update($data);
        return back()->with('success', 'Brochure updated successfully.');
    }

    public function destroy(Brochure $brochure)
    {
        $brochure->delete();
        return back()->with('success', 'Brochure deleted successfully.');
    }
}
