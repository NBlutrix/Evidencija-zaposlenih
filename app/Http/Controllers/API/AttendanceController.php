<?php

namespace App\Http\Controllers\API;

use Spatie\IcalendarGenerator\Components\Calendar;
use Spatie\IcalendarGenerator\Components\Event;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendance;
use Illuminate\Validation\ValidationException;

class AttendanceController extends Controller
{
    // PRIKAŽI SVE EVIDENCIJE
    public function index(Request $request)
    {
        try {
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
            $attendances = $query->with('user')->paginate(10);

            return response()->json($attendances, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // KREIRAJ NOVU EVIDENCIJU
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'date' => 'required|date',
                'status' => 'required|in:present,absent,leave',
                'arrival_time' => 'nullable|date_format:H:i',
                'departure_time' => 'nullable|date_format:H:i',
            ]);

            $attendance = Attendance::create($validated);

            return response()->json($attendance->load('user'), 201);
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

    // PRIKAŽI JEDNU EVIDENCIJU
    public function show($id)
    {
        $attendance = Attendance::with('user')->find($id);

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

        try {
            $validated = $request->validate([
                'user_id' => 'sometimes|exists:users,id',
                'date' => 'sometimes|date',
                'status' => 'sometimes|in:present,absent,leave',
                'arrival_time' => 'nullable|date_format:H:i',
                'departure_time' => 'nullable|date_format:H:i',
            ]);

            $attendance->update($validated);

            return response()->json($attendance->load('user'));
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

    // ICS EXPORT
    public function exportIcs()
    {
    $attendances = Attendance::with('user')->get();
    $calendar = Calendar::create('Employee Attendance');

    foreach ($attendances as $attendance) {
        // preskoči ako nedostaje korisnik ili datum
        if (!$attendance->user || !$attendance->date) {
            continue;
        }

        try {
            $date = Carbon::parse($attendance->date);

            // Koristi arrival_time i departure_time iz baze ako postoje
            $startTime = $attendance->arrival_time
                ? Carbon::parse($attendance->date . ' ' . $attendance->arrival_time)
                : $date->copy()->setTime(9, 0);

            $endTime = $attendance->departure_time
                ? Carbon::parse($attendance->date . ' ' . $attendance->departure_time)
                : $date->copy()->setTime(17, 0);

        } catch (\Exception $e) {
            continue; // preskoči ako datum nije validan
        }

        $calendar->event(
            Event::create("Attendance: {$attendance->user->name}")
                ->startsAt($startTime)
                ->endsAt($endTime)
                ->description("Status: {$attendance->status}")
        );
    }

    return response($calendar->get())
        ->header('Content-Type', 'text/calendar')
        ->header('Content-Disposition', 'attachment; filename="attendance.ics"');
}
}

