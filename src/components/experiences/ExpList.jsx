import Experience from "./Experience";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "./providers/AuthProvider";

const ExpList = ({ experience }) => {
  const [user] = useContext(AuthContext);
  const decodedToken = jwtDecode(user.token);

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
