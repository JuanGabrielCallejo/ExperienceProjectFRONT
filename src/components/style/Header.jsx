import { useNavigate } from "react-router-dom";
import { Menu } from "../Menu";
import { LoginMenu } from "../LoginMenu";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

export const Header = () => {
  const navigate = useNavigate();
  const [user] = useContext(AuthContext);
  // console.log(user);
  return (
    <div className="p-2 fixed h-screen flex flex-col justify-end">
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        <img className="object-fit" src="/img/prototipo1.png" />
      </button>

      {/* <img className="object-fit m-2" src="/img/My experiences.png"></img> */}

      <Menu />
      {user ? (
        <div className="flex flex-col grow justify-end">
          <p>Hola, {user.name} !</p>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              Swal.fire({
                title: "Sesión cerrada!",
                // text: "Se ha eliminado este usuario",
                icon: "success",
              });
              navigate("/");
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }}
            className="rounded-full bg-red-500 text-white p-2 text-sm hover:cursor-pointer"
          >
            LogOut
          </button>
        </div>
      ) : (
        <LoginMenu />
      )}
    </div>
  );
};
