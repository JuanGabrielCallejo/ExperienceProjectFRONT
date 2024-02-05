import { useContext, useEffect } from "react";
import ExperienceFilterForm from "../components/experiences/ExperienceFilterForm";
import { SearchContext } from "../components/providers/SearchProvider";
import ExpList from "../components/experiences/ExpList";

const FilterExperience = () => {
  const [, , , , , , , result, setResult] = useContext(SearchContext);

  useEffect(() => {
    setResult([]);
  }, [setResult]);

  return (
    <div className="flex flex-col self-start mt-4 w-full">
      <div className="flex flex-col self-center">
        <h1>Buscar Experiencias</h1>
        <ExperienceFilterForm />
      </div>

      <ul>{result ? <ExpList experience={result} /> : <></>}</ul>
    </div>
  );
};

export default FilterExperience;
