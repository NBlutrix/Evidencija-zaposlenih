import { useState, useEffect } from 'react';
import api from '../api/api';

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(endpoint);
        setData(res.data.data || res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;