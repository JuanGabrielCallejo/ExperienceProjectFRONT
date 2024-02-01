import { NavLink } from "react-router-dom";

export const Menu = () => {
  return (
    <div className="bg-blue-500 text-white p-3 font-bold flex justify-between ancho_total">
      <NavLink to="/" className="mx-2 hover:bg-blue-600">
        Home
      </NavLink>
      <NavLink to="/login" className="mx-2 hover:bg-blue-600">
        Login
      </NavLink>
      <NavLink to="/register" className="mx-2 hover:bg-blue-600">
        Registro
      </NavLink>
      <NavLink to="/experiences" className="mx-2 hover:bg-blue-600">
        Buscar Experiencias
      </NavLink>
      <NavLink to="/settings/profile" className="mx-2 hover:bg-blue-600">
        Modificar Perfil
      </NavLink>
      <NavLink to="/compose/experience" className="mx-2 hover:bg-blue-600">
        Crear Experiencia
      </NavLink>
      <NavLink to="/settings/experience" className="mx-2 hover:bg-blue-600">
        Modificar experiencia
      </NavLink>
    </div>
  );
};
