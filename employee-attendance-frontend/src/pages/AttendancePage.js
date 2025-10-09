import React, { useState } from "react";
import Modal from "../components/Modal";
import AttendanceForm from "../components/AttendanceForm";
import useFetch from "../hooks/useFetch";
import useDelete from "../hooks/useDelete";
import Button from "../components/Button";

const AttendancePage = () => {
  const [openModal, setOpenModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const { data: attendances, loading, error } = useFetch("/attendances");
  const { deleteData } = useDelete();

  const handleDelete = async (id) => {
    if (window.confirm("Obriši prisustvo?")) {
      await deleteData(`/attendances/${id}`);
      window.location.reload();
    }
  };

  const handleExport = () => {
    window.open("http://127.0.0.1:8000/api/attendances/export-ics", "_blank");
  };

  const visibleAttendances = attendances.filter((a) => {
    if (user.role === "admin") return true;
    if (user.role === "manager")
      return a.user?.department_id === user.department_id;
    return a.user_id === user.id;
  });

  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p>Greška pri učitavanju prisustva.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Prisustva</h1>

      {/* Dugme za dodavanje prisustva */}
      <Button
        onClick={() => setOpenModal(true)}
        className="bg-blue-600 text-white mb-4 mr-2"
      >
        + Dodaj prisustvo
      </Button>

      {/* Dugme za eksport */}
      <Button onClick={handleExport} className="bg-green-600 text-white mb-4">
        Exportuj ICS fajl
      </Button>

      {/* Modal sa formom */}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Dodaj prisustvo"
      >
        <AttendanceForm
          onClose={() => setOpenModal(false)}
          onSuccess={() => window.location.reload()}
        />
      </Modal>

      {/* Tabela prisustva */}
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Zaposleni</th>
            <th className="border p-2">Datum</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Dolazak</th>
            <th className="border p-2">Odlazak</th>
            {(user.role === "admin" || user.role === "manager") && (
              <th className="border p-2">Akcije</th>
            )}
          </tr>
        </thead>
        <tbody>
          {visibleAttendances.map((a) => (
            <tr key={a.id}>
              <td className="border p-2">{a.user?.name}</td>
              <td className="border p-2">{a.date}</td>
              <td className="border p-2">{a.status}</td>
              <td className="border p-2">{a.arrival_time || "-"}</td>
              <td className="border p-2">{a.departure_time || "-"}</td>
              {(user.role === "admin" || user.role === "manager") && (
                <td className="border p-2">
                  <Button
                    className="bg-red-500 text-white"
                    onClick={() => handleDelete(a.id)}
                  >
                    Obriši
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePage;
