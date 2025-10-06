@echo off
D:\xampp\php\php.exe artisan make:model Department -m
D:\xampp\php\php.exe artisan make:model Attendance -m
D:\xampp\php\php.exe artisan make:controller API\AuthController
D:\xampp\php\php.exe artisan make:controller API\DepartmentController --api
D:\xampp\php\php.exe artisan make:controller API\UserController --api
D:\xampp\php\php.exe artisan make:controller API\AttendanceController --api
D:\xampp\php\php.exe artisan make:resource UserResource
D:\xampp\php\php.exe artisan make:resource DepartmentResource
D:\xampp\php\php.exe artisan make:resource AttendanceResource
D:\xampp\php\php.exe artisan make:factory DepartmentFactory --model=Department
D:\xampp\php\php.exe artisan make:factory UserFactory --model=User
D:\xampp\php\php.exe artisan make:factory AttendanceFactory --model=Attendance
D:\xampp\php\php.exe artisan make:middleware EnsureRole
pause