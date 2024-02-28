import { useEffect, useState } from "react";
import getLugares from "../services/getLugares";

const useLugares = () => {
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    const recogerLugares = async () => {
      try {
        const data = await getLugares();
        setLugares(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    recogerLugares();
  }, []);

  return { lugares };
};

export default useLugares;
