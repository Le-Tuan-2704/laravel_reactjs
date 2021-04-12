<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SessionUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SessionUsersController extends Controller
{
    public function checkToken(Request $request)
    {
        $token = $request->header('token');
        $checkTokenIsValid = SessionUsers::where('token', $token)->first();
        if (empty($token)) {
            return response()->json([
                'code' => 401,
                'message' => 'loi get token'
            ], 200);
        }
        if (empty($checkTokenIsValid)) {
            return response()->json([
                'code' => 200,
                'message' => 'token khong hop le'
            ], 200);
        }

        //
    }
}