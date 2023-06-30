<?php

namespace Database\Seeders;

use App\Models\Contact;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Str;

use Faker\Factory as Faker;


use App\Models\GroupsUsers;
use App\Models\Groups;
use App\Models\User;
use App\Models\Store;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('id_ID');

        ///////////////////////////////////////////////////// SUPER ADMIN ////////////////////////
        User::create(
            [
                'uuid' => Str::uuid(),
                'username' => 'superadmin',
                'password' => bcrypt('superadmin'),
                'email' => 'superadmin@gmail.com',
                'email_verified_at' => date('Y-m-d H:i:s'),
                'remember_token' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')

            ]
        );

        $permessionSuperadmin = 'a:16:{i:0;s:18:"viewaccounts_users";i:1;s:20:"createaccounts_users";i:2;s:20:"updateaccounts_users";i:3;s:20:"deleteaccounts_users";i:4;s:18:"viewaccounts_store";i:5;s:20:"createaccounts_store";i:6;s:20:"updateaccounts_store";i:7;s:20:"deleteaccounts_store";i:8;s:19:"viewaccounts_groups";i:9;s:21:"createaccounts_groups";i:10;s:21:"updateaccounts_groups";i:11;s:21:"deleteaccounts_groups";i:12;s:20:"viewaccounts_contact";i:13;s:22:"createaccounts_contact";i:14;s:22:"updateaccounts_contact";i:15;s:22:"deleteaccounts_contact";}';

        Groups::create([
            'uuid' => Str::uuid(),
            'name' => 'Super Admin',
            'permission' => $permessionSuperadmin,
            'data' => 'All',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')

        ]);

        GroupsUsers::create([
            'uuid' => Str::uuid(),
            'users_id' => 1,
            'groups_id' => 1,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')

        ]);


        Contact::insert([
            'uuid' => Str::uuid(),
            'users_id' => 1,
            'store_id' => 1,
            'name' => "Fembi Nur Ilham",
            'code' =>  $faker->ean13(),
            'date_of_birth' => $faker->date(),
            'date_of_entry' => $faker->date('Y-m-d'),
            'birth_of_place' => $faker->country(),
            'religion' => 'Islam',
            'gender' => 'Male',
            'address' => $faker->address(),
            'whatsapp' => '085369957606',
            'position' => 'Owner',
            'division' => 'Founder',
            'free_voucher' => 1000000,
            'active' => 'True',
            'img' => $faker->imageUrl(),
        ]);

        ///////////////////////////////////////////////////// SUPER ADMIN ////////////////////////


        ///////////////////////////////////////////////////// DUMMY /////////////////////////////

        User::create(
            [
                'uuid' => Str::uuid(),
                'username' => 'leader',
                'password' => bcrypt('12345678'),
                'email' => 'leader@gmail.com',
                'email_verified_at' => date('Y-m-d H:i:s'),
                'remember_token' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')

            ]
        );
        User::create(
            [
                'uuid' => Str::uuid(),
                'username' => 'division',
                'password' => bcrypt('12345678'),
                'email' => 'division@gmail.com',
                'email_verified_at' => date('Y-m-d H:i:s'),
                'remember_token' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')

            ]
        );
        User::create(
            [
                'uuid' => Str::uuid(),
                'username' => 'pegawai',
                'password' => bcrypt('12345678'),
                'email' => 'pegawai@gmail.com',
                'email_verified_at' => date('Y-m-d H:i:s'),
                'remember_token' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')

            ]
        );


        $permessionPegawai = array(
            'createaccounts_users',
            'viewaccounts_users',
            'createaccounts_employe',
            'updateaccounts_employe',
            'deleteaccounts_employe',
            'viewaccounts_employe'
        );

        Groups::create([
            'uuid' => Str::uuid(),
            'name' => 'Leader',
            'permission' => serialize($permessionPegawai),
            'data' => 'Store',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')

        ]);
        Groups::create([
            'uuid' => Str::uuid(),
            'name' => 'Division',
            'permission' => serialize($permessionPegawai),
            'data' => 'Division',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')

        ]);
        Groups::create(
            [
                'uuid' => Str::uuid(),
                'name' => 'Pegawai',
                'data' => 'Private',
                'permission' => serialize($permessionPegawai),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')

            ]
        );


        Store::create(
            [
                'uuid' => Str::uuid(),
                'name' => 'CV Prima Rasa Selaras',
                'active' => 'True',
                'tipe' => 'Office',
                'address' => 'Nusa Indah',
                'whatsapp' => '0853',
                'setting' => '{"late_tolerance":"5","working_period":["1","Active","30"]}',

            ]
        );
        Store::create(
            [
                'uuid' => Str::uuid(),
                'name' => 'Well The Food',
                'active' => 'True',
                'tipe' => 'Outlet',
                'address' => 'Nusa Indah',
                'whatsapp' => '0853',
                'setting' => '{"late_tolerance":"5","working_period":["1","Active","30"]}',

            ]
        );
        Store::create(
            [
                'uuid' => Str::uuid(),
                'name' => 'Pentol Nona',
                'active' => 'True',
                'tipe' => 'Outlet',
                'address' => 'Sawah Lebar',
                'whatsapp' => '0853',
                'setting' => '{"late_tolerance":"5","working_period":["1","Active","30"]}',

            ]
        );
        Store::create(
            [
                'uuid' => Str::uuid(),
                'name' => 'Ramen Shoba',
                'active' => 'True',
                'tipe' => 'Outlet',
                'address' => 'Sawah Lebar',
                'whatsapp' => '0853',
                'setting' => '{"late_tolerance":"5","working_period":["1","Active","30"]}',

            ]
        );

        $jumlah = 50;

        for ($i = 1; $i <= $jumlah; $i++) {
            User::insert([
                'uuid' => Str::uuid(),
                'username' => $faker->userName(),
                'email' => $faker->unique()->email(),
                'email_verified_at' => now(),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'remember_token' => Str::random(10),
            ]);


            if ($i !== 1)
                GroupsUsers::create(
                    [
                        'uuid' => Str::uuid(),
                        'users_id' => $i,
                        'groups_id' => 4,
                        'created_at' => date('Y-m-d H:i:s'),
                        'updated_at' => date('Y-m-d H:i:s')

                    ]
                );
        }

        for ($i = 1; $i <= $jumlah; $i++) {
            Store::insert([
                'uuid' => Str::uuid(),
                'name' => $faker->company(),
                'tipe' => 'Outlet',
                'address' => $faker->address(),
                'whatsapp' => '085369957606',
                'img' => $faker->imageUrl(),
                'setting' => '{"late_tolerance":"5","working_period":["1","Active","30"]}',
                'active' => 'true',
            ]);
        }

        for ($i = 2; $i <= $jumlah; $i++) {
            Contact::insert([
                'uuid' => Str::uuid(),
                'users_id' => $i,
                'store_id' => 1,
                'name' => $faker->name(),
                'code' =>  $faker->ean13(),
                'date_of_birth' => $faker->date(),
                'date_of_entry' => $faker->date('Y-m-d'),
                'birth_of_place' => $faker->country(),
                'religion' => 'Islam',
                'gender' => 'Male',
                'address' => $faker->address(),
                'whatsapp' => '085369957606',
                'position' => 'Owner',
                'division' => 'Founder',
                'free_voucher' => 1000000,
                'active' => 'True',
                'img' => $faker->imageUrl(),
            ]);
        }
    }
}
