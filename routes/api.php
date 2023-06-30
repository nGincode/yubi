<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\Api\AccountsContactApi;
use App\Http\Controllers\Api\AccountsStoreApi;
use App\Http\Controllers\Api\AccountsGroupsApi;
use App\Http\Controllers\Api\AccountsUsersApi;
use Illuminate\Support\Str;

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

Route::post('/new_tokens_api', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});


Route::middleware('auth:sanctum')->get('/test', function (Request $request) {
    return $request->user()->id;
});


Route::get('/testapi', function (Request $request) {
});


Route::middleware('auth:sanctum')->group(
    function () {

        Route::controller(AccountsStoreApi::class)->group(
            function () {
                Route::post('/store/all', 'all');
                Route::post('/store/delete', 'delete');
                Route::post('/store/view', 'view');
                Route::post('/store/update', 'update');
                Route::post('/store/create', 'create');
            }
        );


        Route::controller(AccountsContactApi::class)->group(
            function () {
                Route::post('/contact/all', 'all');
                Route::post('/contact/delete', 'delete');
                Route::post('/contact/view', 'view');
                Route::post('/contact/update', 'update');
                Route::post('/contact/create', 'create');
            }
        );


        Route::controller(AccountsGroupsApi::class)->group(
            function () {
                Route::post('/groups/all', 'all');
                Route::post('/groups/delete', 'delete');
                Route::post('/groups/view', 'view');
                Route::post('/groups/update', 'update');
                Route::post('/groups/create', 'create');
            }
        );


        Route::controller(AccountsUsersApi::class)->group(
            function () {
                Route::post('/users/all', 'all');
                Route::post('/users/delete', 'delete');
                Route::post('/users/view', 'view');
                Route::post('/users/update', 'update');
                Route::post('/users/create', 'create');
            }
        );
    }
);
