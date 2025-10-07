<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\DepartmentController;
use App\Http\Controllers\API\AttendanceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// 📝 Auth rute
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);



// 🔒 Zaštićene rute – zahtevaju token
Route::middleware('auth:sanctum')->group(function () {

    // Dobavljanje trenutnog korisnika
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::get('/attendances/export-ics', [AttendanceController::class, 'exportIcs']);

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // CRUD rute za korisnike
    Route::apiResource('users', UserController::class);

    // CRUD rute za departmente
    Route::apiResource('departments', DepartmentController::class);

    // CRUD rute za prisustva
    Route::apiResource('attendances', AttendanceController::class);
});