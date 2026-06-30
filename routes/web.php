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
use App\Http\Controllers\Dashboard\CoreValueController;
use App\Http\Controllers\Dashboard\TeamMemberController;
use App\Http\Controllers\Dashboard\BrochureController;
use App\Http\Controllers\Dashboard\ContactInfoController;
use App\Http\Controllers\Dashboard\SocialLinkController;
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
    $locale = app()->getLocale();
    $coreValues = \App\Models\CoreValue::orderBy('sort_order')->get()->map(fn ($cv) => [
        'id' => $cv->id,
        'icon' => $cv->icon,
        'title' => $locale === 'ar' && $cv->title_ar ? $cv->title_ar : $cv->title,
        'description' => $locale === 'ar' && $cv->description_ar ? $cv->description_ar : $cv->description,
    ]);
    $teamMembers = \App\Models\TeamMember::orderBy('sort_order')->get()->map(fn ($tm) => [
        'id' => $tm->id,
        'name' => $locale === 'ar' && $tm->name_ar ? $tm->name_ar : $tm->name,
        'role' => $locale === 'ar' && $tm->role_ar ? $tm->role_ar : $tm->role,
        'description' => $locale === 'ar' && $tm->description_ar ? $tm->description_ar : $tm->description,
        'image_url' => $tm->image_url,
    ]);
    return Inertia::render('About', [
        'coreValues' => $coreValues,
        'teamMembers' => $teamMembers,
    ]);
})->name('about');

Route::get('/contact', function () {
    $locale = app()->getLocale();
    $contactInfos = \App\Models\ContactInfo::orderBy('sort_order')->get()->map(fn ($ci) => [
        'id' => $ci->id,
        'type' => $ci->type,
        'label' => $locale === 'ar' && $ci->label_ar ? $ci->label_ar : $ci->label,
        'value' => $locale === 'ar' && $ci->value_ar ? $ci->value_ar : $ci->value,
        'icon' => $ci->icon,
        'href' => $ci->href,
    ]);
    $socialLinks = \App\Models\SocialLink::where('is_active', true)->orderBy('sort_order')->get()->map(fn ($sl) => [
        'id' => $sl->id,
        'platform' => $sl->platform,
        'url' => $sl->url,
        'icon' => $sl->icon,
        'label' => $locale === 'ar' && $sl->label_ar ? $sl->label_ar : $sl->label,
    ]);
    return Inertia::render('Contact', [
        'contactInfos' => $contactInfos,
        'socialLinks' => $socialLinks,
    ]);
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

Route::get('/api/brochures', function () {
    $locale = app()->getLocale();
    return App\Models\Brochure::orderBy('sort_order')->get()->map(fn ($b) => [
        'id' => $b->id,
        'name' => $locale === 'ar' && $b->name_ar ? $b->name_ar : $b->name,
        'description' => $locale === 'ar' && $b->description_ar ? $b->description_ar : $b->description,
        'image_url' => $b->image_url,
        'file' => $b->file,
    ]);
});

Route::get('/brochures', function () {
    $locale = app()->getLocale();
    $brochures = App\Models\Brochure::orderBy('sort_order')->get()->map(fn ($b) => [
        'id' => $b->id,
        'name' => $locale === 'ar' && $b->name_ar ? $b->name_ar : $b->name,
        'description' => $locale === 'ar' && $b->description_ar ? $b->description_ar : $b->description,
        'image_url' => $b->image_url,
        'file' => $b->file,
    ]);
    return Inertia::render('Brochures', ['brochures' => $brochures]);
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
    $locale = app()->getLocale();
    return \App\Models\PricingPlan::where('is_visible', true)->orderBy('sort_order')->get()->map(fn ($p) => [
        'id' => $p->id,
        'name' => $locale === 'ar' && $p->name_ar ? $p->name_ar : $p->name,
        'handle' => $p->handle,
        'price_label' => $locale === 'ar' && $p->price_label_ar ? $p->price_label_ar : $p->price_label,
        'price_period' => $locale === 'ar' && $p->price_period_ar ? $p->price_period_ar : $p->price_period,
        'description' => $locale === 'ar' && $p->description_ar ? $p->description_ar : $p->description,
        'features' => $locale === 'ar' && $p->features_ar ? $p->features_ar : $p->features,
        'cta' => $locale === 'ar' && $p->cta_ar ? $p->cta_ar : $p->cta,
        'is_popular' => $p->is_popular,
        'sort_order' => $p->sort_order,
        'is_visible' => $p->is_visible,
    ]);
});

Route::get('/api/core-values', function () {
    $locale = app()->getLocale();
    return \App\Models\CoreValue::orderBy('sort_order')->get()->map(fn ($cv) => [
        'id' => $cv->id,
        'icon' => $cv->icon,
        'title' => $locale === 'ar' && $cv->title_ar ? $cv->title_ar : $cv->title,
        'description' => $locale === 'ar' && $cv->description_ar ? $cv->description_ar : $cv->description,
    ]);
});

Route::get('/api/team-members', function () {
    $locale = app()->getLocale();
    return \App\Models\TeamMember::orderBy('sort_order')->get()->map(fn ($tm) => [
        'id' => $tm->id,
        'name' => $locale === 'ar' && $tm->name_ar ? $tm->name_ar : $tm->name,
        'role' => $locale === 'ar' && $tm->role_ar ? $tm->role_ar : $tm->role,
        'description' => $locale === 'ar' && $tm->description_ar ? $tm->description_ar : $tm->description,
        'image_url' => $tm->image_url,
    ]);
});

Route::get('/api/contact-data', function () {
    $locale = app()->getLocale();
    $contactInfos = \App\Models\ContactInfo::orderBy('sort_order')->get()->map(fn ($ci) => [
        'id' => $ci->id,
        'type' => $ci->type,
        'label' => $locale === 'ar' && $ci->label_ar ? $ci->label_ar : $ci->label,
        'value' => $locale === 'ar' && $ci->value_ar ? $ci->value_ar : $ci->value,
        'icon' => $ci->icon,
        'href' => $ci->href,
    ]);
    $socialLinks = \App\Models\SocialLink::where('is_active', true)->orderBy('sort_order')->get()->map(fn ($sl) => [
        'id' => $sl->id,
        'platform' => $sl->platform,
        'url' => $sl->url,
        'icon' => $sl->icon,
        'label' => $locale === 'ar' && $sl->label_ar ? $sl->label_ar : $sl->label,
    ]);
    return response()->json(['contactInfos' => $contactInfos, 'socialLinks' => $socialLinks]);
});

Route::get('/api/settings', function () {
    return \App\Models\Setting::pluck('value', 'key');
});

Route::get('/api/pricing-comparison-features', function () {
    $locale = app()->getLocale();
    return \App\Models\PricingComparisonFeature::orderBy('sort_order')->get()->map(fn ($f) => [
        'id' => $f->id,
        'feature_name' => $locale === 'ar' && $f->feature_name_ar ? $f->feature_name_ar : $f->feature_name,
        'plan_mappings' => $f->plan_mappings,
        'sort_order' => $f->sort_order,
    ]);
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
    Route::resource('core-values', CoreValueController::class)->except(['create', 'show', 'edit']);
    Route::resource('team-members', TeamMemberController::class)->except(['create', 'show', 'edit']);
    Route::resource('brochures', BrochureController::class)->except(['create', 'show', 'edit']);
    Route::resource('contact-infos', ContactInfoController::class)->except(['create', 'show', 'edit']);
    Route::resource('social-links', SocialLinkController::class)->except(['create', 'show', 'edit']);
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
