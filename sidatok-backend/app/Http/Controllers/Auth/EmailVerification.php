<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmailVerification extends Controller
{
    public function sendVerification(Request $request): JsonResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return $this->responseError('Email verified', 401);
        }

        $request->user()->sendEmailVerificationNotification();

        return $this->responseSuccess('Email verification sent successfully');
    }

    public function verify(Request $request): JsonResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return $this->responseError('Email verified', 401);
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return $this->responseSuccess('Email verified successfully');
    }
}
