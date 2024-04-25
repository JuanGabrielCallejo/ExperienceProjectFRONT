import { NavLink } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useContext, useState } from "react";
import { ContextoPersonal } from "../../Contexts/ContextoPersonal";


export const Cabecera = () => {

  const { admin_estado } = useContext(ContextoPersonal);
  const [admin, setAdmin] = admin_estado;

  return (
    <div className=" text-black w-max p-2 flex text-sm">
      <img src="/img/logo_cuaderno_olasolLite.png" className="w-6 h-6" />
      <NavLink to="/" className="mx-2 hover:font-bold">
        <div className="flex gap-2">
          {admin ?
            <b>INICIO_</b>
            : <b>INICIO</b>}
        </div>
      </NavLink>
      <NavLink to="/registros" className="mx-2 hover:font-bold">
        <div className="flex gap-2">
          {/* <PiMagnifyingGlassBold />  */}
          <b>REGISTROS</b>
        </div>
      </NavLink>
      <NavLink to="/registros/pruebas" className="mx-2 hover:font-bold">
        <div className="flex gap-2">
          {/* <PiMagnifyingGlassBold />  */}
          <b>P</b>
        </div>
      </NavLink>
      {/* <NavLink to="/lugares" className="mx-2 hover:font-bold">
        <div className="flex gap-2">
          <p>LUGARES</p>
        </div>
      </NavLink> */}
      <NavLink to="/registro/insertar" className="mx-2 hover:font-bold">
        <div className="flex gap-2">
          {/* <PiMagnifyingGlassBold />  */}
          <b>REGISTRAR</b>
        </div>
      </NavLink>
      {/* {user && (
        <NavLink to="/compose/experience" className="mx-2 hover:font-bold">
          <div className="flex gap-2">
            <HiOutlinePencilSquare />
            <p>CREAR EXPERIENCIA</p>
          </div>
        </NavLink>
      )} */}
    </div>
  )
};
