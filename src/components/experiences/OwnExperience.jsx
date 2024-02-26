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
      <main className="pt-8 pb-16 pt-16 lg:pb-24 antialiased w-full ">
        <div className="flex justify-center items-center">
          <div className="shadow-2xl ">
            <article className="mx-auto xl:w-[850px] xl:h-[1100px] lg:w-[600px] sm:w-[450px] mobile:w-[380px] lg:h-[900px] sm:h-[750px] mobile:h-[600px] grid grid-cols-1 bg-white sm:p-6 mobile:p-4 lg:p-8 rounded-2xl xl:grid-rows-[280px,420px,40px,170px,90px] lg:grid-rows-[260px,340px,30px,120px,50px] sm:grid-rows-[230px,300px,20px,100px,50px] mobile:grid-rows-[180px,200px,20px,80px,50px]">
              <header className="mb-8">
                <address className="flex items-center sm:mb-6 mobile:mb-0">
                  <div className="inline-flex w-full items-center mr-3 text-sm text-gray-900 ">
                    <img
                      className="mr-4 sm:w-16 mobile:w-12 sm:h-16 mobile:h-12 rounded-full object-cover"
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
                      <p className="sm:block mobile:hidden text-base text-gray-500 dark:text-gray-400">
                        <time>{formatedDate}</time>
                      </p>
                    </div>
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
              <p className="lead text-gray-400 mb-4">{exp.likes} me gusta</p>
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
        <div className="mobile:ml-12 lg:ml-0">
          <h3 className="mt-4">Lista de Comentarios</h3>
          <CommentsList newComment={comments} />
        </div>
      </main>
    </>
  );
};

OwnExperience.propTypes = {
  exp: PropTypes.object.isRequired,
};

export default OwnExperience;
