import { useState } from "react";
import { Menu } from "../components/Menu";


const RegisterPage = () => {

  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [email, setEmail] = useState();
  const [contrasinal, setContrasinal] = useState();

  const [mensaje, setMensaje] = useState("");

  async function peticionServidor(formData) {
    // console.log(JSON.stringify(usuario));
    let datos;
    try {
      const respuesta = await fetch("http://localhost:3030/register", {
        method: 'POST',
        body: formData,
      });
      datos = await respuesta.json();
      setMensaje(datos.message);
      if (!respuesta.ok) {
        console.log(datos.message);
        console.log("Error en la petición");
        return datos;
        // throw Error("Error en la petición");
      }
      // setMensaje('Inserción correcta con id: ' + datos.data.entry.id);
      // setMensaje('Inserción correcta ');

      return datos;
    } catch (error) {
      console.log("Error: " + error.message)
    }
  }


  function registrarUsuario(evento) {
    evento.preventDefault();

    const photo = evento.target.elements.file.files[0];

    let formData = new FormData();
    formData.append('name', nombre);
    formData.append('lastName', apellido);
    formData.append('email', email);
    formData.append('password', contrasinal);

    formData.append('photo', photo);

    // console.log(formData);
    peticionServidor(formData);
  }
  return (
    <>
      <Menu />
      <h1>Página de Registro</h1>

      <form onSubmit={registrarUsuario}>
        Nombre: <input type="text" name='name' onChange={(e) => setNombre(e.target.value)}></input><br></br>
        Apellido: <input type="text" name='lastName' onChange={(e) => setApellido(e.target.value)}></input><br></br>
        Correo: <input type="email" name='email' onChange={(e) => setEmail(e.target.value)}></input><br></br>
        Contraseña: <input type="password" name='password' onChange={(e) => setContrasinal(e.target.value)}></input><br></br>
        Foto: <input type="file" name='file' ></input><br></br>


        <button>Enviar</button>
      </form >
      Mensaje: {mensaje}
    </>
  );
};

export default RegisterPage;
