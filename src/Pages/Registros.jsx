// import useExperiences from "../components/experiences/useExperiences";
// import ExpList from "../components/experiences/ExpList";
import { useContext, useEffect, useState } from "react";
// import { SearchContext } from "../components/providers/SearchProvider";
// import { AuthContext } from "../components/providers/AuthProvider";
// import { NavLink } from "react-router-dom";
import loadIcon from "/img/bouncing-circles.svg";
import getRegistros from "../services/getRegistos";
import RegistrosLista from "../components/experiences/RegistrosLista";
// import { globalAgent } from "http";
import useRegistros from "../hooks/useRegistros";

const Registros = () => {
  // const [, setSearch, , setViewBar] = useContext(SearchContext);
  const [loading, setLoading] = useState(true);
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
    <div className="h-full w-full flex flex-col items-center bg-[url('/img/fondoWeb.svg')] bg-fixed bg-cover">
      {!registros ? (
        <div className="flex flex-col items-center justify-center">
          <img className="h-32 w-32" src={loadIcon} alt="Loading Icon"></img>
        </div>
      ) : (
        <div className="flex flex-col justify-center h-full">
          {registros.length === 0 ? (
            <div className="flex flex-col p-6 rounded-xl items-center gap-4 bg-white w-fit">
              <p>No hay registros.</p>
              {/* <div>
                {user ? (
                  <NavLink
                    to="/compose/experience"
                    className="bg-[url('/img/fondoWeb.svg')] hover:scale-95 bg-cover text-white py-2 px-4 rounded-md "
                  >
                    se el primero !
                  </NavLink>
                ) : (
                  <NavLink
                    to="/login"
                    className="bg-gray-400 hover:bg-gray-300 text-white py-2 px-4 rounded-md "
                  >
                    loggeate !
                  </NavLink>
                )}
              </div> */}
            </div>
          ) : (
            <ul>
              <RegistrosLista registros={registros} />
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Registros;
