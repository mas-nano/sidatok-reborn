<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\EmailVerification;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('/auth')->controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::middleware(['api', 'jwt'])->controller(EmailVerification::class)->group(function () {
        Route::post('verify-email/{id}/{hash}', 'verify')->name('verification.verify');
        Route::post('resend-verify-email', 'sendVerification');
    });
    Route::post('refresh', 'refresh')->middleware(['api', 'jwt']);
});

Route::prefix('/auth')->controller(ResetPasswordController::class)->group(function () {
    Route::post('forgot-password', 'forgot');
    Route::post('reset-password', 'reset');
});

Route::middleware(['api', 'jwt', 'teams'])->group(function () {
    Route::prefix('/user')->controller(UserController::class)->group(function () {
        Route::get('me', 'me');
    });
    Route::prefix("/shop")->controller(ShopController::class)->group(function () {
        Route::post('create', 'create');
    });
    Route::prefix("/item")->controller(ItemController::class)->group(function () {
        Route::get("", "index");
        Route::post("create", "create");
        Route::get("{item:uuid}", "show");
        Route::put("{item:uuid}", "update");
        Route::delete("{item:uuid}", "delete");
    });
});
