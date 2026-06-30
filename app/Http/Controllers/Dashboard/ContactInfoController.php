<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreContactInfoRequest;
use App\Http\Requests\Dashboard\UpdateContactInfoRequest;
use App\Models\ContactInfo;
use Inertia\Inertia;
use Inertia\Response;

class ContactInfoController extends Controller
{
    public function index(): Response
    {
        $contactInfos = ContactInfo::orderBy('sort_order')->get();

        return Inertia::render('Dashboard/ContactInfos', [
            'contactInfos' => $contactInfos,
        ]);
    }

    public function store(StoreContactInfoRequest $request)
    {
        ContactInfo::create($request->validated());

        return back()->with('success', 'Contact info created successfully.');
    }

    public function update(UpdateContactInfoRequest $request, ContactInfo $contactInfo)
    {
        $contactInfo->update($request->validated());

        return back()->with('success', 'Contact info updated successfully.');
    }

    public function destroy(ContactInfo $contactInfo)
    {
        $contactInfo->delete();

        return back()->with('success', 'Contact info deleted successfully.');
    }
}
