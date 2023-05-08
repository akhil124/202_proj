import { useState, useEffect } from "react";
import axios from "axios";

// axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
type Method = "get" | "post" | "put" | "delete";

const useApi = (
  url: string,
  method: Method,
  body: any = null,
  headers: any = null
) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axios[method](url, JSON.parse(headers), JSON.parse(body))
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, headers]);

  return { response, error, loading };
};

export default useApi;
