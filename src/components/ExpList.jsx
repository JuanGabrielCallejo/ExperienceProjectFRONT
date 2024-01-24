import Experience from "./Experience";
import PropTypes from "prop-types";

const ExpList = ({ experience }) => {
  return experience.map((exp) => {
    return (
      <li key={exp.id}>
        <Experience exp={exp} />
      </li>
    );
  });
};

ExpList.propTypes = {
  experience: PropTypes.any,
};
export default ExpList;
