import { useEffect, useState } from "react";
import BorrarUsuario from "../components/users/borrarUsuario";

const ModUser = () => {
  const [exitoModUser, setExitoModUser] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    photo: undefined,
  });
  const [valoresCamposActuales, setValoresCamposActuales] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_HOST}/user/1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
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

  const cambiarValorCampo = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserData({ ...userData, photo: file });
  };

  const modificarDatos = async (e) => {
    e.preventDefault();

    try {
      if (!userData) {
        console.error("No hay datos de usuario");
        return;
      }

      const formData = new FormData();

      if (
        userData.photo &&
        userData.photo !== null &&
        userData.photo !== undefined
      ) {
        formData.append("photo", userData.photo);
      }

      if (userData.name) {
        formData.append("name", userData.name);
      }
      if (userData.lastName) {
        formData.append("lastName", userData.lastName);
      }
      if (userData.email) {
        formData.append("email", userData.email);
      }
      if (userData.password) {
        formData.append("password", userData.password);
      }
      const response = await fetch(
        `${import.meta.env.VITE_REACT_HOST}/user/1`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Usuario actualizado con éxito");

        setExitoModUser(true);

        fetchData();
      } else {
        const data = await response.json();
        console.error(data);
      }
    } catch (error) {
      console.error("Error al enviar los datos", error);
    }
  };

  if (loading) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="mt-8 p-8 bg-gray-100 rounded-lg shadow-md max-w-3xl w-full flex">
        <div className="w-1/2 pr-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Datos Actuales
          </h1>
          <div className="bg-white rounded-lg shadow-md p-4">
            {valoresCamposActuales.data.photo && (
              <div className="mb-4 flex justify-center">
                <img
                  src={valoresCamposActuales.data.photo}
                  alt="Foto de perfil actual"
                  className="w-24 h-24 rounded-full mb-2"
                />
              </div>
            )}
            <div className="border border-gray-300 rounded-md p-2 mb-4 shadow-md">
              <p className="text-gray-700 font-semibold">Nombre:</p>
              <p className="text-gray-900">{valoresCamposActuales.data.name}</p>
            </div>
            <div className="border border-gray-300 rounded-md p-2 mb-4 shadow-md">
              <p className="text-gray-700 font-semibold">Apellido:</p>
              <p className="text-gray-900">
                {valoresCamposActuales.data.lastName}
              </p>
            </div>
            <div
              className="border border-gray-300 rounded-md p-2 mb-4 shadow-md"
              style={{ marginBottom: "1rem" }}
            >
              <p className="text-gray-700 font-semibold">Correo electrónico:</p>
              <p className="text-gray-900">
                {valoresCamposActuales.data.email}
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Editar perfil
          </h1>
          <form onSubmit={modificarDatos} className="space-y-6">
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
              <label htmlFor="name" className="text-gray-600 mb-1">
                Nombre:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="py-2 px-3 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                placeholder="Nombre"
                onChange={cambiarValorCampo}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-gray-600 mb-1">
                Apellido:
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="py-2 px-3 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                placeholder="Apellido"
                onChange={cambiarValorCampo}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-600 mb-1">
                Correo electrónico:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="py-2 px-3 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                placeholder="Correo electrónico"
                onChange={cambiarValorCampo}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-600 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="py-2 px-3 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                placeholder="Contraseña"
                onChange={cambiarValorCampo}
              />
              {exitoModUser && (
                <p className="text-green-500 text-center mt-4">
                  ¡Usuario modificado con éxito!
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                type="submit"
              >
                Guardar Cambios
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                type="button"
                onClick={BorrarUsuario}
              >
                Eliminar Usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { ModUser };
