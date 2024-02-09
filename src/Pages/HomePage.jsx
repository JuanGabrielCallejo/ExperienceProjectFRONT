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
    <div className="w-full flex flex-col items-center bg-[url('/img/fondoWeb.svg')] bg-fixed bg-cover">
      {loading ? (
        <img className="h-32 w-32 " src={loadIcon}></img>
      ) : (
        <div className="w-3/4">
          {exp.length === 0 ? (
            <div className="flex flex-col items-center gap-4 ">
              <p>Todavía no hay experiencias.</p>
              <div>
                {user ? (
                  <NavLink
                    to="/compose/experience"
                    className="bg-gray-400 hover:bg-gray-300 text-white py-2 px-4 rounded-md "
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
              </div>
            </div>
          ) : (
            <ul>
              <ExpList experience={exp} />
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
