import useExperiences from "../components/experiences/useExperiences";
import ExpList from "../components/experiences/ExpList";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../components/providers/SearchProvider";
import { AuthContext } from "../components/providers/AuthProvider";
import { NavLink } from "react-router-dom";
import loadIcon from "/img/bouncing-circles.svg";

const HomePage = () => {
  const [, setSearch, , setViewBar] = useContext(SearchContext);
  const [loading, setLoading] = useState(true);
  const [user] = useContext(AuthContext);

  useEffect(() => {
    setSearch("");
    setViewBar(true);
  }, [setViewBar, setSearch]);

  setTimeout(() => {
    setLoading(false);
  }, 500);

  const { exp } = useExperiences();
  // console.log(exp);

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <img className="h-32 w-32" src={loadIcon} alt="Loading Icon"></img>
        </div>
      ) : (
        <ul className="w-full">
          {exp?.length > 0 ? (
            <ExpList experience={exp} />
          ) : (
            <div className="flex flex-col items-center justify-center p-8  h-screen">
              <div className="flex flex-col items-center rounded-xl shadow-2xl bg-white w-[300px] h-fit p-6 gap-4">
                <p>Todavía no hay experiencias.</p>
                {user ? (
                  <NavLink
                    to="/compose/experience"
                    className="bg-[url('/img/fondoWeb.svg')] hover:scale-95 bg-cover text-white py-2 px-4 rounded-md shadow-2xl"
                  >
                    se el primero !
                  </NavLink>
                ) : (
                  <div className="flex flex-row gap-2">
                    <NavLink
                      to="/register"
                      className="bg-[url('/img/fondoWeb.svg')] hover:scale-95 bg-cover text-white py-2 px-4 rounded-md "
                    >
                      Registrate!
                    </NavLink>
                    <NavLink
                      to="/login"
                      className="bg-[url('/img/fondoWeb.svg')] hover:scale-95 bg-cover text-white py-2 px-4 rounded-md "
                    >
                      Logueate!
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
