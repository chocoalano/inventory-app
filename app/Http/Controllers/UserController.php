<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Users\UserRepository;
use App\Repositories\Roles\RoleRepository;
use App\Http\Resources\ApiCollection;
use Hash;

class UserController extends Controller
{
  protected $user;
  protected $role;
  function __construct(UserRepository $user, RoleRepository $role)
  {
       $this->user = $user;
       $this->role = $role;
       $this->middleware('permission:user-list|user-create|user-edit|user-delete', ['only' => ['index','store']]);
       $this->middleware('permission:user-create', ['only' => ['store']]);
       $this->middleware('permission:user-edit', ['only' => ['edit','update']]);
       $this->middleware('permission:user-delete', ['only' => ['destroy']]);
  }
  public function getAllRole()
  {
      $r = $this->role->getall();
      return response()->json(['status' => 'success', 'data' => $r]);
  }

  public function index()
  {
      return new ApiCollection($this->user->paginate(request()->q));
  }

  public function store(Request $request)
  {
      $this->validate($request, [
        'name' => 'required|unique:users,name|string|max:150',
        'email' => 'required|email',
        'roles'=> 'required'
      ]);
      $input=$request->all();
      $userData=['name'=>$input['name'],'email'=>$input['email'],'password'=>Hash::make('123456')];
      $roles=$input['roles'];
      return $this->user->storeUsersAndRoles($userData, $roles);
   }

   public function edit($id)
   {
      return $this->user->show($id);
   }

   public function update(Request $request,$id)
   {
     $this->validate($request, [
       'name' => 'required|string|max:150',
       'email' => 'required|email',
       'roles'=> 'required'
     ]);
     $input=$request->all();
     $attributes=['data'=>$input, 'roles'=>$input['roles'], 'id'=>$id];
     return $this->user->updateUsersAndRoles($attributes);
   }
   public function destroy($id)
   {
     return $this->user->delete($id);
   }
   public function removeSelect(Request $request)
   {
     return $this->user->multi_delete($request->all());
   }
}
