import PropTypes from "prop-types";
import Comments from "./Comments";

const CommentsList = ({ newComment }) => {
  // console.log(newComment);
  if (!newComment) {
    return <p>No hay comentarios disponibles.</p>;
  }

  let parseComments = [];
  try {
    parseComments = JSON.parse(newComment);
    // console.log(parseComments);
  } catch (error) {
    console.error("Error al analizar los comentarios:", error.message);

    return <p>Error al cargar los comentarios.</p>;
  }
  // console.log(newComment);
  return parseComments.map((comment) => (
    <div key={comment.comment_id} className="mt-4">
      <Comments com={comment} />
    </div>
  ));
};

CommentsList.propTypes = {
  exp: PropTypes.object,
  newComment: PropTypes.string,
};

export default CommentsList;
