import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/providers/AuthProvider";
import { useParams } from "react-router-dom";

const ModExp = () => {
  const [exitoModExp, setExitoModExp] = useState(false);
  const [valoresCamposActuales, setValoresCamposActuales] = useState();
  const [expData, setExpData] = useState({
    id: "",
    title: "",
    subTitle: "",
    place: "",
    text: "",
    photo: undefined,
  });

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [user] = useContext(AuthContext);
  const {exp_id} = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_HOST}/experience/${exp_id}`,
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
        // console.log(data);
        setValoresCamposActuales(data);
      } else {
        const data = await response.json();
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.id, user.token]);

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
        console.error("No hay datos de experiencia");
        return;
      }

      const formData = new FormData();

      if (
        expData.photo &&
        expData.photo !== null &&
        expData.photo !== undefined
      ) {
        formData.append("avatar", expData.photo);
      }

      if (expData.title) {
        formData.append("title", expData.title);
      }
      if (expData.subTitle) {
        formData.append("subTitle", expData.subTitle);
      }
      if (expData.place) {
        formData.append("place", expData.place);
      }
      if (expData.text) {
        formData.append("text", expData.text);
      }
      const response = await fetch(
        `${import.meta.env.VITE_REACT_HOST}/modExperience/${exp_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setSuccessMessage("¡Experiencia actualizada con éxito!");
        setExpData({
          title: "",
          subTitle: "",
          place: "",
          text: "",
          photo: undefined,
        });
        setExitoModExp(true);
        console.log("Experiencia actualizada con éxito");
        fetchData(); // Actualizar datos actuales después de modificar
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
    <form
      onSubmit={modificarDatos}
      className="w-2/3 flex flex-col items-center"
    >
      <div className="p-8 bg-white rounded-lg shadow-2xl flex gap-6">
        <div className="w-2/4">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Edita tu experiencia
          </h1>
          <div className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="photo" className="text-gray-700">
                Foto
              </label>
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="photo"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="title" className="text-gray-700">
                Título
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={expData.title}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Título"
                onChange={cambiarValorCampo}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="subTitle" className="text-gray-700">
                Subtítulo
              </label>
              <input
                id="subTitle"
                name="subTitle"
                type="text"
                value={expData.subTitle}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Subtítulo"
                onChange={cambiarValorCampo}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="place" className="text-gray-700">
                Lugar
              </label>
              <input
                id="place"
                name="place"
                type="text"
                value={expData.place}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Lugar"
                onChange={cambiarValorCampo}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="text" className="text-gray-700">
                Descripción
              </label>
              <input
                id="text"
                name="text"
                type="text"
                value={expData.text}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Descripción"
                onChange={cambiarValorCampo}
              />
            </div>
            {exitoModExp && (
              <p className="text-green-500 text-center mt-4">
                {successMessage}
              </p>
            )}
            <div className="flex justify-center">
              <button
                className="bg-gray-400 hover:bg-gray-300 text-white py-2 px-4 rounded-md "
                type="submit"
              >
                Modificar
              </button>
            </div>
          </div>
        </div>
        <article className=" w-2/4 dark:bg-gray-700 p-6 lg:p-8 rounded-2xl ">
          <header className="mb-8">
            <address className="flex items-center mb-6">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 ">
                <img
                  className="mr-4 w-16 h-16 rounded-full object-cover"
                  src={user.photo}
                  alt=""
                />
                <div>
                  <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white S700"
                  >
                    {user.name} {user.lastName}
                  </a>
                  <p className="text-base text-gray-500 dark:text-gray-400 S700">
                    {valoresCamposActuales.data.place}
                  </p>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    <time>1/1/2024, 00:00:00</time>
                  </p>
                </div>
              </div>
            </address>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight text-blue-900 dark:text-white">
              {valoresCamposActuales.data.title}
            </h1>
            <h2 className="mb-6 text-3xl font-extrabold leading-tight text-blue-700 dark:text-gray-300 S700">
              {valoresCamposActuales.data.subTitle}
            </h2>
          </header>
          <figure className="mb-6 text-center">
            <img
              src={valoresCamposActuales.data.photo}
              alt="Experience Photo"
              className=" mx-auto rounded-lg shadow-md"
            />
          </figure>
          <p className="lead dark:text-white mb-4">4 me gusta</p>
          <p className="lead dark:text-white S400">
            {valoresCamposActuales.data.text}
          </p>
          <div className="flex items-center mt-8">
            <div className="rounded-full bg-blue-500 text-white p-2 text-sm">
              Category
            </div>
          </div>
        </article>
      </div>
    </form>
  );
};

export { ModExp };
