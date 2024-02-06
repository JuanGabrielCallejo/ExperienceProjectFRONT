import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import resizeImage from "../../services/resizeImg";

const Formulary = ({ setMensaje, setExito }) => {
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [email, setEmail] = useState("");
  const [contrasinal, setContrasinal] = useState();

  useEffect(() => {
    setMensaje("");
  }, [setMensaje]);

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

      datos = await respuesta.json();
      setMensaje(datos.message);
      if (!respuesta.ok) {
        // console.log(datos.message);
        console.log("Error en la petición");
        return datos;
        // throw Error("Error en la petición");
      }
      // setMensaje('Inserción correcta con id: ' + datos.data.entry.id);
      // setMensaje('Inserción correcta ');
      setExito(true);
      return datos;
    } catch (error) {
      console.log("Error: " + error.message);
    }
  }

  async function registrarUsuario(evento) {
    evento.preventDefault();

    if (!nombre || nombre === "" || nombre === null) {
      setMensaje("El nombre no puede estar vacío");
      return;
    }
    if (!apellido || apellido === "" || apellido === null) {
      setMensaje("El apellido no puede estar vacío");
      return;
    }

    let formData = new FormData();
    formData.append("name", nombre);
    formData.append("lastName", apellido);
    formData.append("email", email);
    formData.append("password", contrasinal);

    const photo = evento.target.elements.file.files[0];
    if (photo) {
      const imgMaxWidth = 400;
      const imgMaxHeight = 200;

      const resizedPhoto = await resizeImage(photo, imgMaxWidth, imgMaxHeight);

      formData.append("photo", resizedPhoto);
    }

    // console.log(formData);
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
        *Nombre
      </label>
      <input
        type="text"
        name="name"
        onChange={(e) => setNombre(e.target.value)}
        className="w-full mt-2 p-2 border border-gray-300 rounded-md mb-4"
      />

      <label className="text-gray-700" htmlFor="lastName">
        *Apellido
      </label>
      <input
        type="text"
        name="lastName"
        onChange={(e) => setApellido(e.target.value)}
        className="w-full mt-2 p-2 border border-gray-300 rounded-md mb-4"
      />

      <label className="text-gray-700" htmlFor="email">
        *Correo
      </label>
      <input
        type="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mt-2 p-2 border border-gray-300 rounded-md mb-4"
      />

      <label className="text-gray-700" htmlFor="password">
        *Contraseña
      </label>
      <input
        type="password"
        name="password"
        onChange={(e) => setContrasinal(e.target.value)}
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
