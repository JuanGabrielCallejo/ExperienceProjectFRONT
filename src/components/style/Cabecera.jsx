import { NavLink } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { HiOutlinePencilSquare } from "react-icons/hi2";


export const Cabecera = () => {

  return (
    <div className=" text-black w-max p-6 flex gap6 ">
      <NavLink to="/" className="mx-2 hover:font-bold">
        <div className="flex gap-2">
          {/* <GrHomeRounded /> */}
          <b>INICIO</b>
        </div>
      </NavLink>
      <NavLink to="/registros" className="mx-2 hover:font-bold">
        <div className="flex gap-2">
          {/* <PiMagnifyingGlassBold />  */}
          <b>REGISTROS</b>
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
          <b>NUEVO REGISTRO</b>
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
