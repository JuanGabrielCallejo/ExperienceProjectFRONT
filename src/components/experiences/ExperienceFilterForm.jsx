import { useContext, useEffect } from "react";
import PrimarySearchAppBar from "../../services/searchBar";
import { SearchContext } from "../providers/SearchProvider";

const ExperienceFilterForm = () => {
  const initialEmptyValue = "";

  const [, , , setViewBar, handleSubmit, orderText, setOrderText] =
    useContext(SearchContext);

  useEffect(() => {
    setViewBar(false);
  }, [setViewBar]);

  const handleOrderChange = (e) => {
    setOrderText(e.target.value);
    // console.log(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="flex sm:flex-row mobile:flex-col"
      >
        <label htmlFor="inputText">
          <PrimarySearchAppBar />
        </label>
        <label className="self-center border border-solid rounded-lg">
          <select
            name="order"
            id="orderSelect"
            value={orderText}
            onChange={handleOrderChange}
            required
          >
            <option value={initialEmptyValue}>Selecciona un orden</option>
            <option value="DESC">Más votados</option>
            <option value="ASC">Menos votados</option>
          </select>
        </label>
        <button className="mx-2 mobile:mt-4 sm:mt-0 text-white self-center bg-[url('/img/fondoWeb.svg')] bg-cover hover:scale-95 p-2 rounded-xl shadow-lg">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default ExperienceFilterForm;
