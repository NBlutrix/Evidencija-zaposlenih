<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Department;

class DepartmentController extends Controller
{
    // PRIKAŽI SVE DEPARTMANE
    public function index()
    {
        return response()->json(Department::all(), 200);
    }

    // KREIRAJ NOVI DEPARTMAN
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:departments',
        ]);

        $department = Department::create($validated);
        return response()->json($department, 201);
    }

    // PRIKAŽI JEDAN DEPARTMAN
    public function show($id)
    {
        $department = Department::find($id);
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

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255|unique:departments,name,' . $id,
        ]);

        $department->update($validated);
        return response()->json($department);
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
