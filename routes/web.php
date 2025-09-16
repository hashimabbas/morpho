<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\Dashboard\ContactManagementController;
use App\Http\Controllers\DashboardController; // Make sure this is imported
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

});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
