import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";

const OwnExpList = ({ experience }) => {
  const [user] = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(experience);
  const decodedToken = user && user.token ? jwtDecode(user.token) : null;

  const userId = decodedToken && decodedToken.id ? decodedToken.id : null;

  async function peticionServidor(id) {
    // console.log(JSON.stringify(usuario));
    let datos;
    try {
      const url = `${import.meta.env.VITE_REACT_HOST}/experience/` + id;
      const respuesta = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      datos = await respuesta.json();
      // console.log(datos);
      if (!respuesta.ok) {
        // console.log(datos.message);
        console.log("Error en la petición");
        return datos;
        // throw Error("Error en la petición");
      }
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log("Error: " + error.message);
    }
  }

  function eliminarExperiencia(id) {
    // console.log("id: " + id);
    peticionServidor(id);
  }
  // console.log(experience);
  return experience.map((exp) => {
    exp.self = userId === exp.user_id;
    const userOf = exp.user_id == user?.id;
    const date = exp.created_at;
    const formatedDate = new Date(date).toLocaleString("es-ES", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Europe/Madrid",
    });

    // console.log(userOf);
    // console.log(exp.user_id);
    // console.log(user.id);
    return (
      <li key={exp.id}>
        <NavLink to={`/user/experiences/${exp.id}`}>
          <header className="bg-gray-700 rounded-xl p-6 shadow-2xl ">
            <address className="flex items-center">
              <div className="inline-flex w-full justify-between items-center mr-3 text-sm text-gray-900 ">
                <div>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    <time>{formatedDate}</time>
                  </p>
                  <p className="text-base text-gray-500 dark:text-gray-400 S700">
                    {exp.place}
                  </p>
                </div>
                <img
                  className="mr-4 w-20 h-20 rounded-2xl object-cover"
                  src={exp.photo}
                />
              </div>
            </address>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight text-blue-900 dark:text-white">
              {exp.title}
            </h1>

            {userOf ? (
              <div className="flex flex-row justify-center gap-4 ">
                <div
                  className="rounded-xl bg-blue-500 text-center text-white w-2/4 p-4 text-sm hover:cursor-pointer"
                  onClick={(evento) => {
                    evento.preventDefault();
                    navigate(`/user/experience/${exp.id}/settings`);
                  }}
                >
                  Modificar
                </div>
                <div
                  className="rounded-xl bg-red-500 text-center text-white w-2/4 p-4 text-sm hover:cursor-pointer"
                  onClick={(evento) => {
                    evento.preventDefault();
                    eliminarExperiencia(exp.id);
                  }}
                >
                  Eliminar
                </div>
              </div>
            ) : null}
          </header>
        </NavLink>
      </li>
    );
  });
};

OwnExpList.propTypes = {
  experience: PropTypes.array.isRequired,
};
export default OwnExpList;
