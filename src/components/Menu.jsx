import { NavLink } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useContext } from "react";
import { AuthContext } from "./providers/AuthProvider";

export const MenuNav = () => {
  const [user] = useContext(AuthContext);

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
      {user && (
        <NavLink to="/compose/experience" className="mx-2 hover:font-bold">
          <div className="flex gap-2">
            <HiOutlinePencilSquare />
            <p>CREAR EXPERIENCIA</p>
          </div>
        </NavLink>
      )}
    </div>
  );
};
