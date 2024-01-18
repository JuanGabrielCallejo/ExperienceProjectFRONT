import { NavLink } from "react-router-dom";

export const Menu = () => {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Registro</NavLink>
    </>
  );
};
