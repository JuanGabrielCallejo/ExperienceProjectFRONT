import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../components/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginPage = () => {
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

  useEffect(() => {
    if (mensaje) {
      setTimeout(() => {
        setMensaje("");
      }, 2000);
    }
  }, [mensaje]);

  async function peticionServidor(formData) {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_HOST}/login`, {
        method: "POST",
        body: formData,
      });
      const responseData = response.status !== 204 ? await response.json() : {};
      const user = {
        id: responseData.id,
        name: responseData.name,
        lastName: responseData.lastName,
        photo: responseData.photoPath,
        token: responseData.token,
      };
      if (response.status === 200) {
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
        setMensaje(
          "El email no tiene el formato correcto (usuario@dominio.com)"
        );
        return false;
      }
    }
    return true;
  };

  const validatePassword = () => {
    if (!password || password === "" || password === null) {
      setMensaje("El password no puede estar vacío");
      return false;
    } else {
      // descomentar si queremos verificar el formato de contraseña
      // const passwordRegex = ;
      // if (!passwordRegex.test(password)) {
      //   setMensaje("El password no tiene el formato correcto ");
      // };
    }
    return true;
  };

  async function loginUser(evento) {
    evento.preventDefault();

    setMensaje("");
    if (!validateEmail() || !validatePassword()) {
      return;
    }

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    peticionServidor(formData);
  }

  return (
    <div className="flex flex-col h-screen w-full justify-center">
      <div className="text-center mb-4">
        <h1 className="text-2xl text-white text-gray-800">LOGIN</h1>
      </div>
      <form
        className="max-w-md mx-auto p-4 mb-4 bg-white shadow-md rounded-md flex flex-col "
        onSubmit={loginUser}
      >
        {/*campo EMAIL*/}
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-700">
            Email
          </label>
          <input
            type="text"
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
          <button
            type="submit"
            className="mx-2 hover:bg-gray-100 self-end bg-[url('/img/fondoWeb.svg')] bg-cover text-white py-2 px-4 rounded-xl shadow-2xl hover:scale-95"
          >
            Login
          </button>
        </div>
      </form>
      <div className="flex justify-center h-4 w-full items-center">
        {mensaje && (
          <div className={`w-fit mt-6 p-2 bg-white rounded text-center`}>
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
};
export default LoginPage;
