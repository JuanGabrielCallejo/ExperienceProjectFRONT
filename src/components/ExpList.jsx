import Experience from "./Experience";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

const ExpList = ({ experience }) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Ikp1YW4iLCJpYXQiOjE3MDYyNTk3MjYsImV4cCI6MTcwNjQzMjUyNn0.XbM7OTWHplISE9c_NuO9MEEpurO13vzCNwvaSQd-sW0";
  const decodedToken = jwtDecode(token);

  const userId = decodedToken.id;

  return experience.map((exp) => {
    exp.self = userId === exp.user_id;

    // console.log(exp.user_id);
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
