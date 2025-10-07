<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Department;
use Illuminate\Validation\ValidationException;

class DepartmentController extends Controller
{
    // PRIKAŽI SVE DEPARTMANE
    public function index()
    {
        try {
            $departments = Department::with('users')->get();
            return response()->json($departments, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // KREIRAJ NOVI DEPARTMAN
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:departments',
            ]);

            $department = Department::create($validated);

            return response()->json($department, 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // PRIKAŽI JEDAN DEPARTMAN
    public function show($id)
    {
        $department = Department::with('users')->find($id);

        if (!$department) {
            return response()->json(['message' => 'Department not found'], 404);
        }
        return response()->json($department);
    }

    // AŽURIRAJ DEPARTMAN
    public function update(Request $request, $id)
    {
        $department = Department::find($id);
        if (!$department) {
            return response()->json(['message' => 'Department not found'], 404);
        }

        try {
            $validated = $request->validate([
                'name' => 'sometimes|string|max:255|unique:departments,name,' . $id,
            ]);

            $department->update($validated);

            return response()->json($department);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // OBRIŠI DEPARTMAN
    public function destroy($id)
    {
        $department = Department::find($id);
        if (!$department) {
            return response()->json(['message' => 'Department not found'], 404);
        }

        $department->delete();
        return response()->json(['message' => 'Department deleted successfully']);
    }
}
