<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use App\Models\UserProject;
use Auth;

class ProjectController extends Controller
{
    public function index()
    {
        if (Auth::user()->role === 'manager') {
            return response()->json(Project::where('user_id', Auth::user()->id)->with('client')->with('user')->get());
        }

        if (Auth::user()->role === 'developer') {
            return response()->json(User::where('id', Auth::user()->id)->with('project.user')->with('client')->first()->project);
        }
        
        if (Auth::user()->role === 'client') {
            return response()->json(Project::where('client_id', Auth::user()->id)->with('client')->with('user')->get());
        }
    }

    public function assignDeveloper(Request $request)
    {
        if (Auth::user()->role === 'manager') {
            $data  = $request;
            UserProject::create([
                'project_id' => $data['project_id'],
                'user_id' => $data['user_id'],
            ]);

            return response()->json(Project::where('id', $data['project_id'])->first());
        }
    }

    public function getAllDevelopers($project_id)
    {
            $developers = Project::where('id', $project_id)->with('developer')->first()->developer;

            return response()->json($developers);
    }

    public function getAllClients()
    {
        if (Auth::user()->role === 'manager') {
            $clients = User::where('role', 'client')->get();

            return response()->json($clients);
        }
    }

    public function store(Request $request)
    {
        if (Auth::user()->role === 'manager') {
            $data  = $request;
            return response()->json(Project::create([
                'name' => $data['name'],
                'user_id' => Auth::user()->id,
                'client_id' => $data['client_id'],
            ]));
        }
        
        return response()->json(['message' => 'Not allowed']);
    }

}
