<?php

namespace App\Providers;

use App\Models\User;
use App\UserRole;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
        JsonResource::withoutWrapping();

        Gate::define("create-admin", function (User $user) {
            return $user->role === UserRole::SuperAdmin->value;
        });

        Gate::define("view-transactions", function (User $user) {
            return $user->role === UserRole::SuperAdmin->value;
        });


    }
}
