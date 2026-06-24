<?php

namespace App\Http\Controllers;

use App\Models\Ecosystem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SolutionController extends Controller
{
    public function show(Request $request, string $slug)
    {
        $ecosystem = Ecosystem::where('slug', $slug)
            ->where('is_visible', true)
            ->first();

        if (!$ecosystem) {
            abort(404);
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
            'ecosystem' => $ecosystem,
        ]);
    }
}
