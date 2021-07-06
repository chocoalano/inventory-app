<?php

namespace App\Repositories\Menu;
use App\Repositories\AppRepository;
use App\Models\Menu;

class MenuRepository extends AppRepository
{
  protected $model;

  public function __construct(Menu $model)
  {
      $this->model = $model;
  }
  public function getmenu()
  {
    $data=array();
    $m = $this->model->where(['type'=>'main-menu','extend'=>0])->get();
    foreach ($m as $k => $v) {
      $s = $this->model->where(['type'=>'sub-menu','extend'=>$v->id])->get();
      $x=[
            "id"=> $v->id,
            "name"=> $v->name,
            "type"=> $v->type,
            "extend"=> $v->extend,
            "icon"=> $v->icon,
            "link"=> $v->link,
            "authorization"=> $v->authorization,
            "created_at"=> $v->created_at,
            "updated_at"=> $v->updated_at,
            "extend"=>$s
        ];
      array_push($data,$x);
    }
    return $data;
  }
}
