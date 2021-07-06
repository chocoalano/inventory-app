<?php

namespace App\Repositories;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;

class AppRepository
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }
    public function getall()
    {
      try {
          return $this->model->all();
      } catch (\Exception $e) {
          return response()->json(['message' => $e->getMessage()], $e->getStatus());
      }
    }
    public function getWhere($q)
    {
      try {
          return $this->model->where($q)->get();
      } catch (\Exception $e) {
          return response()->json(['message' => $e->getMessage()], $e->getStatus());
      }
    }
    public function paginate($search)
    {
      try {
          $u = $this->model->orderBy('created_at', 'DESC');
          if ($search != '') {
              $u = $u->where('name', 'LIKE', '%' . $search . '%');
          }
          return $u->paginate(10);
      } catch (\Exception $e) {
          return response()->json(['message' => $e->getMessage()], $e->getStatus());
      }
    }
    public function store($attributes)
    {
        try {
            $this->model->create($attributes);
            return response()->json(['status' => 'success', 'msg' => 'Data created is successfuly.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatus());
        }
    }
    public function update($id, $attributes)
    {
        try {
            $this->model->findOrFail($id)->update($attributes);
            return response()->json(['status' => 'success', 'msg' => 'Data updated is successfuly.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatus());
        }
    }
    public function show($id)
    {
        try {
            return $this->model->findOrFail($id);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatus());
        }
    }
    public function delete($id)
    {
        try {
            $this->model->destroy($id);
            return response()->json(['status' => 'success', 'msg' => 'Data deleted is successfuly.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatus());
        }
    }
    public function multi_delete($data)
    {
        try {
            foreach ($data as $k) {
              $d[]=$k['id'];
            }
            $this->model->whereIn('id', $d)->delete();
            return response()->json(['status' => 'success', 'msg' => 'Data deleted is successfuly.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatus());
        }
    }
}
