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
        Schema::create('contact', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();
            $table->unsignedBigInteger('users_id')->nullable()->unique();
            $table->foreign('users_id')->references('id')->on('users');
            $table->unsignedBigInteger('store_id')->nullable();
            $table->foreign('store_id')->references('id')->on('store');
            $table->string('name', 50);
            $table->string('code', 20)->unique();
            $table->date('date_of_birth');
            $table->date('date_of_entry');
            $table->string('birth_of_place');
            $table->string('religion', 20);
            $table->enum('gender', ['Female', 'Male']);
            $table->string('address');
            $table->string('whatsapp', 15);
            $table->string('position', 50);
            $table->string('division', 50);
            $table->bigInteger('free_voucher')->nullable();
            $table->enum('active', ['True', 'False']);
            $table->string('img')->nullable();
            $table->unsignedBigInteger('wage_base_salary_id')->nullable();
            $table->foreign('wage_base_salary_id')->references('id')->on('wage_base_salary');
            $table->boolean('delete')->default(false);
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
        Schema::dropIfExists('contact');
    }
};
