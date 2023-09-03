<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $validated = $this->validate($request, [
            'email' => 'required',
            'password' => 'required',
            'remember' => 'nullable'
        ], [], [
            'email' => 'Email',
            'password' => 'Kata sandi',
        ]);

        $token = Auth::attempt(['email' => $validated['email'], 'password' => $validated['password']]);
        if (!$token) {
            return $this->responseError('Email atau kata sandi Anda salah', 401);
        }

        return $this->responseSuccess('Login successfully', [
            'user' => Auth::user(),
            'token' => $token
        ]);
    }

    public function register(Request $request): JsonResponse
    {
        $validated = $this->validate($request, [
            'email' => 'required|email:rfc,dns|unique:users',
            'password' => 'required',
            'password_confirmation' => 'required',
            'name' => 'required'
        ], [], [
            'email' => 'Email',
            'password' => 'Kata sandi',
            'password_confirmation' => 'Konfirmasi Kata sandi',
            'name' => 'Nama lengkap',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'password' => bcrypt($validated['password']),
            'email' => $validated['email']
        ]);

        event(new Registered($user));
        $token = Auth::login($user);

        return $this->responseSuccess('Register successfully', [
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(): JsonResponse
    {
        Auth::logout();
        return $this->responseSuccess('Logout successfully');
    }

    public function refresh(): JsonResponse
    {
        $data = [
            'token' => Auth::refresh(),
            'type' => 'Bearer'
        ];
        return $this->responseSuccess('Refresh token successfully', $data);
    }
}
