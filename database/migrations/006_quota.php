<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quota', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();

            $table->unsignedBigInteger('contact_id')->unique();
            $table->foreign('contact_id')->references('id')->on('contact');

            $table->unsignedBigInteger('store_id')->nullable();
            $table->foreign('store_id')->references('id')->on('store');

            $table->unsignedBigInteger('users_id')->unique();
            $table->foreign('users_id')->references('id')->on('users');

            $table->string('division', 50);

            $table->string('value');

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
        Schema::dropIfExists('quota');
    }
};
