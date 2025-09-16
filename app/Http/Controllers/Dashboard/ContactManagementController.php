<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreContactRequest;
use App\Http\Requests\Dashboard\UpdateContactRequest;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactManagementController extends Controller
{
    /**
     * Display a list of contacts and users.
     */
    public function index(): Response
    {
        $contacts = Contact::with('owner:id,name')
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Dashboard/Contacts', [
            'contacts' => $contacts,
            // Pass all users to the frontend for the "Owner" dropdown
            'users' => User::all(['id', 'name']),
        ]);
    }

    /**
     * Store a newly created contact in storage.
     */
    public function store(StoreContactRequest $request)
    {
        Contact::create($request->validated());

        return back()->with('success', 'Contact created successfully.');
    }

    /**
     * Update the specified contact in storage.
     */
    public function update(UpdateContactRequest $request, Contact $contact)
    {
        $contact->update($request->validated());

        return back()->with('success', 'Contact updated successfully.');
    }

    /**
     * Remove the specified contact from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return back()->with('success', 'Contact deleted successfully.');
    }
}
