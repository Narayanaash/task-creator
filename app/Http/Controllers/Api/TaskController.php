<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;

class TaskController extends Controller
{
    public function index($project_id)
    {
        return response()->json(Task::where('project_id', $project_id)->get());
    }

    public function store(Request $request)
    {
        $projectExists = Project::find($request->$project_id);

        if ($projectExists) {
            $data  = $request;
            return response()->json(Task::create([
                'name' => $data['name'],
                'project_id' => $data['project_id'],
                'detail' => $data['detail'],
                'user_id' => $data['user_id'],
                'status' => $data['status'],
            ]));
        }
        
    }

    public function changeStatus(Request $request)
    {
        $data = $request;
        $entry = Task::find($data['task_id']);
        $entry->status = $data['status'];
        $entry->save();

        return response()->json($enrty);
    }

}
