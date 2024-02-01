import Experience from "./Experience";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

const ExpList = ({ experience }) => {
  const token = import.meta.env.VITE_TOKEN;
  const decodedToken = jwtDecode(token);

  const userId = decodedToken.id;

  return experience.map((exp) => {
    exp.self = userId === exp.user_id;
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
