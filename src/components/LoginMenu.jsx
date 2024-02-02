import { NavLink } from "react-router-dom";
// import { SiGooglehome } from "react-icons/si";

export const LoginMenu = () => {
  return (
    <div className=" bg-gray-300 text-black w-max p-6 flex flex-row grow gap-10 w-max ">
      <NavLink to="/login" className="mx-2 hover:font-bold h-6 self-end">
        Login
      </NavLink>
      <NavLink to="/register" className="mx-2 hover:font-bold h-6 self-end">
        Registro
      </NavLink>
    </div>
  );
};
