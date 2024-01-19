import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Answers from "./Answers";
import getAnswers from "../services/getAnswers";

const AnswersList = ({ comment }) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { comment_id } = comment;
        const fetchedAnswers = await getAnswers(comment_id);

        setAnswers(fetchedAnswers);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [comment]);

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
  comment: PropTypes.shape({
    comment_id: PropTypes.string.isRequired,
  }),
};

export default AnswersList;
