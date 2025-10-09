import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // prilagodi ako koristiš drugi port
});

// Dodaj token u svaki zahtev
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
