<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreSocialLinkRequest;
use App\Http\Requests\Dashboard\UpdateSocialLinkRequest;
use App\Models\SocialLink;
use Inertia\Inertia;
use Inertia\Response;

class SocialLinkController extends Controller
{
    public function index(): Response
    {
        $socialLinks = SocialLink::orderBy('sort_order')->get();

        return Inertia::render('Dashboard/SocialLinks', [
            'socialLinks' => $socialLinks,
        ]);
    }

    public function store(StoreSocialLinkRequest $request)
    {
        SocialLink::create($request->validated());

        return back()->with('success', 'Social link created successfully.');
    }

    public function update(UpdateSocialLinkRequest $request, SocialLink $socialLink)
    {
        $socialLink->update($request->validated());

        return back()->with('success', 'Social link updated successfully.');
    }

    public function destroy(SocialLink $socialLink)
    {
        $socialLink->delete();

        return back()->with('success', 'Social link deleted successfully.');
    }
}
