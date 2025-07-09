<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\User;
use App\UserRole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where("role", UserRole::User)->get();

        foreach ($users as $user) {
            foreach (range(1, 5) as $i) {
                Transaction::create([
                    'user_id' => $user->id,
                    'currency' => 'ETB',
                    'amount' => fake()->randomFloat(2, 10, 1000),
                    'status' => fake()->randomElement(['pending', 'paid', 'failed']),
                    'reference' => fake()->uuid(),
                    'payment_method' => fake()->randomElement(['CBE', 'Awash', 'BOA']),
                ]);
            }
        }
    }

}
