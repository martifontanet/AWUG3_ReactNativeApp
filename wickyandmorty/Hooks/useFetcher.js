import { useState } from "react";

export default function useFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (fetchFunction, ...args) => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchFunction(...args);
      setData(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}
