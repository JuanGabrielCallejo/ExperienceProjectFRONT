import Swal from "sweetalert2";
import Formulary from "./Formulary";
import { useState } from "react";
import PropTypes from "prop-types";

const Register = ({ setSuccessMsg }) => {
  const [exito, setExito] = useState(false);

  const success = () => {
    setSuccessMsg(true);
    Swal.fire({
      icon: "success",
      title: "Registrado!",
      text: "Te has registrado correctamente.",
      footer: '<a href="/login">Ir a Loggearse</a>',
    });
  };
  return (
    <div className="lg:mt-4 w-3/4">
      {exito ? success() : <Formulary setExito={setExito} />}{" "}
    </div>
  );
};

Register.propTypes = {
  setSuccessMsg: PropTypes.func,
};

export default Register;
