import { useState } from "react";
import api from "../api/api";

const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (endpoint) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.delete(endpoint);
      return res.data;
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};

export default useDelete;
