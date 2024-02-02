import { NavLink } from "react-router-dom";
import { SiGooglehome } from "react-icons/si";

export const Menu = () => {
  return (
    <div className="bg-gray-300 text-black w-max p-6 flex flex-col gap-10 ">
      <NavLink to="/" className="mx-2 hover:font-bold">
        <SiGooglehome />
        HOME
      </NavLink>
      <NavLink to="/experiences" className="mx-2 hover:font-bold">
        BUSCAR EXPERIENCIAS
      </NavLink>
      <NavLink to="/settings/profile" className="mx-2 hover:font-bold">
        Modificar Perfil
      </NavLink>
      <NavLink to="/compose/experience" className="mx-2 hover:font-bold">
        CREAR EXPERIENCIA
      </NavLink>
      <NavLink to="/settings/experience" className="mx-2 hover:font-bold">
        Modificar experiencia
      </NavLink>
    </div>
  );
};
