import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchAttendances = async () => {
      try {
        const response = await api.get("/attendances", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAttendances(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendances();
  }, [navigate]);

  const handleExport = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/attendances/export-ics", {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "attendance.ics");
    document.body.appendChild(link);
    link.click();
  };

  if (loading) return <p className="text-center mt-10">Učitavanje...</p>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Evidencija zaposlenih</h2>
      <button
        onClick={handleExport}
        className="bg-green-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-green-700"
      >
        📅 Izvezi .ICS fajl
      </button>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Zaposleni</th>
            <th className="py-2 px-4 border">Datum</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((a) => (
            <tr key={a.id}>
              <td className="border px-4 py-2">{a.user?.name}</td>
              <td className="border px-4 py-2">{a.date}</td>
              <td className="border px-4 py-2">{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
