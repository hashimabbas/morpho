<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $admin = Role::firstOrCreate(['name' => 'super-admin']);

        $permissions = [
            'view dashboard',
            'view contacts',
            'create contacts',
            'edit contacts',
            'delete contacts',
            'view messages',
            'view demo requests',
            'view users',
            'create users',
            'edit users',
            'delete users',
            'view partners',
            'create partners',
            'edit partners',
            'delete partners',
            'view highlights',
            'create highlights',
            'edit highlights',
            'delete highlights',
            'view core purposes',
            'create core purposes',
            'edit core purposes',
            'delete core purposes',
            'view ecosystems',
            'create ecosystems',
            'edit ecosystems',
            'delete ecosystems',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $admin->givePermissionTo($permissions);

        $user = User::firstOrCreate(
            ['email' => 'hashim267303@gmail.com'],
            [
                'name' => 'Super Admin',
                'password' => bcrypt('2673031992'),
                'email_verified_at' => now(),
            ]
        );

        if (!$user->hasRole('super-admin')) {
            $user->assignRole('super-admin');
        }
    }
}
