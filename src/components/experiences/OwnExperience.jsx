import PropTypes from "prop-types";
import CommentsList from "../commentsAndAnswers/CommentsList";

const OwnExperience = ({ exp }) => {
  const { comments } = exp;
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

  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 antialiased w-full ">
        <div className="flex justify-center items-center">
          <div className="shadow-2xl ">
            <article className="mx-auto w-[850px] h-[1100px] grid grid-cols-1 bg-white p-6 lg:p-8 rounded-2xl grid-rows-[280px,420px,30px,180px,90px]">
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
                        onClick="#"
                        rel="author"
                        className="text-xl cursor-pointer font-bold text-gray-900 S700"
                      >
                        {exp.user_name} {exp.user_lastName}
                      </a>
                      <p className="text-base text-gray-400 S700">
                        {exp.place}
                      </p>
                      <p className="text-base text-gray-500 ">
                        <time>{formatedDate}</time>
                      </p>
                    </div>
                  </div>
                </address>
                <h1 className="mb-4 text-4xl font-extrabold leading-tight text-gray-800 ">
                  {exp.title}
                </h1>
                <h2 className="mb-6 text-3xl font-extrabold leading-tight text-gray-400 S700">
                  {exp.subTitle}
                </h2>
              </header>
              <figure className="mb-6 flex text-center">
                <img
                  src={exp.photo}
                  alt="Experience Photo"
                  className="drop-shadow-2xl  mx-auto rounded-lg shadow-md"
                />
              </figure>
              <p className="lead text-gray-400 mb-4">{exp.likes} me gusta</p>
              <p className="lead text-gray-700 w-[800px] max-h-[150px] overflow-hidden overflow-y-auto break-words leading-7 S400">
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
        <h3 className="mt-4">Lista de Comentarios</h3>
        <CommentsList newComment={comments} />
      </main>
    </>
  );
};

OwnExperience.propTypes = {
  exp: PropTypes.any,
};

export default OwnExperience;
