<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ApiCollection;
use App\Repositories\Roles\RoleRepository;
use App\Repositories\Permission\PermissionRepository;

class RolesController extends Controller
{
  protected $permission;
  protected $role;
  function __construct(RoleRepository $role, PermissionRepository $permission)
  {
    $this->role = $role;
    $this->permission = $permission;
       $this->middleware('permission:role-list|role-create|role-edit|role-delete', ['only' => ['index']]);
       $this->middleware('permission:role-create', ['only' => ['store']]);
       $this->middleware('permission:role-edit', ['only' => ['edit','update']]);
       $this->middleware('permission:role-delete', ['only' => ['destroy']]);
  }
  public function index()
  {
    return new ApiCollection($this->role->paginate(request()->q));
  }
  public function store(Request $request)
  {
    $this->validate($request, [
        'name' => 'required'
    ]);
    return $this->role->stored($request->all());
  }
  public function edit($id)
  {
    return $this->role->showRoles($id);
  }
  public function update(Request $request, $id)
  {
    return $this->role->updated($request->all(),$id);
  }
  public function destroy($id)
  {
    return $this->role->delete($id);
  }
  public function removeSelect(Request $request)
  {
    return $this->role->multi_delete($request->all());
  }
  public function getPermission()
  {
    return new ApiCollection($this->permission->paginate(request()->q));
  }
}
