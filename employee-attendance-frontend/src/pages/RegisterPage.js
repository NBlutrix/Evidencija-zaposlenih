import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/register", form);
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="w-80 mx-auto mt-10">
      <Input label="Ime" name="name" value={form.name} onChange={handleChange} />
      <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
      <Input label="Lozinka" name="password" type="password" value={form.password} onChange={handleChange} />
      <Button type="submit">Registruj se</Button>
    </form>
  );
};

export default RegisterPage;
