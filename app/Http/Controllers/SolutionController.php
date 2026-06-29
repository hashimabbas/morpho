<?php

namespace App\Http\Controllers;

use App\Models\Ecosystem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SolutionController extends Controller
{
    public function show(Request $request, string $slug)
    {
        $locale = app()->getLocale();
        $ecosystem = Ecosystem::where('slug', $slug)
            ->where('is_visible', true)
            ->first();

        if (!$ecosystem) {
            abort(404);
        }

        $data = $ecosystem->toArray();

        if ($locale === 'ar') {
            if ($ecosystem->title_ar) $data['title'] = $ecosystem->title_ar;
            if ($ecosystem->description_ar) $data['description'] = $ecosystem->description_ar;
            if ($ecosystem->subtitle_ar) $data['subtitle'] = $ecosystem->subtitle_ar;
            if ($ecosystem->features_ar) $data['features'] = $ecosystem->features_ar;
            if ($ecosystem->content_ar) $data['content'] = $ecosystem->content_ar;
        }

        $pageMap = [
            'cold-chain' => 'ColdChain',
            'warehousing' => 'Warehousing',
            'agriculture' => 'Agriculture',
            'livestock' => 'Livestock',
            'marine' => 'Marine',
        ];

        $page = $pageMap[$slug] ?? 'SolutionDetail';

        return Inertia::render($page, [
            'ecosystem' => $data,
        ]);
    }
}
