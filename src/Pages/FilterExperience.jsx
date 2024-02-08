import { useContext, useEffect, useState } from "react";
import ExperienceFilterForm from "../components/experiences/ExperienceFilterForm";
import { SearchContext } from "../components/providers/SearchProvider";
import ExpList from "../components/experiences/ExpList";
import loadIcon from "/img/bouncing-circles.svg";

const FilterExperience = () => {
  const [, , , , , , , result, setResult] = useContext(SearchContext);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 500);

  useEffect(() => {
    setResult([]);
  }, [setResult]);

  return (
    <div className="flex flex-col self-start mt-4 w-full">
      <div className="flex flex-col p-10">
        <h1>Buscar Experiencias</h1>
        <ExperienceFilterForm />
      </div>
      <div className="flex flex-col items-center ">
        {loading ? (
          <img className="h-32 w-32 " src={loadIcon}></img>
        ) : (
          <ul className="w-3/4">
            {result ? (
              <ExpList experience={result} />
            ) : (
              <img className="h-32 w-32 " src={loadIcon}></img>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilterExperience;
