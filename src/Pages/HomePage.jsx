import useExperiences from "../components/experiences/useExperiences";
import ExpList from "../components/experiences/ExpList";
import { useContext, useEffect } from "react";
import { SearchContext } from "../components/providers/SearchProvider";
import { AuthContext } from "../components/providers/AuthProvider";

const HomePage = () => {
  const [, setSearch, , setViewBar] = useContext(SearchContext);
  const [user] = useContext(AuthContext);

  useEffect(() => {
    setSearch("");
    setViewBar(true);
  }, [setViewBar, setSearch]);

  const { exp } = useExperiences();
  // console.log(exp);
  return (
    <div className="w-3/4">
      {exp.length === 0 ? (
        <div>
          <p>
            Todavía no hay experiencias{" "}
            {user ? (
              <a href="/compose/experience">, se el primero !</a>
            ) : (
              <a href="/login">, loggeate !</a>
            )}
          </p>
        </div>
      ) : (
        <ul>
          <ExpList experience={exp} />
        </ul>
      )}
    </div>
  );
};

export default HomePage;
