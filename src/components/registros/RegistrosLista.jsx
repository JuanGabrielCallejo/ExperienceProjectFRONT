import Registro from "./Registro";
// import PropTypes from "prop-types";
// import { jwtDecode } from "jwt-decode";
// import { useContext } from "react";
// import { AuthContext } from "../providers/AuthProvider";

const RegistrosLista = ({ registros }) => {
  // const [user] = useContext(AuthContext);
  // const decodedToken = user && user.token ? jwtDecode(user.token) : null;

  // const userId = decodedToken && decodedToken.id ? decodedToken.id : null;

  return registros.map((registro) => {
    // exp.self = userId === registro.user_id;
    // console.log(exp);
    return (
      <li key={registro.id} className="pb-8">
        <Registro registro={registro} />
      </li>
    );
  });
};

// ExpList.propTypes = {
//   experience: PropTypes.any,
// };
export default RegistrosLista;
