import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import resizeImage from "../../services/resizeImg";
import { validateText, validateEmail, validatePassword } from "../../services/validateFields";

const Formulary = ({ setExito }) => {
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState();

  // const validateEmail2 = validateEmail;
  // console.log(validateEmail);

  useEffect(() => {
    setMensaje("");
  }, []);

  async function peticionServidor(formData) {
    // console.log(JSON.stringify(usuario));
    let datos;
    try {
      const respuesta = await fetch(
        `${import.meta.env.VITE_REACT_HOST}/register`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log(respuesta);
      datos = await respuesta.json();
      setMensaje(datos.message);
      if (!respuesta.ok) {
        setMensaje("Error al intentar registrar: " + datos.message);
        console.log(`Error en la petición: ${respuesta.status} - ${respuesta.statusText} - ${datos.message}`);
        return datos;
      }
      setExito(true);
      return datos;
    } catch (error) {
      setMensaje("Error indefinido");
      console.log("Error: " + error.message);
    }
  }

  const validarNombre = (nombre) => {
    const { isValid, message } = validateText(nombre, 2, 30, "nombre");
    setMensaje(message);
    return isValid;
  };
  const validarApellido = (apellido) => {
    const { isValid, message } = validateText(apellido, 2, 30, "apellido");
    setMensaje(message);
    return isValid;
  };
  const validarEmail = (email) => {
    const { isValid, message } = validateEmail(email);
    setMensaje(message);
    return isValid;
  };
  const validarPassword = (password) => {
    const { isValid, message } = validatePassword(password);
    setMensaje(message);
    return isValid;
  };

  async function registrarUsuario(evento) {
    evento.preventDefault();

    setMensaje("");
    if (
      !validarNombre(nombre) ||
      !validarApellido(apellido) ||
      !validarEmail(email) ||
      !validarPassword(password)
    ) {
      return;
    }

    console.log("pasa");
    let formData = new FormData();
    formData.append("name", nombre);
    formData.append("lastName", apellido);
    formData.append("email", email);
    formData.append("password", password);

    const photo = evento.target.elements.file.files[0];
    if (photo) {
      const imgMaxWidth = 400;
      const imgMaxHeight = 200;

      const resizedPhoto = await resizeImage(photo, imgMaxWidth, imgMaxHeight);

      formData.append("photo", resizedPhoto);
    }

    peticionServidor(formData);
  }

  Formulary.propTypes = {
    setMensaje: PropTypes.func.isRequired,
    setExito: PropTypes.func.isRequired,
  };

  return (
    <form
      onSubmit={registrarUsuario}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md flex flex-col "
    >
      <label className="text-gray-700" htmlFor="name">
        Nombre *
      </label>
      <input
        type="text"
        name="name"
        onChange={(e) => setNombre(e.target.value)}
        className="w-full mt-2 p-2 border border-gray-300 rounded-md mb-4"
      />

      <label className="text-gray-700" htmlFor="lastName">
        Apellido *
      </label>
      <input
        type="text"
        name="lastName"
        onChange={(e) => setApellido(e.target.value)}
        className="w-full mt-2 p-2 border border-gray-300 rounded-md mb-4"
      />

      <label className="text-gray-700" htmlFor="email">
        Correo *
      </label>
      <input
        type="text"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mt-2 p-2 border border-gray-300 rounded-md mb-4"
      />

      <label className="text-gray-700" htmlFor="password">
        Contraseña *
      </label>
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mt-2 p-2 border border-gray-300 rounded-md mb-4"
      />

      <label className="text-gray-700" htmlFor="file">
        Foto
      </label>
      <input
        type="file"
        name="file"
        className="w-full mt-2 p-2 border border-gray-300 rounded-md mb-4"
      />
      <div className="flex justify-center mb-3">{mensaje}</div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-gray-400 hover:bg-gray-300 text-white py-2 px-4 rounded-md "
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default Formulary;
