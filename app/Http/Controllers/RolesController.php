<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ApiCollection;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesController extends Controller
{
  function __construct()
  {
       $this->middleware('permission:role-list|role-create|role-edit|role-delete', ['only' => ['index']]);
       $this->middleware('permission:role-create', ['only' => ['store']]);
       $this->middleware('permission:role-edit', ['only' => ['edit','update']]);
       $this->middleware('permission:role-delete', ['only' => ['destroy']]);
  }
  public function index()
  {
    try {
      $u = Role::orderBy('created_at', 'DESC');
      if (request()->q != '') {
          $u = $u->where('name', 'LIKE', '%' . request()->q . '%');
      }
      return new ApiCollection($u->paginate(5));
    } catch (\Exception $e) {
      return response()->json(['message' => $e->getMessage()], $e->getStatus());
    }
  }
  public function store()
  {

  }
  public function edit($id)
  {

  }
  public function update(Request $request, $id)
  {

  }
  public function destroy($id)
  {

  }
  public function getPermission()
  {
      try {
        $u = Permission::orderBy('created_at', 'DESC');
        if (request()->q != '') {
            $u = $u->where('name', 'LIKE', '%' . request()->q . '%');
        }
        return new ApiCollection($u->paginate(5));
      } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], $e->getStatus());
      }
  }
}
