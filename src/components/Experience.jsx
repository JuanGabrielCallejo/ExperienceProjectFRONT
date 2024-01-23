import PropTypes from "prop-types";

const Experience = ({ exp }) => {
  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 antialiased bg-white ">
        <div className="flex justify-center items-center h-screen">
          <div className="shadow-2xl">
            <article className="mx-auto w-full max-w-3xl bg-blue-100 dark:bg-blue-900 p-6 lg:p-8 rounded-lg ">
              <header className="mb-8">
                <address className="flex items-center mb-6">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <img
                      className="mr-4 w-16 h-16 rounded-full"
                      src={exp.user_photo}
                      alt="Jese Leos"
                    />
                    <div>
                      <a
                        href="#"
                        rel="author"
                        className="text-xl font-bold text-gray-900 dark:text-white"
                      >
                        {exp.user_name}
                      </a>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        {exp.place}
                      </p>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        <time title="February 8th, 2022">
                          {new Date(exp.createdAt).toLocaleDateString()}
                        </time>
                      </p>
                    </div>
                  </div>
                </address>
                <h1 className="mb-4 text-4xl font-extrabold leading-tight text-blue-900 dark:text-white">
                  {exp.title}
                </h1>
                <h2 className="mb-6 text-3xl font-extrabold leading-tight text-blue-700 dark:text-gray-300">
                  {exp.subTitle}
                </h2>
              </header>
              <figure className="mb-6 text-center">
                <img
                  src={exp.photo}
                  alt="Experience Photo"
                  className="mx-auto rounded-lg shadow-md"
                />
              </figure>
              <p className="lead dark:text-white">{exp.text}</p>
              <div className="flex items-center mt-4">
                <div className="rounded-full bg-blue-500 text-white p-2 text-sm">
                  {exp.category_name}
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
    </>
  );
};

Experience.propTypes = {
  exp: PropTypes.object,
};

export default Experience;
