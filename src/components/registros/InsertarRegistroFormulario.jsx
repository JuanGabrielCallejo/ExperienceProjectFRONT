import { useEffect, useState } from "react";
import resizeImage from "../../services/resizeImg";
import {
    validateText,
    validateEmail,
    validatePassword,
} from "../../services/validateFields";
import { AiOutlineCamera } from 'react-icons/ai';
import useLugares from "../../hooks/useLugares";


const InsertarRegistroFormulario = ({ setExito }) => {
    const ahora = new Date();
    const ahoraISO = ahora.toISOString();
    const predefinido = '1';
    const [campos, setCampos] = useState({
        momento: ahoraISO,
        numero_olas: predefinido,
        gente: predefinido,
        que_tal_olas: predefinido,
        que_tal_yo: predefinido,
        texto: predefinido,
    });
    const sampleFormData = {
        usuario_id: 1,
        altura_marea: 1.5,
        altura_ola: 2.0,
        direccion_ola: 180,
        direccion_viento: 270,
        foto_sesion: 'path/to/foto_sesion.jpg',
        fotos_sesion: 'path/to/photo1.jpg',
        lluvia: 1.4,
        nubes: 3,
        periodo_ola: 10,
        punto_marea: 2,
        subiendo_marea: 1,
        temperatura_agua: 25.5,
        temperatura_ambiente: 20.0,
        tiempo: 3,
        velocidad_viento: 15.0,
    };
    const [mensaje, setMensaje] = useState();

    const { lugares } = useLugares();

    useEffect(() => {
        setMensaje("");
    }, []);

    const handleChange = (e) => {
        setCampos({
            ...campos,
            [e.target.name]: e.target.value,
        });
    };

    async function peticionServidor(formData) {
        // console.log(JSON.stringify(usuario));
        let datos;
        try {
            const respuesta = await fetch(
                `${import.meta.env.VITE_REACT_HOST}/registro`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            // console.log(respuesta);
            datos = await respuesta.json();
            // console.log(datos);
            setMensaje(datos.message);
            // console.log(mensaje);
            if (!respuesta.ok) {
                setMensaje("El email ya está en uso");
                // setMensaje(mensaje + " - Error al intentar registrar");
                console.log(
                    `Error en la petición: ${respuesta.status} - ${respuesta.statusText} - ${datos.data}`
                );
                return datos;
            }
            setExito(true);
            return datos;
        } catch (error) {
            setMensaje("Error indefinido");
            console.log("Error: " + error.message);
        }
    }

    async function insertarRegistro(evento) {
        evento.preventDefault();
        let mensaje = "defecto";
        setMensaje(mensaje);

        let CamposValidos = true;
        let campoValido = true;
        let mensajeCampo = "";

        let formData = new FormData();

        for (const key in campos) {
            formData.append(key, campos[key]);
        }

        for (const key in sampleFormData) {
            formData.append(key, sampleFormData[key]);
        }

        const photo = evento.target.elements.fotos.files[0];
        if (photo) {
            const imgMaxWidth = 400;
            const imgMaxHeight = 200;
            const resizedPhoto = await resizeImage(photo, imgMaxWidth, imgMaxHeight);
            formData.append("fotos", resizedPhoto);
        }

        // ({ isValid: campoValido, message: mensajeCampo } = validateText(nombre, 2, 30, "nombre"));
        // CamposValidos = CamposValidos && campoValido;
        // if (campoValido) {
        //     formData.append("name", nombre);
        // } else {
        //     mensaje = mensaje + " -  " + mensajeCampo;
        // }

        // ({ isValid: campoValido, message: mensajeCampo } = validateText(apellido, 2, 30, "apellido"));
        // CamposValidos = CamposValidos && campoValido;
        // if (campoValido) {
        //     formData.append("lastName", apellido);
        // } else {
        //     mensaje = mensaje + " -  " + mensajeCampo;
        // }

        // ({ isValid: campoValido, message: mensajeCampo } = validateEmail(email, 2, 30, "email"));
        // CamposValidos = CamposValidos && campoValido;
        // if (campoValido) {
        //     formData.append("email", email);
        // } else {
        //     mensaje = mensaje + " -  " + mensajeCampo;
        // }

        // ({ isValid: campoValido, message: mensajeCampo } = validatePassword(password, 2, 30, "password"));
        // CamposValidos = CamposValidos && campoValido;
        // if (campoValido) {
        //     formData.append("password", password);
        // } else {
        //     mensaje = mensaje + " -  " + mensajeCampo;
        // }

        if (CamposValidos) {
            peticionServidor(formData);
        }
        console.log("formData >>>>>>>");
        console.log(formData);
        setMensaje(mensaje);
    }

    return (
        <>
            <form onSubmit={insertarRegistro}>
                <div className="flex">
                    <label htmlFor="icon-button-file" className="cursor-pointer">
                        <span className="relative inline-block">
                            <span className="rounded-full bg-gray-200 hover:bg-gray-300">
                                <AiOutlineCamera className="h-20 w-20 text-gray-600" />
                            </span>
                            <input
                                accept="image/*"
                                id="icon-button-file"
                                type="file"
                                capture="environment"
                                className="hidden"
                                name="fotos"
                                onChange={(e) => handleChange(e.target)}
                            />
                        </span>
                    </label>

                    <div className="mb-4">
                        <label htmlFor="lugar" className="text-gray-700">
                            Lugar
                        </label>
                        <select
                            id="lugar_id"
                            name="lugar_id"
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md "
                        >
                            {lugares.map((lugar) => (
                                <option key={lugar.id} value={lugar.id}>
                                    {lugar.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" className="block mx-auto px-4 py-2 bg-blue-500 text-white rounded-md">
                    Registrar
                </button>

                {Object.keys(campos).filter(key => campos[key] !== "lugar_id").map((key) => (
                    <div key={key} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">{key.replace(/_/g, ' ')}</label>
                        <input
                            type="text"
                            name={key}
                            value={campos[key]}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                ))}


            </form>
            <div className="flex justify-center h-4 w-full items-center">
                {mensaje && (
                    <div className={`w-fit mt-6 p-2 bg-white rounded text-center`}>
                        {mensaje}
                    </div>
                )}
            </div>
        </>
    );
}
export default InsertarRegistroFormulario;