import { useEffect, useState } from "react";
import getRegistros from "../services/getRegistos";

const useRegistros = () => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const recogerRegistros = async () => {
      try {
        const data = await getRegistros();
        setRegistros(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    recogerRegistros();
  }, []);

  return { registros };
};

export default useRegistros;
