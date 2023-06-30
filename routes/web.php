<?php

use App\Http\Controllers\Dashboard;
use App\Http\Controllers\Accounts;

use Illuminate\Support\Str;

use App\Models\Store;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

require __DIR__ . '/auth.php';

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
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::get('/test', function () {
});




Route::middleware(['auth', 'verified'])->group(function () {


    Route::controller(Dashboard::class)->group(
        function () {
            Route::get('/dashboard', 'index')->name('dashboard');
        }
    );

    Route::controller(Accounts::class)->group(
        function () {
            Route::get('/accounts_users', 'Users')->name('accounts_users');
            Route::get('/accounts_groups', 'Groups')->name('accounts_groups');
            Route::get('/accounts_store', 'Store')->name('accounts_store');
            Route::get('/accounts_contact', 'Contact')->name('accounts_contact');
        }
    );
});
