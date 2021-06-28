<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ApiCollection;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use DB;

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
  public function store(Request $request)
  {
    $this->validate($request, [
        'name' => 'required'
    ]);
    Role::create(['name'=>$request->name]);
    $find = Role::where('name', $request->name)->first();
    $role = Role::findOrFail($find->id);
    $role->syncPermissions($request->permission);
    return response()->json(['status' => 'success', 'msg' => 'Data created is successfuly.'], 200);
  }
  public function edit($id)
  {
    $role=Role::findOrFail($id);
    $hasPermission = DB::table('role_has_permissions')
            ->select('permissions.id')
            ->join('permissions', 'role_has_permissions.permission_id', '=', 'permissions.id')
            ->where('role_id', $id);
        $count=$hasPermission->count();
        if ($count > 0) {
          $get=$hasPermission->get();
          foreach ($get as $k => $v) {
            $p[]=$v->id;
          }
        }else {
          $p=[];
        }
        $data = array('name' => $role->name, 'permission'=> $p);
        return response()->json(['status' => 'success', 'data' => $data]);
  }
  public function update(Request $request, $id)
  {
    try {
      $find=Role::findOrFail($id);
      $find->update(['name'=>$request->input('name')]);
      $find->syncPermissions($request->permission);
      return response()->json(['status' => 'success', 'msg' => 'Data created is successfuly.'], 200);
    } catch (\Exception $e) {
      return response()->json(['message' => $e->getMessage()], $e->getStatus());
    }
  }
  public function destroy($id)
  {
    try {
      Role::findOrFail($id)->delete();
      return response()->json(['status' => 'success', 'msg' => 'Data deleted is successfuly.'], 200);
    } catch (\Exception $e) {
      return response()->json(['message' => $e->getMessage()], $e->getStatus());
    }

  }
  public function removeSelect(Request $request)
  {
    $input=$request->all();
    foreach ($input as $k) {
      $data[]=$k['id'];
    }
    try {
      Role::whereIn('id', $data)->delete();
      return response()->json(['status' => 'success', 'msg' => 'Data deleted is successfuly.'], 200);
    } catch (\Exception $e) {
      return response()->json(['message' => $e->getMessage()], $e->getStatus());
    }

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
