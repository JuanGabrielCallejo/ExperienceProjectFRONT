import { useContext, useEffect } from "react";
import ExperienceFilterForm from "../components/experiences/ExperienceFilterForm";
import { SearchContext } from "../components/providers/SearchProvider";
import ExpList from "../components/experiences/ExpList";

const FilterExperience = () => {
  const [, , , , , , , result, setResult, loading, setLoading] =
    useContext(SearchContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setResult([]);
    setLoading(true);
  }, [setResult, setLoading]);

  return (
    <div
      className={`flex flex-col self-start h-full w-full bg-[url('/img/fondoWeb.svg')] bg-fixed bg-cover`}
    >
      <div className="flex flex-col lg:p-10 mobile:p-2 md:p-4 m-4 md:ml-20 lg:ml-16 xl:ml-4 rounded-xl shadow-2xl bg-white w-fit ">
        <h1>Buscar Experiencias</h1>
        <ExperienceFilterForm />
      </div>
      <div className="flex flex-col items-center">
        {loading ? (
          <div className="h-screen"></div>
        ) : (
          <ul className="w-3/4">
            {result?.length > 0 ? (
              <ExpList experience={result} />
            ) : (
              <div className="flex flex-col items-center justify-start p-8 h-screen">
                <p>No hay coincidencias con tu búsqueda.</p>
              </div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilterExperience;
