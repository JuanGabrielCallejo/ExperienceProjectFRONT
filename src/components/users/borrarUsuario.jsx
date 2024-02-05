import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const BorrarUsuario = () => {
  const [, setMessage] = useState("");
  const navigate = useNavigate();
  const [user] = useContext(AuthContext);
  const borrarUsuario = async (event) => {
    try {
      event.stopPropagation();

      // AÑADIR UNA VENTANA DE CONFIRMACIÓN DE ELIMINACIÓN DE
      // USUARIO PARA ASEGURAR QUE QUIERES BORRAR

      const result = await Swal.fire({
        title: "Estás seguro?",
        text: "Se eliminarán todos los datos del usuario!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
      });

      if (result.isConfirmed) {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_HOST}/user/${user.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json", // Corregir la tipografía de 'application'
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (res.ok) {
          localStorage.removeItem("user");
          await res.json();

          // console.log(user.token);

          Swal.fire({
            title: "Usuario borrado!",
            text: "Se ha eliminado este usuario",
            icon: "success",
          });

          navigate("/");
          window.location.reload();
          // console.log(data);
          setMessage("Usuario borrado correctamente.");
        } else {
          setMessage("No se puede eliminar el usuario.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button
        className="bg-red-500 text-white rounded-md px-2 py-1"
        onClick={borrarUsuario}
      >
        Eliminar Usuario
      </button>
    </div>
  );
};

export default BorrarUsuario;
