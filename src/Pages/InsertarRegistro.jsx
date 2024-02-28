import { useState } from "react";
import InsertarRegistroFormulario from "../components/registros/InsertarRegistroFormulario";
import Swal from "sweetalert2";
const InsertarRegistro = () => {
    const [exito, setExito] = useState(false);
    const mensajeExito = () => {
        Swal.fire({
            icon: "success",
            title: "Registrado!",
            text: "Se ha insertado el registro.",
            footer: '<a href="/registros">Ver registros</a>',
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirect to the specified page
                window.location.href = "/registros";
            }
        });
    };

    return (
        <div className="mt-4">
            {exito ? mensajeExito() : <div className="flex flex-col">
                <InsertarRegistroFormulario setExito={setExito} />
            </div>}{" "}
        </div>

    );

};

export default InsertarRegistro;
