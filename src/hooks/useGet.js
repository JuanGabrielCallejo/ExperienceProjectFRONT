import { useEffect } from "react";

const useGet = (url, onSuccess, onError) => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const body = await response.json();
          // responsabilidad del usuario
          onSuccess(body);
        } else {
          const body = await response.json();
          // responsabilidad del usuario
          onError(body.message);
          // setErrorMessage(body.message);
        }
      } catch (error) {
        // responsabilidad del usuario
        onError(error);
      }
    }
    fetchData();
  }, [url]);
};

export { useGet };
