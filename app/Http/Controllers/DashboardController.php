<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\User;
use App\Models\Visit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class DashboardController extends Controller
{
    public function index()
    {
        // Fetch users
        $totalUsers = User::count();
        $latestUsers = User::latest()->take(5)->get(['id', 'name', 'email', 'created_at']);

        // Fetch messages
        $totalMessages = ContactMessage::count();
        $unreadMessagesCount = ContactMessage::where('is_read', false)->count();
        $latestMessages = ContactMessage::latest()->take(5)->get(['id', 'name', 'email', 'subject', 'message', 'is_read', 'created_at']);

        // Fetch visits
        $totalVisits = Visit::count();
        $uniqueVisitorsToday = Visit::whereDate('created_at', today())->distinct('ip_address')->count();
        $latestVisits = Visit::with('user:id,name')->latest()->take(10)->get();

        return Inertia::render('dashboard', [
            'totalUsers' => $totalUsers,
            'latestUsers' => $latestUsers,
            'totalMessages' => $totalMessages,
            'unreadMessagesCount' => $unreadMessagesCount,
            'latestMessages' => $latestMessages,
            'totalVisits' => $totalVisits,
            'uniqueVisitorsToday' => $uniqueVisitorsToday,
            'latestVisits' => $latestVisits,
        ]);
    }




    public function markAsRead(ContactMessage $contactMessage): RedirectResponse
    {
        $contactMessage->update(['is_read' => true]);

        return back();
    }


}
