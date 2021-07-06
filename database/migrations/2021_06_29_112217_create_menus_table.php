<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('menus', function (Blueprint $table) {
          $table->bigIncrements('id');
          $table->string('name',30);
          $table->enum('type',['main-menu','sub-menu']);
          $table->integer('extend');
          $table->string('icon',25);
          $table->string('link',20);
          $table->string('authorization',30);
          $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menus');
    }
}
