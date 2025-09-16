<?php

namespace App\Http\Middleware;

use App\Models\Visit; // Assuming you have this model
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LogWebsiteVisit
{
    public function handle(Request $request, Closure $next): Response
    {
        // Don't log if it's an API call, asset, or an authenticated dashboard route
        if ($request->is('api/*') || $request->is('_inertia/*') || $request->is('dashboard/*') || $request->is('build/*')) {
            return $next($request);
        }

        // Log the visit
        Visit::create([
            'ip_address' => $request->ip(),
            'user_agent' => $request->header('User-Agent'),
            'url' => $request->fullUrl(),
            'user_id' => auth()->id(), // null if not logged in
        ]);

        return $next($request);
    }
}
