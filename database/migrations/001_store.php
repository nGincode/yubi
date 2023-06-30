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
        Schema::create('store', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();

            $table->string('name', 50);
            $table->enum('active', ['True', 'False']);
            $table->string('tipe', 20);
            $table->string('address')->nullable();
            $table->string('img')->nullable();
            $table->string('whatsapp', 15)->nullable();
            $table->json('setting')->nullable();
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
        Schema::dropIfExists('store');
    }
};
