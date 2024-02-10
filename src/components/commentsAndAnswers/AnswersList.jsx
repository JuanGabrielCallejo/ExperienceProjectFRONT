import PropTypes from "prop-types";
import Answers from "./Answers";

const AnswersList = ({ answers }) => {
  // console.log(answers);
  return (
    <>
      {answers.length === 0 ? (
        <div className="bg-white p-4 rounded-lg">
          <p>No hay respuestas.</p>
        </div>
      ) : (
        answers.map((answer, index) => (
          <div key={index}>
            <Answers ans={answer} />
          </div>
        ))
      )}
    </>
  );
};

AnswersList.propTypes = {
  answers: PropTypes.shape({
    map: PropTypes.object.isRequired,
  }),
};

export default AnswersList;
