<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            // Authenticated
            $user = Auth::user();
            $token = $user->createToken('YourAppName')->plainTextToken;

            return response()->json([
                'token' => $token,
            ], 200);
        }

        return response()->json(['message' => 'Failed to login. Check your valid credentials.'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete(); // Revoke all tokens for the user
        return response()->json(['message' => 'Logged out successfully']);
    }
}
