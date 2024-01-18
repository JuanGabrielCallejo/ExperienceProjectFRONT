import PropTypes from "prop-types";

const Comments = ({ com }) => {
  return (
    <>
      <p>{com.comment_user}</p>
      <p>{com.comment_text}</p>
    </>
  );
};

Comments.propTypes = {
  com: PropTypes.array,
};

export default Comments;
