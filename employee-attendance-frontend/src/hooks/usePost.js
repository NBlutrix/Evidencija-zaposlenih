import { useState } from "react";
import api from "../api/api";

const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (endpoint, body) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post(endpoint, body);
      return res.data;
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error };
};

export default usePost;
