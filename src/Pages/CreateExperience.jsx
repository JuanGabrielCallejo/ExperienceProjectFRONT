import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../components/providers/AuthProvider";
import { SearchContext } from "../components/providers/SearchProvider";

const CreateExperience = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [exitoExperiencia, setExitoExperiencia] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [user] = useContext(AuthContext);
  const [, , , setViewBar] = useContext(SearchContext);

  useEffect(() => {
    setViewBar(true);
  }, [setViewBar]);

  useEffect(() => {
    async function obtenerCategorias() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_HOST}/categories`
        );
        if (response.ok) {
          const datosCategorias = await response.json();

          // console.log(datosCategorias.data[0]);
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

    // console.log("evento", e, { title, subTitle, place, text, photo });

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
        // console.log("Error de datos", body);
        setStatusMessage(body.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const mensajeParaElUsuario = `${statusMessage}`;

  if (exitoExperiencia) {
    Swal.fire({
      title: mensajeParaElUsuario,
      icon: "success",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
      }
    });
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
          className="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded-md"
        >
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-700"
            >
              Categoría
            </label>
            <select
              id="category"
              name="category"
              className="mt-1 block w-full p-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700"
            >
              Título
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="mt-1 block w-full p-2 bg-white-100 border border-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="subTitle"
              className="block text-sm font-semibold text-gray-700"
            >
              Subtítulo
            </label>
            <input
              type="text"
              id="subTitle"
              name="subTitle"
              className="mt-1 block w-full p-2 bg-white-100 border border-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="place"
              className="block text-sm font-semibold text-gray-700"
            >
              Lugar
            </label>
            <input
              type="text"
              id="place"
              name="place"
              className="mt-1 block w-full p-2 bg-white-100 border border-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="text"
              className="block text-sm font-semibold text-gray-700"
            >
              Descripción
            </label>
            <textarea
              id="text"
              name="text"
              rows="3"
              className="mt-1 block w-full p-2 bg-white-100 border border-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="photo"
              className="block text-sm font-semibold text-gray-700"
            >
              Fotos
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              className="mt-1 block w-full p-2 bg-white-100 border border-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
            Enviar
          </button>
        </form>
      </div>
    );
  }
};

export { CreateExperience };
