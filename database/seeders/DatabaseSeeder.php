<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Department;
use App\Models\Attendance;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Kreiraj departmane
        $it = Department::create(['name' => 'IT']);
        $marketing = Department::create(['name' => 'Marketing']);
        $hr = Department::create(['name' => 'HR']);

        // Kreiraj korisnike
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'department_id' => $it->id,
        ]);

        $nikola = User::create([
            'name' => 'Nikola',
            'email' => 'nikola@example.com',
            'password' => Hash::make('password'),
            'role' => 'employee',
            'department_id' => $marketing->id,
        ]);

        $mila = User::create([
            'name' => 'Mila',
            'email' => 'mila@example.com',
            'password' => Hash::make('password'),
            'role' => 'manager',
            'department_id' => $hr->id,
        ]);

        // Dodaj par evidencija prisustva
        Attendance::create([
            'user_id' => $nikola->id,
            'date' => '2025-10-06',
            'status' => 'present',
        ]);

        Attendance::create([
            'user_id' => $mila->id,
            'date' => '2025-10-07',
            'status' => 'absent',
        ]);
    }
}

