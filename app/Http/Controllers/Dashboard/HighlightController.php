<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreHighlightRequest;
use App\Http\Requests\Dashboard\UpdateHighlightRequest;
use App\Models\Highlight;
use Inertia\Inertia;
use Inertia\Response;

class HighlightController extends Controller
{
    public function index(): Response
    {
        $highlights = Highlight::orderBy('sort_order')->orderBy('title')->paginate(15)->withQueryString();

        return Inertia::render('Dashboard/Highlights', [
            'highlights' => $highlights,
        ]);
    }

    public function store(StoreHighlightRequest $request)
    {
        Highlight::create($request->validated());

        return back()->with('success', 'Highlight created successfully.');
    }

    public function update(UpdateHighlightRequest $request, Highlight $highlight)
    {
        $highlight->update($request->validated());

        return back()->with('success', 'Highlight updated successfully.');
    }

    public function destroy(Highlight $highlight)
    {
        $highlight->delete();

        return back()->with('success', 'Highlight deleted successfully.');
    }
}
