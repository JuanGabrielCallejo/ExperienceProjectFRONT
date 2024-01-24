import PropTypes from "prop-types";
import AnswersList from "./AnswersList";
import { useState } from "react";
import ReplyComment from "./ReplyComment";

const Comments = ({ com }) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false);
  // console.log(com);

  return (
    <>
      <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                alt="Michael Gough"
              />
              {com.comment_user}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time title="February 8th, 2022">
                {new Date(com.createdAt).toLocaleDateString()}
              </time>
            </p>
          </div>
        </footer>
        <p className="dark:text-white">{com.comment_text}</p>
        <div className="flex items-center mt-4 space-x-4">
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
          <p className="dark:text-white">
            {showAnswers ? <AnswersList comment={com} /> : <></>}
          </p>
          <p className="dark:text-white">
            {showTextArea ? (
              <ReplyComment comment={com} setShowTextArea={setShowTextArea} />
            ) : (
              <></>
            )}
          </p>
        </div>
      </article>
    </>
  );
};

Comments.propTypes = {
  com: PropTypes.any,
  exp: PropTypes.any,
};

export default Comments;
