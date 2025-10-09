import React, { useState } from "react";
import api from "../api/api";
import Button from "./Button";

const AttendanceForm = ({ onClose, existing, onSuccess }) => {
  const [form, setForm] = useState(
    existing || { user_id: "", date: "", status: "present" }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existing) {
        await api.put(`/attendances/${existing.id}`, form);
      } else {
        await api.post("/attendances", form);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Greška pri čuvanju prisustva:", err);
      alert("Greška pri čuvanju prisustva.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!existing && (
        <input
          name="user_id"
          value={form.user_id}
          onChange={handleChange}
          placeholder="User ID"
          className="border w-full p-2 rounded"
          required
        />
      )}
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border w-full p-2 rounded"
        required
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border w-full p-2 rounded"
      >
        <option value="present">Prisutan</option>
        <option value="absent">Odsutan</option>
        <option value="leave">Odmor</option>
      </select>
      <input
        type="time"
        name="arrival_time"
        value={form.arrival_time || ""}
        onChange={handleChange}
        className="border w-full p-2 rounded"
      />
      <input
        type="time"
        name="departure_time"
        value={form.departure_time || ""}
        onChange={handleChange}
        className="border w-full p-2 rounded"
      />

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

export default AttendanceForm;
