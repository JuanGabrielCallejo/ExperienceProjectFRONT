// import PropTypes from "prop-types";
// import CommentsList from "../commentsAndAnswers/CommentsList";
// import ExpComment from "./ExpComment";
import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import LikeHeart from "../../services/likeHeart";
// import { AuthContext } from "../providers/AuthProvider";
// import { useNavigate } from "react-router-dom";

const Registro = ({ registro }) => {
  // const { comments } = exp;
  // console.log(comments);
  // const [newComment, setNewComment] = useState(comments);
  // console.log(newComment);
  // const navigate = useNavigate();
  // const [like, setLike] = useState(exp.likes);
  const momento = registro.momento;
  const momentoFormateado = new Date(momento).toLocaleString("es-ES", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Europe/Madrid",
  });
  // const [user] = useContext(AuthContext);
  // console.log(user);
  // console.log(exp);
  // console.log(newComment);

  // const navigate = useNavigate();
  // async function peticionServidor(id) {
  //   // console.log(JSON.stringify(usuario));
  //   let datos;
  //   try {
  //     const url = `${import.meta.env.VITE_REACT_HOST}/experience/` + id;
  //     const respuesta = await fetch(url, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });
  //     datos = await respuesta.json();
  //     // console.log(datos);
  //     if (!respuesta.ok) {
  //       // console.log(datos.message);
  //       console.log("Error en la petición");
  //       return datos;
  //       // throw Error("Error en la petición");
  //     }
  //     navigate("/");
  //     window.location.reload();
  //   } catch (error) {
  //     console.log("Error: " + error.message);
  //   }
  // }

  // function eliminarExperiencia(id) {
  //   console.log("id: " + id);
  //   peticionServidor(id);
  // }

  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 antialiased  ">
        <div className="flex justify-center items-center">
          <div className="shadow-2xl w-3/4">
            <article className="mx-auto w-full h-full bg-white p-6 lg:p-8 rounded-2xl ">
              <header className="mb-8">
                <address className="flex items-center mb-6">
                  <div className="inline-flex w-full items-center mr-3 text-sm text-gray-900 ">
                    <div>
                      {/* <a
                        onClick={() => {
                          navigate(`/user/${exp.user_id}`);
                        }}
                        rel="author"
                        className="text-xl cursor-pointer font-bold text-gray-900 S700"
                      >
                        {exp.user_name} {exp.user_lastName}
                      </a> */}
                      <p className="text-base text-gray-400 S700">
                        {registro.lugar}
                      </p>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        <time>{momentoFormateado}</time>
                      </p>
                    </div>

                  </div>
                </address>

              </header>

            </article>
          </div>
        </div>

      </main>
    </>
  );
};

// Experience.propTypes = {
//   exp: PropTypes.any,
// };

export default Registro;
