import PropTypes from "prop-types";
import Comments from "./Comments";
import AnswersList from "./AnswersList";
import { useState } from "react";

const CommentsList = ({ exp }) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const { comments } = exp;
  const parseComments = comments ? JSON.parse(comments) : null;

  if (parseComments === null) {
    return null;
  }

  return parseComments.map((comment) => (
    <div key={comment.comment_id}>
      <Comments com={comment} />
      <button onClick={() => setShowAnswers(!showAnswers)}>
        {showAnswers ? <p>Ocultar Respuestas</p> : <p>Ver Respuestas</p>}
      </button>
      <p>{showAnswers ? <AnswersList comment={comment} /> : <></>}</p>
    </div>
  ));
};

CommentsList.propTypes = {
  exp: PropTypes.array,
};

export default CommentsList;
