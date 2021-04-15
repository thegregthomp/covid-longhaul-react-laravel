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
            $table->string('name')->nullable();
            $table->string('ip_address', 45);
            $table->string('age', 100);
            $table->string('race', 100);
            $table->string('gender', 100);
            $table->string('country');
            $table->date('infected_date');
            $table->boolean('fully_recovered');
            $table->string('recovery_percentage', 4);
            $table->string('weight', 20);
            $table->longText('story');
            $table->longText('treatment');


        });

        Schema::create('symptoms', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('symptoms_reference_id');
        });

        Schema::create('treatments', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('treatment_reference_id');
        });

        Schema::create('post_symptom', function (Blueprint $table) {
            $table->unsignedBigInteger('post_id');
            $table->unsignedBigInteger('symptom_id');
            $table->primary(['post_id','symptom_id']);
            $table->foreign('post_id')->references('id')->on('posts');
            $table->foreign('symptom_id')->references('id')->on('symptoms');
        });

        Schema::create('post_treatment', function (Blueprint $table) {
            $table->unsignedBigInteger('post_id');
            $table->unsignedBigInteger('treatment_id');
            $table->primary(['post_id','treatment_id']);
            $table->foreign('post_id')->references('id')->on('posts');
            $table->foreign('treatment_id')->references('id')->on('treatments');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('post_symptom');
        Schema::dropIfExists('post_treatment');
        Schema::dropIfExists('posts');
        Schema::dropIfExists('symptoms');
        Schema::dropIfExists('treatment');
    }
}
