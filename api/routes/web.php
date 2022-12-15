<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ProfileController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (null !== ($user = Auth::user())) {
        return view('dashboard');
    } else {
        return redirect()->route('login');
    }
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/listpost', [PostController::class, 'listpost'])->name('listpost');
    Route::get('/detailpost', [PostController::class, 'detailpost'])->name('detailpost');
    Route::get('/searchpost', [PostController::class, 'search'])->name('searchpost');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('entreprises', function () {
        $entreprises = User::where('role_id', 2)->get();
        return view('entreprises', compact('entreprises'));
    })->name('entreprises');
    Route::get('entreprise/{id}', function ($id) {
        $entreprise = User::where('id', $id)->first();
        return view('detail_entreprise', compact('entreprise'));
    })->name('entreprise.detail');
    Route::post('/updateProfile', [ProfileController::class, 'updateEntreprise'])->name('updateProfile');
    
});

require __DIR__ . '/auth.php';

//--Routes Posts-----
