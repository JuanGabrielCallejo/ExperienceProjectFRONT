import CommentsList from "./CommentsList";
import Experience from "./Experience";
import PropTypes from "prop-types";

const ExpList = ({ experience }) => {
  return experience.map((exp) => {
    return (
      <li key={exp.id}>
        <Experience exp={exp} />
        <CommentsList exp={exp} />
      </li>
    );
  });
};

ExpList.propTypes = {
  experience: PropTypes.array,
};
export default ExpList;
