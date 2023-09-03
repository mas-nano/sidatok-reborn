<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;

class ResetPasswordController extends Controller
{
    public function forgot(Request $request): JsonResponse
    {
        $validated = $this->validate($request, [
            'email' => 'required|email:rfc,dns'
        ], [], [
            'email' => 'Email'
        ]);

        $status = Password::sendResetLink($validated);

        return $status === Password::RESET_LINK_SENT ? $this->responseSuccess('Reset link sent successfully') : $this->responseError(__($status), 401);
    }

    public function reset(Request $request): JsonResponse
    {
        $validated = $this->validate($request, [
            'token' => 'required',
            'email' => 'required|email:rfc,dns',
            'password' => 'required|confirmed',
            'password_confirmation' => 'required',
        ]);

        $status = Password::reset($validated, function (User $user, string $password) {
            $user->forceFill([
                'password' => bcrypt($password)
            ])->setRememberToken(Str::random(60));

            $user->save();

            event(new PasswordReset($user));
        });

        return $status === Password::PASSWORD_RESET ? $this->responseSuccess('Reset password successfully') : $this->responseError(__($status), 401);
    }
}
