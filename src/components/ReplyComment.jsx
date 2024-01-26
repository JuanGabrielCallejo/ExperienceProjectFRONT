import PropTypes from "prop-types";
import { useState } from "react";
import postReplyComment from "../services/postReplyComment";
import Swal from "sweetalert2";
import getAnswers from "../services/getAnswers";

const ReplyComment = ({ comment, setShowTextArea, setAnswers }) => {
  const [commentText, setCommentText] = useState("");
  const [length, setLength] = useState("");

  const postComment = async () => {
    if (commentText.length < 10) {
      setLength("El texto debe tener mínimo 10 carácteres");
      throw new Error("El texto debe tener mínimo 10 carácteres");
    }

    const replyData = await postReplyComment(comment.comment_id, commentText);
    Swal.fire({
      title: "Respuesta Enviada!",
      icon: "success",
    });
    return replyData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postComment();

      const getAns = await getAnswers(comment.comment_id);

      setAnswers(getAns);
      setCommentText("");
      setShowTextArea(false);
    } catch (error) {
      console.error("Error insertando mensaje:", error.message);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Comentario
        </h3>
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
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Enviar comentario
        </button>
      </form>
    </>
  );
};

ReplyComment.propTypes = {
  setShowTextArea: PropTypes.any,
  setAnswers: PropTypes.any,
  comment: PropTypes.any,
  exp: PropTypes.any,
};

export default ReplyComment;
