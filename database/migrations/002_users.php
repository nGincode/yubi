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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();

            $table->string('username', 50)->unique();
            $table->string('password');
            $table->string('email')->unique();
            $table->string('last_login_at', 20)->nullable();
            $table->string('last_login_ip', 20)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('token_api')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
