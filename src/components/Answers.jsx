import PropTypes from "prop-types";

const Answers = ({ ans }) => {
  return (
    <>
      <p>{ans.name}</p>
      <p>{ans.text}</p>
    </>
  );
};

Answers.propTypes = {
  ans: PropTypes.array,
};

export default Answers;
