<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            return (new MailMessage)->subject('Verifikasi Email')->line('Klik tombol dibawah ini untuk melakukan verifikasi email.')->line('Abaikan jika bukan Anda yang melakukan pengajuan verifikasi email')->action('Verifikasi Email', env('FRONTEND_URL', 'http://localhost') . '/auth/verify' . '?verify-url=' . $url);
        });

        ResetPassword::createUrlUsing(function (User $user, string $token) {
            return env('FRONTEND_URL', 'http://localhost') . '/auth/reset-password?token=' . $token;
        });
    }
}
