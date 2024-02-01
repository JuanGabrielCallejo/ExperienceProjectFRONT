import PropTypes from "prop-types";
import Answers from "./Answers";

const AnswersList = ({ answers }) => {
  // console.log(answers);
  return (
    <>
      {answers.map((answer, index) => (
        <div key={index}>
          <Answers ans={answer} />
        </div>
      ))}
    </>
  );
};

AnswersList.propTypes = {
  answers: PropTypes.shape({
    map: PropTypes.any.isRequired,
  }),
};

export default AnswersList;
