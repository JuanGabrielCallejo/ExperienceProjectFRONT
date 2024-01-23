import { useEffect, useState } from "react";
import { Menu } from "../components/Menu";

const ModUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    photo: undefined,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_HOST}/user/1`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5hbWUiOiJKdWFuIiwiaWF0IjoxNzA1NjgyODM4LCJleHAiOjE3MDU4NTU2Mzh9.J9neDZzDfLCLidd1j30Bv1yQ3xlHMFte1FqmOy_uOo8",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setLoading(false);
        } else {
          const data = await response.json();
          console.error(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

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
        `${import.meta.env.VITE_REACT_HOST}/user/1`,
        {
          method: "PUT",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5hbWUiOiJKdWFuIiwiaWF0IjoxNzA1NjgyODM4LCJleHAiOjE3MDU4NTU2Mzh9.J9neDZzDfLCLidd1j30Bv1yQ3xlHMFte1FqmOy_uOo8",
          },
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Usuario actualizado con éxito");
        console.log(userData.name);
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
    <>
      <Menu />

      <form onSubmit={modificarDatos}>
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold">Edita tu perfil</h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        id="photo"
                        name="photo"
                        type="file"
                        accept="image/*"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="photo"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor="photo"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Foto
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Nombre"
                        onChange={cambiarValorCampo}
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Nombre
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Apellido"
                        onChange={cambiarValorCampo}
                      />
                      <label
                        htmlFor="lastName"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Apellido
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Email address"
                        onChange={cambiarValorCampo}
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Password"
                        onChange={cambiarValorCampo}
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                        Modificar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { ModUser };
