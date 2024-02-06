import { useState, useContext } from "react";
import { AuthContext } from "../components/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [message, setMessage] = useState("");
  const [, setUser] = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      // console.log("datos del formulario", { email, password });
      const response = await fetch(`${import.meta.env.VITE_REACT_HOST}/login`, {
        method: "POST",
        body: formData,
      });
      const responseData = response.status !== 204 ? await response.json() : {};
      // console.log("Respuesta del servidor:", responseData);
      const user = {
        id: responseData.id,
        name: responseData.name,
        lastName: responseData.lastName,
        photo: responseData.photoPath,
        token: responseData.token,
      };
      if (!email || !password) {
        setMessage("Por favor, completa todos los campos.");
        return;
      }
      if (response.status === 200) {
        setMessage(`Inicio de sesión con éxito: ${responseData.message}`);
        setUser(user);
        Swal.fire({
          title: "Sesión iniciada!",
          // text: "Se ha eliminado este usuario",
          icon: "success",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);

        // console.log(user);
      } else {
        //Mensaje de error en el inicio de sesión
        setMessage(
          `Usuario y/o contraseña incorrectos: ${responseData.message}`
        );
      }
    } catch (error) {
      console.error(`Error al intentar iniciar sesión: ${error.message}`);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">LOGIN</h1>
      </div>
      <form
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md flex flex-col "
        onSubmit={loginUser}
      >
        {/*Mensaje de éxito o error*/}
        {message && <div className="message">{message}</div>}

        {/*campo EMAIL*/}
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-700">
            Email
          </label>
          <input
            type="email"
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
            className="bg-gray-400 hover:bg-gray-300 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
