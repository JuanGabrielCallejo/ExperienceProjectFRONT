import Swal from "sweetalert2";
import Formulary from "./Formulary";
import Message from "./Message";
import { useState } from "react";
// import { NavLink } from "react-router-dom";

const Register = () => {
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);

  const success = () => {
    Swal.fire({
      icon: "success",
      title: "Registrado!",
      text: "Te has registrado correctamente.",
      footer: '<a href="/login">Ir a Loggearse</a>',
    });
  };
  return (
    <div className="mt-4">
      {exito ? (
        success()
      ) : (
        <Formulary setMensaje={setMensaje} setExito={setExito} />
      )}{" "}
      <Message mensaje={mensaje} />
    </div>
  );
};

export default Register;
