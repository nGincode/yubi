<?php

namespace Database\Factories;

use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employe>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'users_id' => User::pluck('id')->random(),
            'store_id' => Store::all()->random()->id,
            'name' => $this->faker->name(),
            'code' =>  $this->faker->ean13(),
            'date_of_birth' => $this->faker->date(),
            'date_of_entry' => $this->faker->date('Y-m-d'),
            'birth_of_place' => $this->faker->country(),
            'religion' => 'Islam',
            'gender' => 'Male',
            'address' => $this->faker->address(),
            'whatsapp' => '085369957606',
            'position' => 'Owner',
            'division' => 'Founder',
            'free_voucher' => '123',
            'active' => 'True',
            'img' => $this->faker->imageUrl(),
        ];
    }
}
