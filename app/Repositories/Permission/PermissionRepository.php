<?php

namespace App\Repositories\Permission;
use App\Repositories\AppRepository;
use Spatie\Permission\Models\Permission;

class PermissionRepository extends AppRepository
{
  protected $model;

  public function __construct(Permission $model)
  {
      $this->model = $model;
  }
}
