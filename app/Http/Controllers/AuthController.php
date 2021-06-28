<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Spatie\Permission\Models\Permission;

class AuthController extends Controller
{
  public function login(Request $request)
  {
    $credentials = $request->only('email', 'password');
    try {
        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 400);
        }
    } catch (JWTException $e) {
        return response()->json(['error' => 'could_not_create_token'], 500);
    }
    return response()->json(compact('token'));
  }

  public function register(Request $request)
  {
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:50',
        'email' => 'required|string|email|max:50|unique:users',
        'password' => 'required|string|min:6',
    ]);
    if($validator->fails()){
        return response()->json($validator->errors()->toJson(), 400);
    }
    $user = User::create([
        'name' => $request->get('name'),
        'email' => $request->get('email'),
        'password' => Hash::make($request->get('password')),
    ]);
    $token = JWTAuth::fromUser($user);
    return response()->json(compact('user','token'),201);
  }

  public function logout() {
    auth()->logout();
    return response()->json(['message' => 'User successfully signed out']);
  }

  /**
   * Refresh a token.
   */
  public function refresh() {
    return $this->createNewToken(auth()->refresh());
  }

  /**
   * Get the authenticated User.
   */
  public function userProfile() {
      return response()->json(auth()->user());
  }

  /**
   * Get the token array structure.
   */
  protected function createNewToken($token){
    return response()->json([
      'access_token' => $token,
      'token_type' => 'bearer',
      'expires_in' => auth()->factory()->getTTL() * 60,
      'user' => auth()->user()
    ]);
  }
  /**
   * Get the getUserLogin array structure.
   */
  public function getUserLogin()
    {
        $user = request()->user();
        $permissions = [];
        foreach (Permission::all() as $permission) {
            if (request()->user()->can($permission->name)) {
                $permissions[] = $permission->name;
            }
        }
        $user['permission'] = $permissions;
        return response()->json(['status' => 'success', 'data' => $user]);
    }
}
