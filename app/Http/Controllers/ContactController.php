<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    /**
     * Display a paginated list of the resource.
     */
    public function index(Request $request): Response
    {
        // Validate the request parameters
        $request->validate([
            'filter' => 'in:all,read,unread',
            'search' => 'nullable|string|max:255',
        ]);

        $messages = ContactMessage::query()
            ->when($request->input('search'), function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%");
                });
            })
            ->when($request->input('filter'), function ($query, $filter) {
                if ($filter === 'read') {
                    $query->where('is_read', true);
                } elseif ($filter === 'unread') {
                    $query->where('is_read', false);
                }
            })
            ->latest()
            ->paginate(10)->withQueryString(); // withQueryString() is important!

        return Inertia::render('Dashboard/Messages', [
            'messages' => $messages,
            // THIS IS CRITICAL - Pass the filters back to the component
            'filters' => $request->only(['search', 'filter']),
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        ContactMessage::create($validatedData);

        return back()->with('success', 'Thank you! Your message has been received.');
    }

    /**
     * Mark the specified message as read.
     */
    public function markAsRead(ContactMessage $contactMessage): RedirectResponse
    {
        $contactMessage->update(['is_read' => true]);

        return back();
    }

    public function getAllMessages(Request $request): JsonResponse
    {
        $messages = ContactMessage::query()
            ->when($request->query('search'), function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('subject', 'like', "%{$search}%");
                });
            })
            ->when($request->query('filter'), function ($query, $filter) {
                if ($filter === 'read') {
                    $query->where('is_read', true);
                } elseif ($filter === 'unread') {
                    $query->where('is_read', false);
                }
            })
            ->latest()
            ->get(); // <-- Use get() instead of paginate()

        return response()->json($messages);
    }

    public function convertToContact(ContactMessage $contactMessage): RedirectResponse
    {
        // Use firstOrCreate to prevent creating duplicate contacts with the same email.
        // If a contact with this email exists, it will be found.
        // If not, a new one will be created.
        $contact = Contact::firstOrCreate(
            ['email' => $contactMessage->email],
            [
                // This data is only used if a NEW contact is created.
                'first_name' => $this->parseFirstName($contactMessage->name),
                'last_name' => $this->parseLastName($contactMessage->name),
                'company' => $contactMessage->subject, // A reasonable default
                'status' => 'lead', // New contacts from messages are leads
            ]
        );

        // Link the message to the new or found contact and save.
        $contactMessage->converted_to_contact_id = $contact->id;
        $contactMessage->save();

        return back()->with('success', "Message converted to contact: {$contact->first_name} {$contact->last_name}");
    }

    /**
     * Helper function to parse the first name from a full name string.
     */
    private function parseFirstName(string $fullName): string
    {
        $parts = explode(' ', trim($fullName));
        return $parts[0] ?? '';
    }

    /**
     * Helper function to parse the last name from a full name string.
     */
    private function parseLastName(string $fullName): string
    {
        $parts = explode(' ', trim($fullName), 2);
        return $parts[1] ?? '';
    }
}
