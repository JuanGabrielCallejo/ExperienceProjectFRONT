import PropTypes from "prop-types";
import CommentsList from "../commentsAndAnswers/CommentsList";
import ExpComment from "./ExpComment";
import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import LikeHeart from "../../services/likeHeart";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Experience = ({ exp }) => {
  const { comments } = exp;
  // console.log(comments);
  const [newComment, setNewComment] = useState(comments);
  // console.log(newComment);
  const navigate = useNavigate();
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
      <main className="pt-8 pb-16 pt-16 lg:pb-24 antialiased w-full ">
        <div className="flex justify-center items-center">
          <div className="shadow-2xl ">
            <article className="mx-auto xl:w-[850px] xl:h-[1100px] lg:w-[600px] md:w-[450px] lg:h-[900px] md:h-[750px] grid grid-cols-1 bg-white p-6 lg:p-8 rounded-2xl xl:grid-rows-[280px,420px,40px,170px,90px] lg:grid-rows-[260px,340px,30px,120px,50px] md:grid-rows-[230px,300px,20px,100px,50px]">
              <header className="mb-8">
                <address className="flex items-center mb-6">
                  <div className="inline-flex w-full items-center mr-3 text-sm text-gray-900 ">
                    <img
                      className="mr-4 w-16 h-16 rounded-full object-cover"
                      src={exp.user_photo}
                      alt=""
                    />
                    <div>
                      <a
                        onClick={() => {
                          navigate(`/user/${exp.user_id}`);
                        }}
                        rel="author"
                        className="text-xl cursor-pointer font-bold text-gray-900 S700"
                      >
                        {exp.user_name} {exp.user_lastName}
                      </a>
                      <p className="text-base text-gray-400 S700">
                        {exp.place}
                      </p>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        <time>{formatedDate}</time>
                      </p>
                    </div>
                    {/* {exp.self ? (
                      <div className="flex flex-row gap-4 ml-6">
                        <div
                          className="rounded-full bg-blue-500 text-white p-2 text-sm hover:cursor-pointer"
                          onClick={(evento) => {
                            evento.preventDefault();
                            navigate(`/user/experience/${exp.id}/settings`);
                          }}
                        >
                          Modificar
                        </div>
                        <div
                          className="rounded-full bg-red-500 text-white p-2 text-sm hover:cursor-pointer"
                          onClick={(evento) => {
                            evento.preventDefault();
                            eliminarExperiencia(exp.id);
                          }}
                        >
                          Eliminar
                        </div>
                      </div>
                    ) : null} */}

                    {user && user.token != undefined ? (
                      <LikeHeart
                        exp_id={exp.id}
                        like={like}
                        setLike={setLike}
                      />
                    ) : null}
                  </div>
                </address>
                <h1 className="mb-4 lg:text-4xl md:text-2xl font-extrabold leading-tight text-gray-800 ">
                  {exp.title}
                </h1>
                <h2 className="mb-6 lg:text-3xl md:text-xl font-extrabold leading-tight text-gray-400 S700">
                  {exp.subTitle}
                </h2>
              </header>
              <figure className="mb-6 flex text-center">
                <img
                  src={exp.photo}
                  alt="Experience Photo"
                  className="drop-shadow-2xl  mx-auto rounded-lg shadow-2xl"
                />
              </figure>
              <p className="lead text-gray-400 mb-4">{like} me gusta</p>
              <p className="lead text-gray-700 max-h-[150px] overflow-hidden overflow-y-auto break-words leading-7 S400">
                {exp.text}
              </p>
              <div className="flex items-center mt-8">
                <div className="rounded-full bg-[url('/img/fondoWeb.svg')] bg-cover text-white p-2 text-sm">
                  {exp.category_name}
                </div>
              </div>
            </article>
          </div>
        </div>
        <div className="flex justify-center">
          {user && (
            <ExpComment
              exp={exp}
              newComment={newComment}
              setNewComment={setNewComment}
            />
          )}
        </div>

        <h3 className="mt-4">Lista de Comentarios</h3>
        <CommentsList newComment={newComment} />
      </main>
    </>
  );
};

Experience.propTypes = {
  exp: PropTypes.object.isRequired,
};

export default Experience;
