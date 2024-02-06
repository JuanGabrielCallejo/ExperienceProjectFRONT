import { NavLink } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export const MenuNav = () => {
  return (
    <div className="bg-gray-300 text-black w-max p-6 flex flex-col gap-8 ">
      <NavLink to="/" className="mx-2 hover:font-bold">
        <div className="flex gap-2">
          <GrHomeRounded />
          <p>HOME</p>
        </div>
      </NavLink>
      <NavLink to="/experiences" className="mx-2 hover:font-bold">
        <div className="flex gap-2">
          <PiMagnifyingGlassBold /> <p>BUSCAR EXPERIENCIAS</p>
        </div>
      </NavLink>
      <NavLink to="/compose/experience" className="mx-2 hover:font-bold">
        <div className="flex gap-2">
          <HiOutlinePencilSquare />
          <p>CREAR EXPERIENCIA</p>
        </div>
      </NavLink>
      <NavLink to="/settings/experience" className="mx-2 hover:font-bold">
        Modificar experiencia
      </NavLink>
    </div>
  );
};
