import PropTypes from "prop-types";
import AnswersList from "./AnswersList";
import { useContext, useEffect, useState } from "react";
import ReplyComment from "./ReplyComment";
import getAnswers from "../../services/getAnswers";
import { AuthContext } from "../providers/AuthProvider";

const Comments = ({ com }) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false);
  const [user] = useContext(AuthContext);
  const date = com.comment_created_at;
  const formatedDate = new Date(date).toLocaleString("es-ES", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Europe/Madrid",
  });
  // console.log(com);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAnswers = await getAnswers(com.comment_id);
        // console.log(fetchedAnswers);
        setAnswers(fetchedAnswers);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [com.comment_id]);

  return (
    <>
      <article className="p-6 mb-6 text-base rounded-lg bg-white w-[600px] m-6">
        <footer className="flex justify-between items-center mb-2 ">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 S700">
              <img
                className="mr-2 w-6 h-6 rounded-full object-cover"
                src={com.comment_user_photo}
                alt=""
              />
              {com.comment_user} {com.comment_userLast}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time title="February 8th, 2022">{formatedDate}</time>
            </p>
          </div>
        </footer>
        <p className=" S400">{com.comment_text}</p>
        <div className="flex flex-col items-start mt-4 space-x-4">
          <div className="flex gap-2">
            {user ? (
              <button
                type="button"
                onClick={() => {
                  setShowTextArea(!showTextArea);
                }}
                className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400"
              >
                <svg
                  className="mr-1.5 w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                </svg>
                {showTextArea ? <p>Cancelar</p> : <p>Responder</p>}
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setShowAnswers(!showAnswers)}
              className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400"
            >
              <svg
                className="mr-1.5 w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
              </svg>
              {showAnswers ? <p>Ocultar Respuestas</p> : <p>Ver Respuestas</p>}
            </button>
          </div>
        </div>
      </article>
      <div className="flex flex-col items-center">
        {showAnswers && <AnswersList answers={answers} />}
      </div>
      <div className="text-white m-8">
        {showTextArea && (
          <ReplyComment
            comment={com}
            setShowTextArea={setShowTextArea}
            setAnswers={setAnswers}
          />
        )}
      </div>
    </>
  );
};

Comments.propTypes = {
  com: PropTypes.object,
};

export default Comments;
