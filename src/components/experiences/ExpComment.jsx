import PropTypes from "prop-types";
import { useContext, useState } from "react";
import PostExpComment from "../../services/postExpComment";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const ExpComment = ({ exp, newComment, setNewComment }) => {
  const [commentText, setCommentText] = useState("");
  const [length, setLength] = useState("");
  const [user] = useContext(AuthContext);
  const postComment = async () => {
    if (commentText.length < 10) {
      setLength("El texto debe tener mínimo 10 carácteres");
      throw new Error("El texto debe tener mínimo 10 carácteres");
    }
    const createdComment = await PostExpComment(exp.id, commentText, user);

    Swal.fire({
      title: "Comentario Enviado!",
      icon: "success",
    });

    return createdComment;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createdComment = await postComment();

      let parseComments = [];
      try {
        parseComments = JSON.parse(newComment);
      } catch (error) {
        console.error("Error al analizar los comentarios:", error.message);
      }

      const comment = {
        comment_id: createdComment.id,
        comment_text: createdComment.text,
        comment_user: createdComment.name,
        comment_user_photo: createdComment.photo,
        comment_created_at: createdComment.createdAt,
      };
      // console.log(parseComments);
      // console.log(newComment);
      // console.log(comment);
      const newCommentList = [comment, ...(parseComments || [])];
      // console.log(newCommentList);
      setNewComment(JSON.stringify(newCommentList));
      setLength("");
      setCommentText("");
    } catch (error) {
      console.error("Error insertando mensaje:", error);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-black">
          Comentario
        </h2>
      </div>
      <form className="mb-6" onSubmit={handleSubmit}>
        <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg bg-gray-800 border-gray-700">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="6"
            className="px-0 w-full text-sm  border-0 focus:ring-0 text-white placeholder-gray-400 bg-gray-800"
            placeholder="Escribe tu comentario..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          ></textarea>
        </div>
        <div>{length}</div>
        <button
          type="submit"
          className="mx-2 hover:bg-gray-100 flex items-center justify-center bg-gray-200 p-4 rounded-2xl shadow-2xl h-4"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

ExpComment.propTypes = {
  setShowTextArea: PropTypes.any,
  newComment: PropTypes.any,
  setNewComment: PropTypes.any,
  comment: PropTypes.any,
  exp: PropTypes.any,
};

export default ExpComment;
