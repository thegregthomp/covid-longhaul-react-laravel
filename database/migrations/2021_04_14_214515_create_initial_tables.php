<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInitialTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title');
            $table->string('name')->nullable();
            $table->string('ip_address', 45);
            $table->string('age', 100);
            $table->string('race', 100);
            $table->string('gender', 100);
            $table->string('country');
            $table->timestamp('infected_date', $precision = 0);
            $table->boolean('fully_recovered');
            $table->string('recovery_percentage', 4)->nullable();
            $table->string('weight', 20);
            $table->longText('story');
            $table->string('treatments');
            $table->string('symptoms');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
