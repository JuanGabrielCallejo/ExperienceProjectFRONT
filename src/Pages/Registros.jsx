// import useExperiences from "../components/experiences/useExperiences";
// import ExpList from "../components/experiences/ExpList";
import { useContext, useEffect, useState } from "react";
// import { SearchContext } from "../components/providers/SearchProvider";
// import { AuthContext } from "../components/providers/AuthProvider";
// import { NavLink } from "react-router-dom";
import loadIcon from "/img/bouncing-circles.svg";
// import getRegistros from "../services/getRegistos";
import RegistrosLista from "../components/registros/RegistrosLista";
// import { globalAgent } from "http";
import useRegistros from "../hooks/useRegistros";

const Registros = () => {
  // const [, setSearch, , setViewBar] = useContext(SearchContext);
  // const [loading, setLoading] = useState(true);
  // const [user] = useContext(AuthContext);;

  // setTimeout(() => {
  //   setLoading(false);
  // }, 500);

  // const registros_temp = await getRegistros();
  // console.log(registros_temp)
  // console.log(exp);

  const { registros } = useRegistros();
  // if (registros) setLoading(false);

  return (
    <div className="h-full w-full items-center bg-fixed bg-cover p-8">
      {!registros ? (
        <div className="flex flex-col items-center justify-center">
          <img className="h-32 w-32" src={loadIcon} alt="Loading Icon"></img>
        </div>
      ) : (
        <>
          <p>Registros</p>
          <div className="flex flex-col justify-center h-full">
            {registros.length === 0 ? (
              <div className="flex flex-col p-6 rounded-xl items-center gap-4 bg-white w-fit">
                <p>No hay registros.</p>

              </div>
            ) : (
              <ul>
                <RegistrosLista registros={registros} />
              </ul>
            )}
          </div>
        </>

      )}
    </div>
  );
};

export default Registros;
