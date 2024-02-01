import { useEffect, useState } from "react";

const ModExp = () => {
  const [exitoModExp, setExitoModExp] = useState(false);
  const [valoresCamposActuales, setValoresCamposActuales] = useState();
  const [expData, setExpData] = useState({
    title: "",
    subTitle: "",
    place: "",
    text: "",
    photo: undefined,
  });

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_HOST}/experience/2`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setExpData(data);
        setLoading(false);
        console.log(data);
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
        `${import.meta.env.VITE_REACT_HOST}/modExperience/2`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
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
      className="min-h-screen bg-white flex flex-col items-center"
    >
      <div className="mt-8 p-8 bg-gray-100 rounded-lg shadow-md max-w-3xl w-full flex">
        <div className="w-1/2 pr-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Datos Actuales
          </h1>
          {valoresCamposActuales.data.photo && (
            <div className="mb-4 flex justify-center">
              <img
                src={valoresCamposActuales.data.photo}
                alt="Foto de experiencia actual"
                className="w-100 h-100"
              />
            </div>
          )}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="border border-gray-300 rounded-md p-2 mb-4 shadow-md">
              <p className="text-gray-700 font-semibold">Título:</p>
              <p className="text-gray-900">
                {valoresCamposActuales.data.title}
              </p>
            </div>
            <div className="border border-gray-300 rounded-md p-2 mb-4 shadow-md">
              <p className="text-gray-700 font-semibold">Subtítulo:</p>
              <p className="text-gray-900">
                {valoresCamposActuales.data.subTitle}
              </p>
            </div>
            <div className="border border-gray-300 rounded-md p-2 mb-4 shadow-md">
              <p className="text-gray-700 font-semibold">Lugar:</p>
              <p className="text-gray-900">
                {valoresCamposActuales.data.place}
              </p>
            </div>
            <div className="border border-gray-300 rounded-md p-2 mb-4 shadow-md">
              <p className="text-gray-700 font-semibold">Descripción:</p>
              <p className="text-gray-900">{valoresCamposActuales.data.text}</p>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Edita tu experiencia
          </h1>
          <div className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="photo" className="text-gray-600 mb-1">
                Subir Foto
              </label>
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                className="py-2 px-3 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                placeholder="photo"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="title" className="text-gray-600 mb-1">
                Título:
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={expData.title}
                className="py-2 px-3 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                placeholder="Título"
                onChange={cambiarValorCampo}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="subTitle" className="text-gray-600 mb-1">
                Subtítulo:
              </label>
              <input
                id="subTitle"
                name="subTitle"
                type="text"
                value={expData.subTitle}
                className="py-2 px-3 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                placeholder="Subtítulo"
                onChange={cambiarValorCampo}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="place" className="text-gray-600 mb-1">
                Lugar:
              </label>
              <input
                id="place"
                name="place"
                type="text"
                value={expData.place}
                className="py-2 px-3 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                placeholder="Lugar"
                onChange={cambiarValorCampo}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="text" className="text-gray-600 mb-1">
                Descripción:
              </label>
              <input
                id="text"
                name="text"
                type="text"
                value={expData.text}
                className="py-2 px-3 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                type="submit"
              >
                Modificar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export { ModExp };
