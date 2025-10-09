import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const role = localStorage.getItem("role");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dobrodošli u Attendance App</h1>

      <div className="flex flex-col gap-3">
        <Link to="/attendances" className="text-blue-600 underline">Prisustva</Link>
        {(role === "admin" || role === "manager") && (
          <>
            <Link to="/users" className="text-blue-600 underline">Korisnici</Link>
            <Link to="/departments" className="text-blue-600 underline">Departmani</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
