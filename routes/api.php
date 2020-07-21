<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('Api')->group(function(){
    Route::post('/signup', 'ApiAuthController@signup');
    Route::post('/login', 'ApiAuthController@login');
});

Route::middleware('auth:api')->namespace('Api')->group(function(){
    Route::get('/projects', 'ProjectController@index');
    Route::post('/projects', 'ProjectController@store');
    Route::get('/projects/{p_id}/tasks', 'TaskController@index');
    Route::post('/projects/tasks', 'TaskController@store');
    Route::get('/projects/{p_id}/developers', 'ProjectController@getAllDevelopers');
    Route::post('/projects/developers/assign', 'ProjectController@assignDeveloper');
    Route::post('/projects/task/status', 'TaskController@changeStatus');
    Route::get('/get-clients', 'ProjectController@getAllClients');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
