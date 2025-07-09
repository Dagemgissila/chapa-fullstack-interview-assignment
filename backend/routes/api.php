<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\User\UserController;
use App\Http\Middleware\UserTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, "login"]);

Route::middleware("auth:sanctum")->group(function () {
    Route::post("/logout", [AuthController::class, "logout"]);

    Route::middleware("user_transaction")->group(function () {
        Route::get('/user-transaction', [UserController::class, "TransactionHistory"]);
        Route::post("/make-payment", [UserController::class, "store"]);
    });

    Route::middleware("admin")->group(function () {
        Route::get("/users", action: [AdminController::class, "users"]);
        Route::post("/change-status", [AdminController::class, "changeStatus"]);
        Route::get('/user/{user}/transactions', [AdminController::class, 'userTransactions']);
        Route::get("/stats", [AdminController::class, "stats"]);
        Route::post("/create-admin", [AdminController::class, "createAdmin"]);
        Route::get('/transactions', [AdminController::class, "Transactions"]);
    });

});