<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    public function project() {
        return $this->belongsToMany(Project::class, "user_projects", "user_id"); //for project developer
    }

    public function managedProject() {
        return $this->hasMany(Project::class, "user_id"); //for project developer
    }

    public function task() {
        return $this->hasMany(Project::class); //for project developer
    }

    protected $fillable = [
        'name', 'email', 'password', 'api_token', 'role',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
