<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OptionsController;
use App\Http\Controllers\PostsController;


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

Route::get('options', [OptionsController::class, 'index'])->name('api.options.show');
Route::get('posts', [PostsController::class, 'index'])->name('api.posts.index');
Route::get('posts/{id}', [PostsController::class, 'show'])->name('api.posts.show');
Route::post('posts', [PostsController::class, 'store'])->name('api.posts.store');
