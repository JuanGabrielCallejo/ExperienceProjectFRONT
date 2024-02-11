import { useContext, useEffect, useState } from "react";
import BorrarUsuario from "../components/users/borrarUsuario";
import { AuthContext } from "../components/providers/AuthProvider";
import { ReloadContext } from "../components/providers/ReloadProvider";
import Swal from "sweetalert2";
import { validateEmail, validatePassword, validateText } from "../services/validateFields";
import resizeImage from "../services/resizeImg";

const ModUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    photo: undefined,
  });
  const [currentUserData, setCurrentUserData] = useState()


  const [user, setUser] = useContext(AuthContext);
  const [exito, setExito] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");


  useEffect(() => {
    fetchData();
    setMensaje("");
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
        setUserData(data.data);
        setCurrentUserData(data.data);
        setLoading(false);
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

  const vacioONull = (texto) => {
    if (!texto || texto.trim() === "") {
      return true;
    } else {
      return false;
    }
  }

  const modificarDatos = async (e) => {
    e.preventDefault();
    let mensaje = "";
    setMensaje(mensaje);
    setExito(false);

    if (!userData) {
      setMensaje("No hay datos de usuario");
      console.error("No hay datos de usuario");
      return;
    } else {
      try {
        setMensaje("");
        let CamposValidos = true;
        let campoValido = true;
        let mensajeCampo = "";

        const formData = new FormData();

        const photo = e.target.elements.photo.files[0];
        if (photo) {
          const imgMaxWidth = 400;
          const imgMaxHeight = 200;
          const resizedPhoto = await resizeImage(photo, imgMaxWidth, imgMaxHeight);
          formData.append("photo", resizedPhoto);
        }

        if (!vacioONull(userData.name)) {
          ({ isValid: campoValido, message: mensajeCampo } = validateText(userData.name, 2, 30, "nombre"));
          CamposValidos = CamposValidos && campoValido;
          if (campoValido) {
            formData.append("name", userData.name);
          } else {
            mensaje = mensaje + " -  " + mensajeCampo;
          }
        }

        if (!vacioONull(userData.lastName)) {
          ({ isValid: campoValido, message: mensajeCampo } = validateText(userData.lastName, 2, 30, "apellido"));
          CamposValidos = CamposValidos && campoValido;
          if (campoValido) {
            formData.append("lastName", userData.lastName);
          } else {
            mensaje = mensaje + " -  " + mensajeCampo;
          }
        }

        if (!vacioONull(userData.email)) {
          ({ isValid: campoValido, message: mensajeCampo } = validateEmail(userData.email));
          CamposValidos = CamposValidos && campoValido;
          if (campoValido) {
            formData.append("email", userData.email);
          } else {
            mensaje = mensaje + " -  " + mensajeCampo;
          }
        }

        if (!vacioONull(userData.password)) {
          ({ isValid: campoValido, message: mensajeCampo } = validatePassword(userData.password));
          CamposValidos = CamposValidos && campoValido;
          if (campoValido) {
            formData.append("password", userData.password);
          } else {
            mensaje = mensaje + " -  " + mensajeCampo;
          }
        }

        if (!formData.entries().next().done && CamposValidos) {
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
            setExito(true);
            fetchData();
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            console.log(updatedUser);
          } else {
            const data = await response.json();
            mensaje = "Error intentando guardar cambios, revise el formato de los datos";
            console.error(data);
          }
        }
      } catch (error) {
        console.error("Error al enviar los datos", error);
      }
    }

    setMensaje(mensaje);
  };

  if (loading) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-[url('/img/fondoWeb.svg')] bg-fixed bg-cover">
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
                value={userData.name}
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
                value={userData.lastName}
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
                value={userData.email}
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
              {exito && (
                <p className="text-green-500 text-center mt-4">
                  ¡Usuario modificado con éxito!
                </p>
              )}
            </div>
            <div className="flex justify-center mb-3">
              {mensaje}</div>
            <div className="flex justify-center">
              <button
                className="mx-2 text-white self-center bg-[url('/img/fondoWeb.svg')] bg-cover hover:scale-95 py-2 px-4 rounded-xl shadow-lg"
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
            {currentUserData.photo && (
              <div className="mb-4 flex justify-center">
                <img
                  src={currentUserData.photo}
                  alt="Foto de perfil actual"
                  className="w-24 h-24 rounded-full mb-2 object-cover"
                />
              </div>
            )}
            <div className="border border-gray-300 rounded-md p-2 mb-4 shadow-md">
              <p className="text-gray-700 font-semibold">Nombre:</p>
              <p className="text-gray-900">{currentUserData.name}</p>
            </div>
            <div className="border border-gray-300 rounded-md p-2 mb-4 shadow-md">
              <p className="text-gray-700 font-semibold">Apellido:</p>
              <p className="text-gray-900">
                {currentUserData.lastName}
              </p>
            </div>
            <div
              className="border border-gray-300 rounded-md p-2 mb-4 shadow-md"
              style={{ marginBottom: "1rem" }}
            >
              <p className="text-gray-700 font-semibold">Correo electrónico:</p>
              <p className="text-gray-900">
                {currentUserData.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ModUser };
