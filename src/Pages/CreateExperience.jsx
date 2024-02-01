import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../components/providers/AuthProvider";

const CreateExperience = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [exitoExperiencia, setExitoExperiencia] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [user] = useContext(AuthContext);

  useEffect(() => {
    async function obtenerCategorias() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_HOST}/categories`
        );
        if (response.ok) {
          const datosCategorias = await response.json();

          console.log(datosCategorias.data[0]);
          const nombresCategorias = datosCategorias.data[0];
          setCategorias(nombresCategorias);
        } else {
          const datosCategorias = await response.json();
          console.log(datosCategorias);
          // setErrorMessage(body.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    obtenerCategorias();
  }, []);

  const nuevaExperiencia = async (e) => {
    e.preventDefault();

    const title = e.target.elements.title.value;
    const subTitle = e.target.elements.subTitle.value;
    const place = e.target.elements.place.value;
    const text = e.target.elements.text.value;
    const photo = e.target.elements.photo.files[0];
    const category = e.target.elements.category.value;

    let experienceBody = new FormData();
    experienceBody.append("title", title);
    experienceBody.append("subTitle", subTitle);
    experienceBody.append("place", place);
    experienceBody.append("text", text);
    experienceBody.append("photo", photo);
    experienceBody.append("category", category);

    console.log("evento", e, { title, subTitle, place, text, photo });

    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_HOST}/experience`, {
        method: "POST",
        body: experienceBody,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        const body = await res.json();
        setStatusMessage("Tu experiencia ha sido creada con exito", body);
        setExitoExperiencia(true);
        console.log(user.token);
      } else {
        const body = await res.json();
        console.log("Error de datos", body);
        setStatusMessage(body.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const mensajeParaElUsuario = `${statusMessage}`;

  if (exitoExperiencia) {
    return (
      <>
        <div className="bg-green-200 text-green-800 p-4 rounded-md shadow-md">
          <p className="font-bold">{mensajeParaElUsuario}</p>
          <NavLink to="/" className="text-blue-500 hover:underline">
            Ir al inicio
          </NavLink>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex flex-col">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Crea tu experiencia
          </h1>
        </div>
        <form
          onSubmit={nuevaExperiencia}
          className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md"
        >
          <div className="mb-4">
            <label htmlFor="category" className="text-gray-700">
              Categoria
            </label>
            <select
              type="text"
              name="category"
              id="category"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            >
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="text-gray-700">
              Titulo:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subTitle" className="text-gray-700">
              Subtitulo:
            </label>
            <input
              type="text"
              id="subTitle"
              name="subTitle"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="place" className="text-gray-700">
              Lugar:
            </label>
            <input
              type="text"
              id="place"
              name="place"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="text-gray-700">
              Descripcion:
            </label>
            <input
              type="text"
              id="text"
              name="text"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="text-gray-700">
              Fotos:
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Enviar
          </button>
        </form>
      </div>
    );
  }
};

export { CreateExperience };
