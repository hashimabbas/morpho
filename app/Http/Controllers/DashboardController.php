<?php

namespace App\Http\Controllers;

use App\Models\Brochure;
use App\Models\ContactInfo;
use App\Models\ContactMessage;
use App\Models\CorePurpose;
use App\Models\CoreValue;
use App\Models\Ecosystem;
use App\Models\Highlight;
use App\Models\Partner;
use App\Models\Portfolio;
use App\Models\PricingPlan;
use App\Models\SocialLink;
use App\Models\TargetEntity;
use App\Models\TeamMember;
use App\Models\User;
use App\Models\Visit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUsers = User::count();
        $latestUsers = User::latest()->take(5)->get(['id', 'name', 'email', 'created_at']);

        $totalMessages = ContactMessage::count();
        $unreadMessagesCount = ContactMessage::where('is_read', false)->count();
        $readMessagesCount = ContactMessage::where('is_read', true)->count();
        $latestMessages = ContactMessage::latest()->take(5)->get(['id', 'name', 'email', 'subject', 'message', 'is_read', 'created_at']);

        $messagesPerDay = ContactMessage::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->where('created_at', '>=', now()->subDays(14))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $totalVisits = Visit::count();
        $uniqueVisitorsToday = Visit::whereDate('created_at', today())->distinct('ip_address')->count();
        $latestVisits = Visit::with('user:id,name')->latest()->take(10)->get();

        $visitsPerDay = Visit::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'), DB::raw('COUNT(DISTINCT ip_address) as unique_count'))
            ->where('created_at', '>=', now()->subDays(14))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $sectionCounts = [
            'partners' => Partner::count(),
            'portfolios' => Portfolio::count(),
            'coreValues' => CoreValue::count(),
            'corePurposes' => CorePurpose::count(),
            'brochures' => Brochure::count(),
            'teamMembers' => TeamMember::count(),
            'ecosystems' => Ecosystem::count(),
            'highlights' => Highlight::count(),
            'socialLinks' => SocialLink::count(),
            'targetEntities' => TargetEntity::count(),
            'contactInfos' => ContactInfo::count(),
            'pricingPlans' => PricingPlan::count(),
        ];

        return Inertia::render('dashboard', [
            'totalUsers' => $totalUsers,
            'latestUsers' => $latestUsers,
            'totalMessages' => $totalMessages,
            'unreadMessagesCount' => $unreadMessagesCount,
            'readMessagesCount' => $readMessagesCount,
            'latestMessages' => $latestMessages,
            'messagesPerDay' => $messagesPerDay,
            'totalVisits' => $totalVisits,
            'uniqueVisitorsToday' => $uniqueVisitorsToday,
            'latestVisits' => $latestVisits,
            'visitsPerDay' => $visitsPerDay,
            'sectionCounts' => $sectionCounts,
        ]);
    }

    public function markAsRead(ContactMessage $contactMessage): RedirectResponse
    {
        $contactMessage->update(['is_read' => true]);
        return back();
    }
}
