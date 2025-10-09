import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Greška prilikom odjave:", error);
    } finally {
      localStorage.clear(); // obriši token
      navigate("/login");   // prebaci na login stranicu
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-semibold">
        🕓 Attendance App
      </Link>

      {token ? (
        <div className="flex gap-4 items-center">
          <Link to="/attendances" className="hover:underline">
            Prisustva
          </Link>
          <Link to="/users" className="hover:underline">
            Korisnici
          </Link>
          <Link to="/departments" className="hover:underline">
            Departmani
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Odjavi se
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="hover:underline">
            Prijava
          </Link>
          <Link to="/register" className="hover:underline">
            Registracija
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
