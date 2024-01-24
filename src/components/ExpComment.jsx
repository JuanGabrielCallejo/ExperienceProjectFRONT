import PropTypes from "prop-types";
import { useState } from "react";
import postExpComment from "../services/postExpComment";
import Swal from "sweetalert2";

const ExpComment = ({ exp, setShowTextArea }) => {
  const [commentText, setCommentText] = useState("");
  const [length, setLength] = useState("");

  const postComment = async () => {
    if (commentText.length < 10) {
      setLength("El texto debe tener mínimo 10 carácteres");
      throw new Error("El texto debe tener mínimo 10 carácteres");
    }

    await postExpComment(exp.id, commentText);
    Swal.fire({
      title: "Comentario Enviado!",
      icon: "success",
    });
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postComment();

      setCommentText("");
      setShowTextArea(false);
    } catch (error) {
      console.error("Error insertando mensaje:", error.message);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Comentario
        </h2>
      </div>
      <form className="mb-6" onSubmit={handleSubmit}>
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="6"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Escribe tu respuesta..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          ></textarea>
        </div>
        <div>{length}</div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Enviar comentario
        </button>
      </form>
    </>
  );
};

ExpComment.propTypes = {
  setShowTextArea: PropTypes.any,
  comment: PropTypes.any,
  exp: PropTypes.any,
};

export default ExpComment;
