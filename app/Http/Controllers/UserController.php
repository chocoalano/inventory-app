<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UsersCollection;
use App\Models\User;

class UserController extends Controller
{
  public function index()
  {
    $u = User::orderBy('created_at', 'DESC');
    if (request()->q != '') {
        $u = $u->where('name', 'LIKE', '%' . request()->q . '%');
    }
    return new UsersCollection($u->paginate(10));
  }
}
