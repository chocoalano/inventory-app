<?php

namespace App\Repositories\Roles;
use App\Repositories\AppRepository;
use Spatie\Permission\Models\Role;
use DB;

class RoleRepository extends AppRepository
{
  protected $model;

  public function __construct(Role $model)
  {
      $this->model = $model;
  }
  public function stored($attributes)
  {
    try {
      $role = $this->model->create(["name"=>$attributes['name']]);
      $find = $this->model->where('name', $attributes['name'])->first();
      $role = $this->model->findOrFail($find->id);
      $role->syncPermissions($attributes['permission']);
      return response()->json(['status' => 'success', 'msg' => 'Data created is successfuly.'], 200);
    } catch (\Exception $e) {
      return response()->json(['message' => $e->getMessage()], $e->getStatus());
    }
  }
  public function showRoles($id)
  {
    try {
      $role=$this->model->findOrFail($id);
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
      return response()->json(['status' => 'success', 'data' => $data],200);
    } catch (\Exception $e) {
      return response()->json(['message' => $e->getMessage()], $e->getStatus());
    }
  }
  public function updated($attributes,$id)
  {
    try {
      $find=$this->model->findOrFail($id);
      $find->update(['name'=>$attributes['name']]);
      $find->syncPermissions($attributes['permission']);
      return response()->json(['status' => 'success', 'msg' => 'Data updated is successfuly.'], 200);
    } catch (\Exception $e) {
      return response()->json(['message' => $e->getMessage()], $e->getStatus());
    }
  }
}
