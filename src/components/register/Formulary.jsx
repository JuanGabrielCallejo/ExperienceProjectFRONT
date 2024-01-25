import { useEffect, useState } from "react";

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

  function registrarUsuario(evento) {
    evento.preventDefault();

    if (!nombre || nombre === "" || nombre === null) {
      setMensaje("El nombre no puede estar vacío");
      return;
    }
    if (!apellido || apellido === "" || apellido === null) {
      setMensaje("El apellido no puede estar vacío");
      return;
    }
    const photo = evento.target.elements.file.files[0];

    let formData = new FormData();
    formData.append("name", nombre);
    formData.append("lastName", apellido);
    formData.append("email", email);
    formData.append("password", contrasinal);

    if (photo) {
      formData.append("photo", photo);
    }

    // console.log(formData);
    peticionServidor(formData);
  }
  return (
    <>
      <form
        onSubmit={registrarUsuario}
        className="max-w-sm mx-auto mt-8 p-4 bg-white rounded shadow-md text-xs"
      >
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            *Nombre:
          </label>
          <input
            type="text"
            name="name"
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            *Apellido:
          </label>
          <input
            type="text"
            name="lastName"
            onChange={(e) => setApellido(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            *Correo:
          </label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            *Contraseña:
          </label>
          <input
            type="password"
            name="password"
            onChange={(e) => setContrasinal(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="file"
          >
            Foto:
          </label>
          <input type="file" name="file" className="w-full px-3 py-2" />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-700"
          >
            Enviar
          </button>
        </div>
      </form>
    </>
  );
};

export default Formulary;
