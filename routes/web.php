<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Dashboard\ContactManagementController;
use App\Http\Controllers\DashboardController; // Make sure this is imported
use App\Http\Controllers\DemoRequestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

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

Route::get('/solutions/agriculture', function () {
    return Inertia::render('Agriculture');
})->name('solutions.agriculture');

Route::get('/solutions/cold-chain', function () {
    return Inertia::render('ColdChain');
})->name('solutions.cold-chain');

Route::get('/solutions/livestock', function () {
    return Inertia::render('Livestock');
})->name('solutions.livestock');

Route::get('/solutions/marine', function () {
    return Inertia::render('Marine');
})->name('solutions.marine');

Route::get('/solutions/warehousing', function () {
    return Inertia::render('Warehousing');
})->name('solutions.warehousing');

Route::get('/brochures', function () {
    return Inertia::render('Brochures');
})->name('brochures');


// Group dashboard-related routes under a 'dashboard' prefix and name prefix
Route::middleware(['auth', 'verified'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');

    // Route::get('/messages', [DashboardController::class, 'messages'])->name('messages');
    // Route::post('/messages/{contactMessage}/mark-as-read', [DashboardController::class, 'markAsRead'])->name('messages.markAsRead');

    Route::resource('contacts', ContactManagementController::class)->except(['create', 'show', 'edit']);
    Route::get('/messages', [ContactController::class, 'index'])->name('messages');
    Route::get('/messages/all', [ContactController::class, 'getAllMessages'])->name('messages.all');
    Route::post('/messages/{contactMessage}/mark-as-read', [ContactController::class, 'markAsRead'])->name('messages.markAsRead');
    Route::post('/messages/{contactMessage}/convert', [ContactController::class, 'convertToContact'])->name('messages.convertToContact');

    Route::get('/demo-requests', [DemoRequestController::class, 'index'])
        ->name('demo-requests.index');

    Route::post('/demo-requests/{requestDemo}/mark-as-read', [DemoRequestController::class, 'markAsRead'])
        ->name('demo-requests.markAsRead');

    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
