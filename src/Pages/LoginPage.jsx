//import { AuthProvider } from "../components/providers/AuthProvider";
import { useState } from "react";
import { Menu } from "../components/Menu";

const Login = () => {

  //const history= useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  

  // Función para enviar la solicitud de inicio de sesión al servidor
  const sendRequest = async (url, data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      // Realizamos la solicitud POST al servidor
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      //Analizamos la respuesta del servidor como JSON
      const responseData = await response.json();
    
      // Comprobamos si la solicitud de inicio de sesión ha sido exitosa
      if (response.status === 200) {
        //Almacenamiento de datos en el localStorage
        
        const token = responseData.token;
        const userId = responseData.id;
        const userName = responseData.name;
        const userLastName = responseData.lastName;
        const userPhoto = responseData.photoPath;
        localStorage.setItem('token', token);
        localStorage.setItem('id', userId);
        localStorage.setItem('name', userName)
        localStorage.setItem('lastName', userLastName)
        localStorage.setItem('photo', userPhoto)
        console.log(responseData);

        //Mensaje de inicio de sesión exitoso "BORRAR CONSOLE.LOG"
          console.log(`Inicio de sesión con éxito: ${responseData.message}`);
          setMessage(`Inicio de sesión con éxito: ${responseData.message}`);

      } else {
        //Mensaje de error en el inicio de sesión "BORRAR CONSOLE.LOG"
        console.log(`Usuario y/o contraseña incorrectos: ${responseData.message}`);
        setMessage(`Usuario y/o contraseña incorrectos: ${responseData.message}`);
      }
      }catch(error) {
        console.error(`Error al intentar iniciar sesión: ${error.message}`);
        
      }
  };
  // Función de Login al usuario
  const loginUser = () => {
    // Validación de email y contraseña
    if (!email || !password) {
      setMessage("Por favor, completa todos los campos.");
      return;
    } 
    // creación del objeto data con los datos de inicio de sesión y envío de solucitud
    const data = { email, password };
    sendRequest('http://localhost:3030/login', data);
  };

  // Componente de la página LOGIN
  return (
    <>
      <Menu />

      <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            LOGIN
          </h1>
      </div>
      <form className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">

        {/*Mensaje de éxito o error*/}
        {message && <div className="message">{message}</div>}

        {/*campo EMAIL*/}
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-700">Email</label>
          <input 
            type="email" 
            id="email"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value) } />
        </div>

        {/*Campo PASSWORD*/}
        <div className="mb-4">
          <label htmlFor="password"className="text-gray-700">Password</label>
          <input 
            type="password" 
            id="password" 
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            autoComplete="current-password"
            value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        
        <button 
        type="button" 
        onClick={loginUser}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </>
  );
};


const LoginPage = () => (
  //<AuthProvider>
    <Login />
  //</AuthProvider>
);

export default LoginPage