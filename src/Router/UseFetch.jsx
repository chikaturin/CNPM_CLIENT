import { useEffect, useState } from "react";

const UseFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await res.json();
        setData(result.danhSachSanBay || []);
      } catch (error) {
        setError("Can't fetch data from server");
      }
    }
    fetchData();
  }, [url]);

  return { data, error };
};

export default UseFetch;
