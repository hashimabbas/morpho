<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreTeamMemberRequest;
use App\Http\Requests\Dashboard\UpdateTeamMemberRequest;
use App\Models\TeamMember;
use Inertia\Inertia;
use Inertia\Response;

class TeamMemberController extends Controller
{
    public function index(): Response
    {
        $teamMembers = TeamMember::orderBy('sort_order')->paginate(15)->withQueryString();
        return Inertia::render('Dashboard/TeamMembers', [
            'teamMembers' => $teamMembers,
        ]);
    }

    public function store(StoreTeamMemberRequest $request)
    {
        TeamMember::create($request->validated());
        return back()->with('success', 'Team Member created successfully.');
    }

    public function update(UpdateTeamMemberRequest $request, TeamMember $teamMember)
    {
        $teamMember->update($request->validated());
        return back()->with('success', 'Team Member updated successfully.');
    }

    public function destroy(TeamMember $teamMember)
    {
        $teamMember->delete();
        return back()->with('success', 'Team Member deleted successfully.');
    }
}
