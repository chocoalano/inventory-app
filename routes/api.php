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

Route::post('/register', 'AuthController@register');
Route::post('login', 'AuthController@login');
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('auth-user', 'AuthController@getAuthenticatedUser');
    Route::get('logout', 'AuthController@logout');
    Route::get('user-authenticated', 'AuthController@getUserLogin');
    Route::post('/users-all-remove', 'UserController@removeSelect');
    Route::get('/users-roles', 'UserController@getAllRole');
    Route::get('/roles-permission', 'RolesController@getPermission');
    Route::resource('/users', 'UserController');
    Route::resource('/roles', 'RolesController');
});
