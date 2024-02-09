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
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 antialiased bg-gray-300 ">
        <div className="flex justify-center items-center">
          <div className="shadow-2xl w-3/4">
            <article className="mx-auto w-full h-full bg-gray-700 p-6 lg:p-8 rounded-2xl ">
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
                        href="#"
                        rel="author"
                        className="text-xl font-bold text-white S700"
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
                <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white">
                  {exp.title}
                </h1>
                <h2 className="mb-6 text-3xl font-extrabold leading-tight text-gray-300 S700">
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
              <p className="lead text-white mb-4">{exp.likes} me gusta</p>
              <p className="lead text-white S400">{exp.text}</p>
              <div className="flex items-center mt-8">
                <div className="rounded-full bg-[url('/img/fondoWeb.svg')] bg-cover text-white p-2 text-sm">
                  {exp.category_name}
                </div>
              </div>
            </article>
          </div>
        </div>
        <h3>Lista de Comentarios</h3>
        <CommentsList newComment={comments} />
      </main>
    </>
  );
};

OwnExperience.propTypes = {
  exp: PropTypes.any,
};

export default OwnExperience;
