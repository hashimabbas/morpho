<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        // Dashboard always stays in English
        if ($request->is('dashboard*') || $request->route()?->named('dashboard.*')) {
            app()->setLocale('en');
            return $next($request);
        }

        $locale = $request->session()->get('locale', config('app.locale'));

        if (! in_array($locale, ['en', 'ar'])) {
            $locale = config('app.locale');
        }

        app()->setLocale($locale);

        return $next($request);
    }
}
