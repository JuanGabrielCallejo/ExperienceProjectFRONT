import { NavLink } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useContext } from "react";
import { AuthContext } from "./providers/AuthProvider";

export const MenuNav = () => {
  const [user] = useContext(AuthContext);

  return (
    <div className=" text-black w-max p-6 flex sm:flex-col mobile:flex-row gap-8 ">
      <NavLink
        onClick={window.scrollTo(0, 0)}
        to="/"
        className="mx-2 mobile:hidden sm:block hover:scale-95"
      >
        <div className="flex gap-2">
          <GrHomeRounded />
          <p>HOME</p>
        </div>
      </NavLink>
      {user && (
        <NavLink
          onClick={window.scrollTo(0, 0)}
          to="/"
          className="mx-2 sm:hidden md:hidden lg:hidden xl:hidden hover:scale-95"
        >
          <div className="flex gap-2">
            <GrHomeRounded />
          </div>
        </NavLink>
      )}
      <NavLink
        to="/experiences"
        className="mx-2 hover:scale-95  sm:hidden md:hidden lg:hidden xl:hidden"
      >
        <div className="flex gap-2">
          <PiMagnifyingGlassBold />
        </div>
      </NavLink>
      <NavLink
        to="/experiences"
        className="mx-2 hover:scale-95 mobile:hidden sm:hidden md:block lg:block xl:hidden"
      >
        <div className="flex gap-2">
          <PiMagnifyingGlassBold /> <p>BUSCAR EXP</p>
        </div>
      </NavLink>
      <NavLink
        to="/experiences"
        className="mx-2 hover:scale-95 mobile:hidden sm:hidden md:hidden lg:hidden xl:block"
      >
        <div className="flex gap-2">
          <PiMagnifyingGlassBold /> <p>BUSCAR EXPERIENCIAS</p>
        </div>
      </NavLink>
      {user && (
        <NavLink
          to="/compose/experience"
          className="mx-2 hover:scale-95 mobile:hidden sm:hidden md:hidden lg:hidden xl:block"
        >
          <div className="flex gap-2">
            <HiOutlinePencilSquare />
            <p>CREAR EXPERIENCIA</p>
          </div>
        </NavLink>
      )}
      {user && (
        <NavLink
          to="/compose/experience"
          className="mx-2 hover:scale-95 mobile:hidden sm:hidden md:block lg:block xl:hidden"
        >
          <div className="flex gap-2">
            <HiOutlinePencilSquare />
            <p>CREAR EXP</p>
          </div>
        </NavLink>
      )}
      {user && (
        <NavLink
          to="/compose/experience"
          className="mx-2 hover:scale-95 sm:hidden md:hidden lg:hidden xl:hidden"
        >
          <div className="flex gap-2">
            <HiOutlinePencilSquare />
          </div>
        </NavLink>
      )}
    </div>
  );
};
