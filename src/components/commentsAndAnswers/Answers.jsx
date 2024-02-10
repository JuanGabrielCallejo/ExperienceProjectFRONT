import PropTypes from "prop-types";

const Answers = ({ ans }) => {
  const date = ans.answer_created_at;
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
      <article className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg w-[548px] ">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 S700">
              <img
                className="mr-2 w-6 h-6 rounded-full object-cover"
                src={ans.user_photo}
                alt={ans.user_name}
              />
              {ans.user_name} {ans.user_lastName}
            </p>
            <p className="text-sm text-gray-400">
              <time title="">{formatedDate}</time>
            </p>
          </div>
        </footer>
        <p className="S400">{ans.answer_text}</p>
        <div className="flex items-center mt-4 space-x-4"></div>
      </article>
    </>
  );
};

Answers.propTypes = {
  ans: PropTypes.object.isRequired,
};

export default Answers;
