import { useState } from "react";
import ExpList from "./ExpList";

const ExperienceFilterForm = () => {
  const initialEmptyValue = "";
  const [result, setResult] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [inputText, setInputText] = useState("");
  const [orderText, setOrderText] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrderText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!inputText) {
        const res = await fetch(
          `${
            import.meta.env.VITE_REACT_HOST
          }/getexperiences?orderBy=${selectedOption}&orderDirection=${orderText}`
        );

        if (res.ok) {
          const data = await res.json();
          setResult(data.data);
          return data;
        } else {
          const data = await res.json();
          console.log(data);
        }
      } else {
        const res = await fetch(
          `${
            import.meta.env.VITE_REACT_HOST
          }/getexperiences?orderBy=${selectedOption}&orderDirection=${orderText}&search=${inputText}`
        );

        if (res.ok) {
          const data = await res.json();
          setResult(data.data);
          return data;
        } else {
          const data = await res.json();
          console.log(data.data);
        }
      }

      // console.log("Opción seleccionada:", selectedOption);
      // console.log("Texto ingresado:", inputText);
      // console.log("Orden", orderText);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputText">
          Filtrar por texto:
          <input
            type="text"
            id="inputText"
            value={inputText}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Buscar por:
          <select value={selectedOption} onChange={handleSelectChange} required>
            <option value={initialEmptyValue}>Selecciona una opción</option>
            <option value="user_name">Usuario</option>
            <option value="title">Título</option>
            <option value="subTitle">Subtítulo</option>
            <option value="place">Lugar</option>
            <option value="category">Categoría</option>
            <option value="text">Texto</option>
            <option value="votes">Votos</option>
          </select>
        </label>
        <label>
          Ordenar por:
          <select
            name="order"
            id="orderSelect"
            value={orderText}
            onChange={handleOrderChange}
            required
          >
            <option value={initialEmptyValue}>Selecciona un orden</option>
            <option value="DESC">Más recientes</option>
            <option value="ASC">Más antiguos</option>
          </select>
        </label>
        <button type="submit">Buscar</button>
      </form>
      <ul>{result ? <ExpList experience={result} /> : <></>}</ul>
    </>
  );
};

export default ExperienceFilterForm;
