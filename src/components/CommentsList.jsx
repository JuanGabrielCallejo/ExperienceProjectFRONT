import PropTypes from "prop-types";
import Comments from "./Comments";

const CommentsList = ({ exp }) => {
  const { comments } = exp;

  if (!comments) {
    return <p>No hay comentarios disponibles.</p>;
  }

  let parseComments = [];
  try {
    parseComments = JSON.parse(comments);
  } catch (error) {
    console.error("Error al analizar los comentarios:", error.message);

    return <p>Error al cargar los comentarios.</p>;
  }

  return parseComments.map((comment) => (
    <div key={comment.comment_id}>
      <Comments com={comment} />
    </div>
  ));
};

CommentsList.propTypes = {
  exp: PropTypes.any,
};

export default CommentsList;
