import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="flex justify-between bg-gray-800 text-white p-4">
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        {user?.role === "admin" && (
          <>
            <Link to="/users">Users</Link>
            <Link to="/departments">Departments</Link>
          </>
        )}
        {user?.role === "manager" && <Link to="/users">My Department</Link>}
        <Link to="/attendance">Attendance</Link>
      </div>
      <div>
        <span className="mr-3">{user?.name}</span>
        <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
