<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Auth;

class ApiAuthController extends Controller
{
    public function signup(Request $request)
    {
        $data = $request;

        if ( empty($data['name']) ||  empty($data['email']) ||  empty($data['role']) ||  empty($data['password']) ) {
            return response()->json(["msg" => "Please enter all fiedls"], 400);
        }
        
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL) 
        || !preg_match('/@.+\./', $data['email'])) {
            return response()->json(["msg" => "Invalid email id"], 400);
        }

        $userCheck = User::where('email', $data['email'])->get('email')->first();
        if ($userCheck === null) {
            $createUser = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'role' => strtolower($data['role']),
                'password' => Hash::make($data['password']),
                'api_token' => Str::random(60),
            ]);

            if ($createUser) {
                return response()->json(["msg" => "Registered successfully..."]);
            }
        }
        
        return response()->json(["msg" => "User already exists!"], 400);
    }

    public function login(Request $request)
    {
        $data = $request;
        if (empty($data['email']) || empty($data['password'])) {
            return response()->json(['msg' => 'Both the fiedls are required'], 400);
        }
        
        if (Auth::attempt($request->only('email','password'))) {
            $user = User::where('email', $request->email)->first();

            $entry = User::find($user->id);
            $entry->api_token = Str::random(60);
            $entry->save();

            return response()->json($entry);
        }

        return response()->json(['msg' => 'Invalid credentials'], 400);
    }
}
