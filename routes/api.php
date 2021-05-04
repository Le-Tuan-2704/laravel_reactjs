<?php

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'Api\UserController@login');
Route::post('register', 'Api\UserController@register');

Route::get('test', function () {
    return 1;
});

Route::apiResource('websites', 'Api\WebsitesController');

Route::get('trangchu', 'Api\TrangChuController@index');
Route::get('trangchu/checkWebsites', 'Api\TrangChuController@checkWebsites');