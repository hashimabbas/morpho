<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StorePartnerRequest;
use App\Http\Requests\Dashboard\UpdatePartnerRequest;
use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PartnerController extends Controller
{
    public function index(): Response
    {
        $partners = Partner::orderBy('sort_order')->orderBy('name')->paginate(15)->withQueryString();

        return Inertia::render('Dashboard/Partners', [
            'partners' => $partners,
        ]);
    }

    public function store(StorePartnerRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('logo')) {
            $data['logo'] = 'images/logo/' . $request->file('logo')->hashName();
            $request->file('logo')->move(public_path('images/logo'), $data['logo']);
        }

        Partner::create($data);

        return back()->with('success', 'Partner created successfully.');
    }

    public function update(UpdatePartnerRequest $request, Partner $partner)
    {
        $data = $request->validated();

        if ($request->hasFile('logo')) {
            $data['logo'] = 'images/logo/' . $request->file('logo')->hashName();
            $request->file('logo')->move(public_path('images/logo'), $data['logo']);
        }

        $partner->update($data);

        return back()->with('success', 'Partner updated successfully.');
    }

    public function destroy(Partner $partner)
    {
        $partner->delete();

        return back()->with('success', 'Partner deleted successfully.');
    }
}
