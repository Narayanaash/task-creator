<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public function user() {
        return $this->belongsTo(User::class); //for project manager
    }

    public function client() {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function developer() {
        return $this->belongsToMany(User::class, "user_projects","project_id"); //for project developer
    }

    public function task() {
        return $this->hasMany(Task::class);
    }

    protected $fillable = [
        'name', 'user_id', 'client_id',
    ];
    
}
