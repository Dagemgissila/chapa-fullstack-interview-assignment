<?php

namespace Database\Seeders;

use App\Models\User;
use App\UserRole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(20)->create();
        // Super Admin
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'role' => UserRole::SuperAdmin,
            'password' => bcrypt('password'),

        ]);

        //admin

        User::factory()->create([
            "name" => "Admin",
            "email" => "admin@example.com",
            "role" => UserRole::Admin,
            "password" => bcrypt("password")
        ]);


        User::factory()->create([
            "name" => "Admin",
            "email" => "user@example.com",
            "role" => UserRole::User,
            "password" => bcrypt("password")
        ]);



    }
}
