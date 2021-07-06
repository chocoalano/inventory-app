<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ApiCollection;
use App\Repositories\Menu\MenuRepository;
use App\Repositories\Permission\PermissionRepository;
use App\Models\Menu;

class MenuController extends Controller
{
    protected $menu;
    protected $permission;
    function __construct(MenuRepository $menu, PermissionRepository $permission)
    {
         $this->menu = $menu;
         $this->permission = $permission;
         $this->middleware('permission:menu-list|menu-create|menu-edit|menu-delete', ['only' => ['index']]);
         $this->middleware('permission:menu-create', ['only' => ['store']]);
         $this->middleware('permission:menu-edit', ['only' => ['edit','update']]);
         $this->middleware('permission:menu-delete', ['only' => ['destroy']]);
    }

    public function getAuthorization()
    {
        return $this->permission->getall();
    }

    public function getMenu()
    {
        return response()->json($this->menu->getmenu(), 200);
    }

    public function index()
    {
        return new ApiCollection($this->menu->paginate(request()->q));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
          'name' => 'required|string|max:150',
          'type' => 'required|string|max:150',
          'icon'=> 'required|string|max:150',
          'authorization'=> 'required|string|max:150',
        ]);
        return $this->menu->store($request->all());
    }

    public function edit($id)
    {
        return $this->menu->show($id);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
          'name' => 'required|string|max:150',
          'type' => 'required|string|max:150',
          'icon'=> 'required|string|max:150',
          'authorization'=> 'required|string|max:150',
        ]);
        return $this->menu->update($id, $request->all());
    }

    public function destroy($id)
    {
      return $this->menu->delete($id);
    }

    public function multidestroy(Request $request)
    {
      return $this->menu->multi_delete($request->all());
    }
}
