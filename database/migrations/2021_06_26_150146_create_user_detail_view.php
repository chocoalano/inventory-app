<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserDetailView extends Migration
{
  /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('CREATE OR REPLACE VIEW user_detail_role_view
            AS SELECT users.id,
                      users.name,
                      users.email,
                      roles.id AS roleid,
                      roles.name AS rolename
                      FROM users JOIN
                      model_has_roles ON model_has_roles.model_id=users.id
                      JOIN roles ON roles.id=model_has_roles.role_id');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_detail_role_view');
    }
}
