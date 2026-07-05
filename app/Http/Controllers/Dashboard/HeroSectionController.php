<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\UpdateHeroSectionRequest;
use App\Models\HeroSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HeroSectionController extends Controller
{
    public function edit(): Response
    {
        $hero = HeroSection::firstOrNew();

        return Inertia::render('Dashboard/HeroSection', [
            'hero' => $hero,
        ]);
    }

    public function update(UpdateHeroSectionRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $images = $data['images'] ?? [];
        foreach ($images as $i => &$imageData) {
            if ($request->hasFile("images.$i.file")) {
                $file = $request->file("images.$i.file");
                $filename = 'images/hero/' . $file->hashName();
                $file->move(public_path('images/hero'), $filename);
                $imageData['src'] = '/' . $filename;
            }
            unset($imageData['file']);
        }

        $data['images'] = $images;

        $hero = HeroSection::firstOrNew();
        $hero->fill($data);
        $hero->save();

        return back()->with('success', 'Hero section updated successfully.');
    }
}
