import { useContext, useEffect, useState } from "react";
import BorrarUsuario from "../components/users/borrarUsuario";
import { AuthContext } from "../components/providers/AuthProvider";

const ModUser = () => {
  const [user] = useContext(AuthContext);
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
        `${import.meta.env.VITE_REACT_HOST}/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
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
        `${import.meta.env.VITE_REACT_HOST}/user/${user.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
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
    <div className="flex flex-col items-center w-full">
      <div className="p-8 bg-white rounded-lg shadow-2xl w-3/4 flex justify-between">
        <div className="w-2/4">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Editar perfil
          </h1>
          <form onSubmit={modificarDatos} className="space-y-6">
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
              <label htmlFor="name" className="text-gray-700">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Nombre"
                onChange={cambiarValorCampo}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-gray-700">
                Apellido
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Apellido"
                onChange={cambiarValorCampo}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Correo electrónico"
                onChange={cambiarValorCampo}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
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
                className="bg-gray-400 hover:bg-gray-300 text-white py-2 px-4 rounded-md "
                type="submit"
              >
                Guardar Cambios
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <BorrarUsuario />
            </div>
          </form>
        </div>
        <div className="w-2/4 flex flex-col justify-center items-center ">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Datos Actuales
          </h1>
          <div className=" w-1/2 bg-white rounded-lg shadow-2xl p-4">
            {valoresCamposActuales.data.photo && (
              <div className="mb-4 flex justify-center">
                <img
                  src={valoresCamposActuales.data.photo}
                  alt="Foto de perfil actual"
                  className="w-24 h-24 rounded-full mb-2 object-cover"
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
      </div>
    </div>
  );
};

export { ModUser };
