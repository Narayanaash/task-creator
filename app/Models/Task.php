<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    public function user() {
        return $this->belongsTo(App\Models\User::class); //for project manager
    }

    public function project() {
        return $this->belongsTo(App\Models\Project::class); //for project manager
    }

    protected $fillable = [
        'name', 'detail', 'project_id', 'status',
    ];
}
