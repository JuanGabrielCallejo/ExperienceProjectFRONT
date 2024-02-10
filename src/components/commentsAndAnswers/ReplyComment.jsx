import PropTypes from "prop-types";
import { useContext, useState } from "react";
import postReplyComment from "../../services/postReplyComment";
import Swal from "sweetalert2";
import getAnswers from "../../services/getAnswers";
import { AuthContext } from "../providers/AuthProvider";

const ReplyComment = ({ comment, setShowTextArea, setAnswers }) => {
  const [commentText, setCommentText] = useState("");
  const [length, setLength] = useState("");
  const [user] = useContext(AuthContext);

  const postComment = async () => {
    if (commentText.length < 10) {
      setLength("El texto debe tener mínimo 10 carácteres");
      throw new Error("El texto debe tener mínimo 10 carácteres");
    }

    const replyData = await postReplyComment(
      comment.comment_id,
      commentText,
      user
    );
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
    <div className="mt-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg lg:text-2xl font-bold text-gray-900 ">
          Comentario
        </h3>
      </div>
      <form className="mb-6 w-96" onSubmit={handleSubmit}>
        <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg bg-gray-800 border-gray-700">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="6"
            className="px-0 w-full text-sm border-0 focus:ring-0 text-white placeholder-gray-400 bg-gray-800"
            placeholder="Escribe tu respuesta..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          ></textarea>
        </div>
        <div>{length}</div>
        <button
          type="submit"
          className="mx-2 hover:bg-gray-100 flex items-center justify-center bg-gray-200 p-4 rounded-2xl shadow-2xl h-4 text-black"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

ReplyComment.propTypes = {
  setShowTextArea: PropTypes.any,
  setAnswers: PropTypes.any,
  comment: PropTypes.any,
  exp: PropTypes.any,
};

export default ReplyComment;
