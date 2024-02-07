import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../components/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginPage = () => {

  const [message, setMessage] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [, setUser] = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setMensaje("");

    // const emailInput = document.getElementById("email");
    // if (emailInput && emailInput.value !== email) {
    //   setEmail(emailInput.value);
    // }
  }, []);

  async function peticionServidor(formData) {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_HOST}/login`, {
        method: "POST",
        body: formData,
      });
      const responseData = response.status !== 204 ? await response.json() : {};
      // setMensaje(responseData.message);
      const user = {
        id: responseData.id,
        name: responseData.name,
        lastName: responseData.lastName,
        photo: responseData.photoPath,
        token: responseData.token,
      };
      if (response.status === 200) {
        setMessage(`Inicio de sesión con éxito: ${responseData.message}`);
        setUser(user);
        Swal.fire({
          title: "Sesión iniciada!",
          icon: "success",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        //Mensaje de error en el inicio de sesión
        setMensaje(
          `Usuario y/o contraseña incorrectos: ${responseData.message}`
        );
        return;
      }
    } catch (error) {
      console.error(`Error al intentar iniciar sesión: ${error.message}`);
    }
  }


  const validateEmail = () => {
    if (!email || email === "" || email === null) {
      setMensaje("El email no puede estar vacío");
      return false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setMensaje("El email no tiene el formato correcto (usuario@dominio.com)");
        return false;
      };
    }
    return true;
  };

  const validatePassword = () => {
    if (!password || password === "" || password === null) {
      setMensaje("El password no puede estar vacío");
      return false;
    } else {
      // const passwordRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // if (!passwordRegex.test(password)) {
      //   setMensaje("El password no tiene el formato correcto ");
      // };
    }
    return true;
  };


  async function loginUser(evento) {
    evento.preventDefault();
    console.log("Email: " + email);
    console.log("Password: " + password);

    setMensaje("");
    if (!validateEmail() || !validatePassword()) { return; };

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    peticionServidor(formData);
  }

  return (
    <div className="flex flex-col">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">LOGIN</h1>
      </div>
      <form
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md flex flex-col "
        onSubmit={loginUser}
      >

        {/*campo EMAIL*/}
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-700">
            Email
          </label>
          <input
            type="text" // elegimos tipo texto para subsanar un error en firefox, que no muestra los mensajes de autocomprobación del email del navegador, y bloquea el código
            id="email"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            autoComplete="email"

            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/*Campo PASSWORD*/}
        <div className="mb-4">
          <label htmlFor="password" className="text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          {mensaje}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gray-400 hover:bg-gray-300 text-white py-2 px-4 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
