<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/posts', [PostController::class, 'get'])->name('posts.list');
Route::post('/post', [PostController::class, 'add'])->name('posts.add');
Route::post('/register', [RegisterController::class, 'addUser'])->name('user.register');
Route::post('/login', [AuthenticatedSessionController::class, 'logUser'])->name('user.login');
Route::post('/logout', [AuthenticatedSessionController::class, 'logoutUser'])->name('user.logout');
Route::post('/send-mail', [PasswordResetLinkController::class, 'sendMailtoUser'])->name('user.sendMail');


