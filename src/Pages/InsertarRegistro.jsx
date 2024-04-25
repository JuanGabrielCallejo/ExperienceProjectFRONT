import React from 'react'
import { useState } from "react";
import InsertarRegistroFormulario from "../components/registros/InsertarRegistroFormulario";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


const InsertarRegistro = () => {
    const [exito, setExito] = useState(false);
    const [pruebas, setPruebas] = useState(false);
    const navigate = useNavigate();


    const mensajeExito = () => {
        Swal.fire({
            icon: "success",
            title: "Registrado!",
            text: "Se ha insertado el registro.",
            // footer: '<a href="/registros">Ver registros</a>',
        }).then((result) => {
            if (result.isConfirmed) {
                let url = "/registros";
                pruebas ? url = url + "/pruebas" : "";
                navigate(url);
            }
        });
    };

    return (
        <div className="mt-4">
            {exito ? mensajeExito() : <div className="flex flex-col">
                <InsertarRegistroFormulario setExito={setExito} pruebas={pruebas} setPruebas={setPruebas} />
            </div>}{" "}
        </div>

    );

};

export default InsertarRegistro;
