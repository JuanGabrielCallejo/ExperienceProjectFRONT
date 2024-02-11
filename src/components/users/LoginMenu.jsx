import { NavLink } from "react-router-dom";
// import { SiGooglehome } from "react-icons/si";

export const LoginMenu = () => {
  return (
    <div className=" text-black w-max xl:p-6 lg:p-2 lg:pb-6 flex lg:flex-row grow xl:gap-6 lg:gap-1 ">
      <NavLink
        to="/login"
        className="mx-2 hover:bg-gray-100 self-end bg-[url('/img/fondoWeb.svg')] bg-cover text-center text-white p-4 rounded-2xl shadow-2xl hover:scale-95 md:mb-8 lg:mb-0"
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className="mx-2 hover:bg-gray-100 self-end bg-[url('/img/fondoWeb.svg')] bg-cover text-white p-4 rounded-2xl shadow-2xl hover:scale-95 md:mb-8 lg:mb-0"
      >
        Registro
      </NavLink>
    </div>
  );
};
