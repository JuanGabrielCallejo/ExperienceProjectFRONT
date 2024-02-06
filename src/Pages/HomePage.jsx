import useExperiences from "../components/experiences/useExperiences";
import ExpList from "../components/experiences/ExpList";
import { useContext, useEffect } from "react";
import { SearchContext } from "../components/providers/SearchProvider";

const HomePage = () => {
  const [, setSearch, , setViewBar] = useContext(SearchContext);

  useEffect(() => {
    setSearch("");
    setViewBar(true);
  }, [setViewBar, setSearch]);

  const { exp } = useExperiences();
  console.log(exp);
  return (
    <div className="w-3/4">
      <ul>
        <ExpList experience={exp} />
      </ul>
    </div>
  );
};

export default HomePage;
