<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StorePortfolioRequest;
use App\Http\Requests\Dashboard\UpdatePortfolioRequest;
use App\Models\Portfolio;
use App\Models\PortfolioImage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class PortfolioController extends Controller
{
    public function index(): Response
    {
        $portfolios = Portfolio::withCount('images')
            ->with('images')
            ->orderBy('sort_order')
            ->paginate(15)
            ->withQueryString()
            ->through(fn ($portfolio) => [
                'id' => $portfolio->id,
                'title' => $portfolio->title,
                'title_ar' => $portfolio->title_ar,
                'slug' => $portfolio->slug,
                'date' => $portfolio->date?->format('Y-m-d'),
                'cover_image' => $portfolio->cover_image,
                'is_visible' => $portfolio->is_visible,
                'sort_order' => $portfolio->sort_order,
                'images_count' => $portfolio->images_count,
                'images' => $portfolio->images->map(fn ($img) => [
                    'id' => $img->id,
                    'image' => $img->image,
                    'is_cover' => $img->is_cover,
                    'sort_order' => $img->sort_order,
                ]),
                'created_at' => $portfolio->created_at,
            ]);

        return Inertia::render('Dashboard/Portfolios', [
            'portfolios' => $portfolios,
        ]);
    }

    public function store(StorePortfolioRequest $request)
    {
        DB::transaction(function () use ($request) {
            $portfolio = Portfolio::create($request->safe()->except('images'));

            if ($request->has('images')) {
                foreach ($request->images as $index => $img) {
                    PortfolioImage::create([
                        'portfolio_id' => $portfolio->id,
                        'image' => $img['image'],
                        'is_cover' => $img['is_cover'] ?? false,
                        'sort_order' => $img['sort_order'] ?? $index,
                    ]);
                }
            }
        });

        return back()->with('success', 'Portfolio created successfully.');
    }

    public function update(UpdatePortfolioRequest $request, Portfolio $portfolio)
    {
        DB::transaction(function () use ($request, $portfolio) {
            $portfolio->update($request->safe()->except('images'));

            if ($request->has('images')) {
                $submittedIds = collect($request->images)->filter(fn ($img) => isset($img['id']))->pluck('id');
                $portfolio->images()->whereNotIn('id', $submittedIds)->delete();

                foreach ($request->images as $index => $img) {
                    if (isset($img['id'])) {
                        PortfolioImage::where('id', $img['id'])->where('portfolio_id', $portfolio->id)
                            ->update([
                                'image' => $img['image'],
                                'is_cover' => $img['is_cover'] ?? false,
                                'sort_order' => $img['sort_order'] ?? $index,
                            ]);
                    } else {
                        PortfolioImage::create([
                            'portfolio_id' => $portfolio->id,
                            'image' => $img['image'],
                            'is_cover' => $img['is_cover'] ?? false,
                            'sort_order' => $img['sort_order'] ?? $index,
                        ]);
                    }
                }
            }
        });

        return back()->with('success', 'Portfolio updated successfully.');
    }

    public function destroy(Portfolio $portfolio)
    {
        $portfolio->delete();
        return back()->with('success', 'Portfolio deleted successfully.');
    }
}
