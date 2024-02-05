import { NavLink } from "react-router-dom";
// import { SiGooglehome } from "react-icons/si";

export const LoginMenu = () => {
  return (
    <div className=" bg-gray-300 text-black w-max p-6 flex flex-row grow gap-6 w-max ">
      <NavLink
        to="/login"
        className="mx-2 hover:bg-gray-100 self-end bg-gray-200 p-4 rounded-2xl shadow-2xl"
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className="mx-2 hover:bg-gray-100 self-end bg-gray-200 p-4 rounded-2xl shadow-2xl"
      >
        Registro
      </NavLink>
    </div>
  );
};
