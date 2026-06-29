<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Dashboard\ContactManagementController;
use App\Http\Controllers\Dashboard\CorePurposeController;
use App\Http\Controllers\Dashboard\EcosystemController;
use App\Http\Controllers\Dashboard\HighlightController;
use App\Http\Controllers\Dashboard\PricingPlanController;
use App\Http\Controllers\Dashboard\PricingComparisonFeatureController;
use App\Http\Controllers\Dashboard\TargetEntityController;
use App\Http\Controllers\Dashboard\PartnerController;
use App\Http\Controllers\Dashboard\SiteSettingController;
use App\Http\Controllers\DashboardController; // Make sure this is imported
use App\Http\Controllers\DemoRequestController;
use App\Http\Controllers\PricingInquiryController;
use App\Http\Controllers\SolutionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::post('/language', function (Request $request) {
    $locale = $request->input('locale', 'en');
    if (in_array($locale, ['en', 'ar'])) {
        session(['locale' => $locale]);
        app()->setLocale($locale);
    }
    return redirect()->back();
})->name('language.switch');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Temporary route to fix storage:link error on shared hosting
Route::get('/linkstorage', function () {
    $target = storage_path('app/public');
    $link = public_path('storage');
    if (file_exists($link)) {
        return 'The "public/storage" directory already exists.';
    }
    app('files')->link($target, $link);
    return 'The [public/storage] directory has been linked.';
});

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/demo_request', function () {
    return Inertia::render('DemoRequest');
})->name('demo_request');

Route::post('/demo-request', [DemoRequestController::class, 'store'])->name('demo.store');

Route::post('/pricing-inquiry', [PricingInquiryController::class, 'store'])->name('pricing.inquiry.store');

// Keep only one post route for contact
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/pricing', function () {
    return Inertia::render('Pricing');
})->name('pricing');

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy.policy');

Route::get('/terms-of-service', function () {
    return Inertia::render('TermsOfService');
})->name('terms.service');

Route::get('/solutions/{slug}', [SolutionController::class, 'show'])->name('solutions.detail');

Route::get('/brochures', function () {
    return Inertia::render('Brochures');
})->name('brochures');

Route::get('/entities', function () {
    return Inertia::render('Entities');
})->name('entities');

// Public API
Route::get('/api/partners', function () {
    return \App\Models\Partner::orderBy('sort_order')->orderBy('name')->get(['id', 'name', 'role', 'logo']);
});

Route::get('/api/highlights', function () {
    $locale = app()->getLocale();
    return \App\Models\Highlight::where('is_visible', true)->orderBy('sort_order')->get()->map(fn ($h) => [
        'id' => $h->id,
        'icon' => $h->icon,
        'title' => $locale === 'ar' && $h->title_ar ? $h->title_ar : $h->title,
        'description' => $locale === 'ar' && $h->description_ar ? $h->description_ar : $h->description,
    ]);
});

Route::get('/api/core-purposes', function () {
    $locale = app()->getLocale();
    return \App\Models\CorePurpose::where('is_visible', true)->orderBy('sort_order')->get()->map(fn ($cp) => [
        'id' => $cp->id,
        'type' => $cp->type,
        'icon' => $cp->icon,
        'title' => $locale === 'ar' && $cp->title_ar ? $cp->title_ar : $cp->title,
        'description' => $locale === 'ar' && $cp->description_ar ? $cp->description_ar : $cp->description,
        'subtitle' => $locale === 'ar' && $cp->subtitle_ar ? $cp->subtitle_ar : $cp->subtitle,
    ]);
});

Route::get('/api/ecosystems', function () {
    $locale = app()->getLocale();
    return \App\Models\Ecosystem::where('is_visible', true)->orderBy('sort_order')->get()->map(function ($e) use ($locale) {
        return [
            'id' => $e->id,
            'type' => $e->type,
            'icon' => $e->icon,
            'title' => $locale === 'ar' && $e->title_ar ? $e->title_ar : $e->title,
            'description' => $locale === 'ar' && $e->description_ar ? $e->description_ar : $e->description,
            'image' => $e->image,
            'href' => $e->href,
            'features' => $locale === 'ar' && $e->features_ar ? $e->features_ar : $e->features,
            'subtitle' => $locale === 'ar' && $e->subtitle_ar ? $e->subtitle_ar : $e->subtitle,
        ];
    });
});

Route::get('/api/target-entities', function () {
    return \App\Models\TargetEntity::where('is_visible', true)->orderBy('sort_order')->get();
});

Route::get('/api/pricing-plans', function () {
    return \App\Models\PricingPlan::where('is_visible', true)->orderBy('sort_order')->get();
});

Route::get('/api/settings', function () {
    return \App\Models\Setting::pluck('value', 'key');
});

Route::get('/api/pricing-comparison-features', function () {
    return \App\Models\PricingComparisonFeature::orderBy('sort_order')->get();
});


// Group dashboard-related routes under a 'dashboard' prefix and name prefix
Route::middleware(['auth', 'verified'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');

    // Route::get('/messages', [DashboardController::class, 'messages'])->name('messages');
    // Route::post('/messages/{contactMessage}/mark-as-read', [DashboardController::class, 'markAsRead'])->name('messages.markAsRead');

    Route::resource('contacts', ContactManagementController::class)->except(['create', 'show', 'edit']);
    Route::resource('partners', PartnerController::class)->except(['create', 'show', 'edit']);
    Route::resource('highlights', HighlightController::class)->except(['create', 'show', 'edit']);
    Route::resource('core-purposes', CorePurposeController::class)->except(['create', 'show', 'edit']);
    Route::resource('ecosystems', EcosystemController::class)->except(['create', 'show', 'edit']);
    Route::resource('target-entities', TargetEntityController::class)->except(['create', 'show', 'edit']);
    Route::get('/messages', [ContactController::class, 'index'])->name('messages');
    Route::get('/messages/all', [ContactController::class, 'getAllMessages'])->name('messages.all');
    Route::post('/messages/{contactMessage}/mark-as-read', [ContactController::class, 'markAsRead'])->name('messages.markAsRead');
    Route::post('/messages/{contactMessage}/convert', [ContactController::class, 'convertToContact'])->name('messages.convertToContact');

    Route::get('/demo-requests', [DemoRequestController::class, 'index'])
        ->name('demo-requests.index');

    Route::post('/demo-requests/{requestDemo}/mark-as-read', [DemoRequestController::class, 'markAsRead'])
        ->name('demo-requests.markAsRead');

    Route::resource('pricing-plans', PricingPlanController::class)->except(['create', 'show', 'edit']);
    Route::resource('pricing-comparison-features', PricingComparisonFeatureController::class)->except(['create', 'show', 'edit']);

    Route::get('/pricing-inquiries', [PricingInquiryController::class, 'index'])
        ->name('pricing-inquiries.index');

    Route::post('/pricing-inquiries', [PricingInquiryController::class, 'store'])
        ->name('pricing-inquiries.store');

    Route::post('/pricing-inquiries/{pricingInquiry}/mark-as-read', [PricingInquiryController::class, 'markAsRead'])
        ->name('pricing-inquiries.markAsRead');

    Route::delete('/pricing-inquiries/{pricingInquiry}', [PricingInquiryController::class, 'destroy'])
        ->name('pricing-inquiries.destroy');

    Route::get('/settings', [SiteSettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SiteSettingController::class, 'update'])->name('settings.update');

    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
