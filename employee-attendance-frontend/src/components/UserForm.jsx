import React, { useState } from "react";
import api from "../api/api";
import Button from "./Button";

const UserForm = ({ onClose, existing, onSuccess }) => {
  const [form, setForm] = useState(
    existing || { name: "", email: "", password: "", role: "employee" }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existing) {
        await api.put(`/users/${existing.id}`, form);
      } else {
        await api.post("/register", form);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Greška pri čuvanju korisnika:", err);
      alert("Greška pri čuvanju korisnika.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Ime"
        className="border w-full p-2 rounded"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border w-full p-2 rounded"
        required
      />
      {!existing && (
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Lozinka"
          className="border w-full p-2 rounded"
          required
        />
      )}
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="border w-full p-2 rounded"
      >
        <option value="employee">Employee</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>

      <div className="flex justify-end gap-2">
        <Button type="button" onClick={onClose} className="bg-gray-400">
          Otkaži
        </Button>
        <Button type="submit" className="bg-blue-600 text-white">
          Sačuvaj
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
