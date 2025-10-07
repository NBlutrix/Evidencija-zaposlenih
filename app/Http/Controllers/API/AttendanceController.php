<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendance;

class AttendanceController extends Controller
{
    // PRIKAŽI SVE EVIDENCIJE
    public function index(Request $request)
    {
        $query = Attendance::query();

    // Filtriranje po korisniku
    if ($request->has('user_id')) {
        $query->where('user_id', $request->user_id);
    }

    // Filtriranje po datumu
    if ($request->has('date')) {
        $query->where('date', $request->date);
    }

    // Filtriranje po statusu
    if ($request->has('status')) {
        $query->where('status', $request->status);
    }

    // Sortiranje po datumu (asc ili desc)
    $sort = $request->get('sort', 'asc'); // podrazumevano asc
    $query->orderBy('date', $sort);

    // Eager load korisnika
    $attendances = $query->with('user')->get();

    return response()->json($attendances, 200);
    }

    // KREIRAJ NOVU EVIDENCIJU
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'status' => 'required|in:present,absent,leave',
        ]);

        $attendance = Attendance::create($validated);
        return response()->json($attendance, 201);
    }

    // PRIKAŽI JEDNU EVIDENCIJU
    public function show($id)
    {
        $attendance = Attendance::find($id);
        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }
        return response()->json($attendance);
    }

    // AŽURIRAJ EVIDENCIJU
    public function update(Request $request, $id)
    {
        $attendance = Attendance::find($id);
        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }

        $validated = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'date' => 'sometimes|date',
            'status' => 'sometimes|in:present,absent,leave',
        ]);

        $attendance->update($validated);
        return response()->json($attendance);
    }

    // OBRIŠI EVIDENCIJU
    public function destroy($id)
    {
        $attendance = Attendance::find($id);
        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }

        $attendance->delete();
        return response()->json(['message' => 'Attendance deleted successfully']);
    }
}
