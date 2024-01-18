import Header from "./Header";
import Formulary from "./Formulary";
import Message from "./Message";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Register = () => {

    const [mensaje, setMensaje] = useState("");
    const [exito, setExito] = useState(false);

    return (
        <div className="max-w-sm mx-auto mt-8 p-4 bg-white rounded shadow-md text-sm">
            <Header />
            {exito ? <NavLink to="/login">Login</NavLink>
                : <Formulary setMensaje={setMensaje} setExito={setExito} />}            <Message mensaje={mensaje} />
        </div>
    );
};

export default Register;
