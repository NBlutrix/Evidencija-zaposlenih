// src/pages/AttendancePage.js
import React from "react";
import useFetch from "../hooks/useFetch";

const AttendancePage = () => {
  // Koristimo useFetch umesto ručnog API poziva
  const { data: attendances, loading, error } = useFetch("/attendances");

  if (loading) return <p className="text-center mt-4">⏳ Učitavanje prisustava...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">❌ Greška pri učitavanju podataka.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">📋 Prisustva</h1>

      {attendances.length === 0 ? (
        <p>Nema zabeleženih prisustava.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Korisnik</th>
              <th className="border p-2">Datum</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.user?.name || "Nepoznato"}</td>
                <td className="border p-2">{item.date}</td>
                <td className="border p-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendancePage;
