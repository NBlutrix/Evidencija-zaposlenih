import { useState } from "react";
import api from "../api/api";

const usePut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const putData = async (endpoint, body) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.put(endpoint, body);
      return res.data;
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { putData, loading, error };
};

export default usePut;
