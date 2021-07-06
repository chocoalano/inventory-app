<?php

namespace App\Repositories\Users;
use App\Repositories\AppRepository;
use App\Models\User;
use DB;
class UserRepository extends AppRepository
{
  protected $model;

  public function __construct(User $model)
  {
      $this->model = $model;
  }
  public function storeUsersAndRoles($attributes, $roles)
  {
    try {
      $user = $this->model->create($attributes);
      $user->assignRole($roles);
      return response()->json(['status' => 'success', 'msg' => 'Data created is successfuly.'], 200);
    } catch (\Exception $e) {
      return response()->json(['message' => $e->getMessage()], $e->getStatus());
    }
  }
  public function updateUsersAndRoles($attributes)
  {
    try {
      $user = $this->model->findOrFail($attributes['id']);
      $user->update($attributes['data']);
      if(!empty($attributes['roles'])){
          DB::table('model_has_roles')->where('model_id',$attributes['id'])->delete();
          $user->assignRole($attributes['roles']);
      }
      return response()->json(['status' => 'success', 'msg' => 'Data created is successfuly.'], 200);
    } catch (\Exception $e) {
      return response()->json(['message' => $e->getMessage()], $e->getStatus());
    }
  }
}
