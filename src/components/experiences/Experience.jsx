import PropTypes from "prop-types";
import CommentsList from "../commentsAndAnswers/CommentsList";
import ExpComment from "./ExpComment";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LikeHeart from "../../services/likeHeart";
import { AuthContext } from "../providers/AuthProvider";

const Experience = ({ exp }) => {
  const { comments } = exp;
  // console.log(comments);
  const [newComment, setNewComment] = useState(comments);
  const [like, setLike] = useState(exp.likes);
  const date = exp.createdAt;
  const formatedDate = new Date(date).toLocaleString("es-ES", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Europe/Madrid",
  });
  const [user] = useContext(AuthContext);
  // console.log(user);
  // console.log(exp);
  // console.log(newComment);

  const navigate = useNavigate();
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

  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 antialiased bg-gray-300 ">
        <div className="flex justify-center items-center">
          <div className="shadow-2xl w-full">
            <article className="mx-auto w-full h-full dark:bg-gray-700 p-6 lg:p-8 rounded-2xl ">
              <header className="mb-8">
                <address className="flex items-center mb-6">
                  <div className="inline-flex w-full items-center mr-3 text-sm text-gray-900 ">
                    <img
                      className="mr-4 w-16 h-16 rounded-full"
                      src={exp.user_photo}
                      alt=""
                    />
                    <div>
                      <a
                        href="#"
                        rel="author"
                        className="text-xl font-bold text-gray-900 dark:text-white S700"
                      >
                        {exp.user_name} {exp.user_lastName}
                      </a>
                      <p className="text-base text-gray-500 dark:text-gray-400 S700">
                        {exp.place}
                      </p>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        <time>{formatedDate}</time>
                      </p>
                    </div>
                    {exp.self ? (
                      <>
                        <div className="p-2"></div>
                        <div
                          className="rounded-full bg-red-500 text-white p-2 text-sm hover:cursor-pointer"
                          onClick={(evento) => {
                            evento.preventDefault();
                            eliminarExperiencia(exp.id);
                          }}
                        >
                          Eliminar
                        </div>
                      </>
                    ) : null}

                    {user && user.token != undefined ? (
                      <LikeHeart
                        exp_id={exp.id}
                        like={like}
                        setLike={setLike}
                      />
                    ) : null}
                  </div>
                </address>
                <h1 className="mb-4 text-4xl font-extrabold leading-tight text-blue-900 dark:text-white">
                  {exp.title}
                </h1>
                <h2 className="mb-6 text-3xl font-extrabold leading-tight text-blue-700 dark:text-gray-300 S700">
                  {exp.subTitle}
                </h2>
              </header>
              <figure className="mb-6 text-center">
                <img
                  src={exp.photo}
                  alt="Experience Photo"
                  className=" mx-auto rounded-lg shadow-md"
                />
              </figure>
              <p className="lead dark:text-white mb-4">{like} me gusta</p>
              <p className="lead dark:text-white S400">{exp.text}</p>
              <div className="flex items-center mt-8">
                <div className="rounded-full bg-blue-500 text-white p-2 text-sm">
                  {exp.category_name}
                </div>
              </div>
            </article>
          </div>
        </div>
        <ExpComment
          exp={exp}
          newComment={newComment}
          setNewComment={setNewComment}
        />
        <h3>Lista de Comentarios</h3>
        <CommentsList newComment={newComment} />
      </main>
    </>
  );
};

Experience.propTypes = {
  exp: PropTypes.any,
};

export default Experience;
