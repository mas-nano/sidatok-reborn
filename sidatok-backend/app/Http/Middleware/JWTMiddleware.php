<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class JWTMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return $next($request);
        } catch (Exception $e) {
            if ($e instanceof \PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException) {
                return $this->sendErrorToken('Token is Invalid');
            } else if ($e instanceof \PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException) {
                try {
                    if ($request->is('api/auth/refresh')) {
                        return $next($request);
                    } else {
                        $user = JWTAuth::parseToken()->authenticate();
                    }
                } catch (Exception $e) {
                    return $this->sendErrorToken('Token is Expired');
                }
            } else {
                return $this->sendErrorToken('Authorization Token not found');
            }
        }
    }

    public function sendErrorToken($msg): Response
    {
        return response()->json([
            'success' => false,
            'message' => $msg,
            'data' => null
        ], 401);
    }
}
