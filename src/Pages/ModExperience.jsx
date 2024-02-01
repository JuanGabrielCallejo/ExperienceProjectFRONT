import { useContext, useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import { AuthContext } from "../components/providers/AuthProvider";

const ModExp = () => {
  const [expData, setExpData] = useState({
    title: "",
    subTitle: "",
    place: "",
    text: "",
    photo: undefined,
  });

  const [loading, setLoading] = useState(true);
  const [user] = useContext(AuthContext)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_HOST}/experience/3`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setExpData(data);
          setLoading(false);
          console.log(data);
          console.log(user.token);
          console.log(user.id);
        } else {
          const data = await response.json();
          console.error(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const cambiarValorCampo = (e) => {
    const { name, value } = e.target;
    setExpData({ ...expData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setExpData({ ...expData, photo: file });
  };

  const modificarDatos = async (e) => {
    e.preventDefault();

    try {
      if (!expData) {
        console.error("No hay datos de usuario");
        return;
      }

      const formData = new FormData();

      if (
        expData.photo &&
        expData.photo !== null &&
        expData.photo !== undefined
      ) {
        formData.append("photo", expData.photo);
      }

      if (expData.title) {
        formData.append("title", expData.title);
      }
      if (expData.subtitle) {
        formData.append("subTtitle", expData.subTitle);
      }
      if (expData.place) {
        formData.append("place", expData.place);
      }
      if (expData.text) {
        formData.append("text", expData.text);
      }
      const response = await fetch(
        `${import.meta.env.VITE_REACT_HOST}/modExperience/1`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Experiencia actualizada con éxito");
        console.log(expData.title);
      } else {
        const data = await response.json();
        console.error(data);
      }
    } catch (error) {
      console.error("Error al enviar los datos", error);
    }
  };

  if (loading) {
    return <p>Cargando experiencia...</p>;
  }

  return (
    <>
      <form onSubmit={modificarDatos}>
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold">
                    Edita tu experiencia
                  </h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        id="photo"
                        name="photo"
                        type="file"
                        accept="image/*"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="photo"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor="photo"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Foto
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="title"
                        name="title"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Título"
                        onChange={cambiarValorCampo}
                      />
                      <label
                        htmlFor="title"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Título
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="subTitle"
                        name="subTitle"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Subtítulo"
                        onChange={cambiarValorCampo}
                      />
                      <label
                        htmlFor="subTitle"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Subtítulo
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="place"
                        name="place"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Lugar"
                        onChange={cambiarValorCampo}
                      />
                      <label
                        htmlFor="place"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Lugar
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="text"
                        name="text"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Descripción"
                        onChange={cambiarValorCampo}
                      />
                      <label
                        htmlFor="text"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Descripción
                      </label>
                    </div>
                    <div className="relative">
                      <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                        Modificar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { ModExp };
