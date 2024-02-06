import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Message = ({ mensaje }) => {
  // mensaje = "nada";
  return (
    <div className="text-gray-700 flex flex-col gap-2">
      <p>{mensaje}</p>
      {mensaje && (
        <NavLink
          to={"/"}
          className=" hover:bg-gray-100 self-center bg-gray-200 p-3 rounded-2xl shadow-2xl"
        >
          HOME
        </NavLink>
      )}
    </div>
  );
};

Message.propTypes = {
  mensaje: PropTypes.string,
};
export default Message;
