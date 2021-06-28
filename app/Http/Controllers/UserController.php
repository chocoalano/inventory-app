<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ApiCollection;
use App\Models\User;
use App\Models\UserDetailRoleview;
use Spatie\Permission\Models\Role;
use Hash;
use DB;

class UserController extends Controller
{
  function __construct()
  {
       $this->middleware('permission:user-list|user-create|user-edit|user-delete', ['only' => ['index','store']]);
       $this->middleware('permission:user-create', ['only' => ['store']]);
       $this->middleware('permission:user-edit', ['only' => ['edit','update']]);
       $this->middleware('permission:user-delete', ['only' => ['destroy']]);
  }
  public function getAllRole()
  {
      try {
        $r = Role::all();
        return response()->json(['status' => 'success', 'data' => $r]);
      } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], $e->getStatus());
      }
  }
  public function index()
  {
      try {
        $u = User::orderBy('created_at', 'DESC');
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
        'name' => 'required|unique:users,name|string|max:150',
        'email' => 'required|email',
        'roles'=> 'required'
      ]);
      $input=$request->all();
      try {
          $user = User::create([
              'name' => $input['name'],
              'email' => $input['email'],
              'password' => Hash::make('123456')
          ]);
          $user->assignRole($input['roles']);
          return response()->json(['status' => 'success', 'msg' => 'Data created is successfuly.'], 200);
      } catch (\Exception $e) {
          return response()->json(['message' => $e->getMessage()], $e->getStatus());
      }

   }
   public function edit($id)
   {
      try {
          $user = UserDetailRoleview::where('id',$id)->first();
          $data=[
            'name'=>$user->name,
            'email'=>$user->email,
            'roles'=>$user->roleid,
          ];
          return response()->json($data, 200);
      } catch (\Exception $e) {
          return response()->json(['message' => $e->getMessage()], $e->getStatus());
      }
   }
   public function update(Request $request,$id)
   {
     $this->validate($request, [
       'name' => 'required|string|max:150',
       'email' => 'required|email',
       'roles'=> 'required'
     ]);
      $input=$request->all();
      try {
          $user = User::find($id);
          $user->update([
            'name' => $input['name'],
            'email' => $input['email']
          ]);
          $user->assignRole($input['roles']);
          return response()->json(['status' => 'success', 'msg' => 'Data updated is successfuly.'], 200);
      } catch (\Exception $e) {
          return response()->json(['message' => $e->getMessage()], $e->getStatus());
      }
   }
   public function destroy($id)
   {
     try {
       $find=User::findOrFail($id);
       $find->delete();
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
           $find=User::whereIn('id', $data);
           $find->delete();
           return response()->json(['status' => 'success', 'msg' => 'Data deleted is successfuly.'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatus());
        }
   }
}
