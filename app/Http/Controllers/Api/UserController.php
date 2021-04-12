<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SessionUsers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function test()
    {
        return response()->json([
            "code" => 200,
            "message" => "test!"
        ], 200);
    }

    public function login(Request $req)
    {
        $checkUser = $req->only('email', 'password');

        if (Auth::attempt($checkUser)) {

            $checkTokenExit = SessionUsers::where('user_id', Auth::id())->first();
            if (empty($checkTokenExit)) {
                $userSession = SessionUsers::create([
                    'token' => Str::random(60),
                    'refresh_token' => Str::random(60),
                    'token_expried' => date('Y-m-d H:i:s', strtotime('+30 day')),
                    'refresh_token_expried' => date('Y-m-d H:i:s', strtotime('+365 day')),
                    'user_id' => Auth::id(),
                ]);
            } else {
                $userSession = $checkTokenExit;
            }
            return response()->json([
                'code' => 200,
                'data' => $userSession,
                'message' => 'dang nhap thanh cong'
            ], 200);
        } else {
            return response()->json([
                'code' => 401,
                'message' => 'username or pass khong dung'
            ], 200);
        }
    }

    public function register(Request $req)
    {
        $role = 1;
        $checkEmail = User::where('email', $req->email)->first();
        if (!empty($checkEmail)) {
            return response()->json([
                "code" => 404,
                "message" => "email da ton tai"
            ], 201);
        }

        $userCreate = User::create([
            'name' => $req->name,
            'email' => $req->email,
            'role' => $role,
            'password' => Hash::make($req->password)
        ]);

        return response()->json([
            'code' => 201,
            'data' => $userCreate,
            'message' => "tao thanh cong"
        ], 200);
    }
}