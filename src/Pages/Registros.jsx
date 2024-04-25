import loadIcon from "/img/wave_peq.gif";
import RegistrosLista from "../components/registros/RegistrosLista";
import { useEffect, useState } from "react";
import getRegistros from "../services/getRegistos";
import { ContextoPersonal } from "../Contexts/ContextoPersonal";
import React, { useContext } from "react";

const Registros = ({ pruebas }) => {
  const [registros, setRegistros] = useState();
  const [actualizar, setActualizar] = useState();

  const { admin_estado } = useContext(ContextoPersonal);
  const [admin, setAdmin] = admin_estado

  useEffect(() => {
    const recogerRegistros = async () => {
      try {
        setRegistros(null);
        const data = await getRegistros(pruebas);
        // setTimeout(() => {
        setRegistros(data);
        // setCargando(false);
        // }, 2000);
        // setRegistros(data);

      } catch (error) {
        console.error(error.message);
      }
    };
    recogerRegistros();
  }, [pruebas, actualizar]);

  return (
    <div className="h-full w-full items-center bg-fixed bg-cover p-3">
      {pruebas && <p>Registros de pruebas</p>}

      {!registros ? (
        <div className="flex flex-col items-center justify-center">
          <img className="h-40 w-40 rounded-full" src={loadIcon} alt="Loading Icon"></img>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center h-full">
            {admin && (
              <>Base de datos: {registros.bd}</>
            )}
            {
              registros.length === 0 ? (
                <div className="flex flex-col p-6 rounded-xl items-center gap-4 bg-white w-fit">
                  <p>No hay registros.</p>
                </div>
              ) : (
                <ul>
                  <RegistrosLista registros={registros} setActualizar={setActualizar} pruebas={pruebas} />
                </ul>
              )
            }
          </div>
        </>

      )}
    </div>
  );
};

export default Registros;
