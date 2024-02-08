import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ReloadContext } from "../components/providers/ReloadProvider";

const Listbox = styled("ul")(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    box-shadow: 0px 4px 6px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
    };
    z-index: 1;
    `
);

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E6",
  700: "#0059B3",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
    user-select: none;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &:focus {
      outline: 3px solid ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
      background-color: ${
        theme.palette.mode === "dark" ? grey[800] : grey[100]
      };
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
  
    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }
    `
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
        border: 1px solid ${
          theme.palette.mode === "dark" ? grey[700] : grey[200]
        };
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    margin-bottom: 5px;
    background-image: url('/img/fondoWeb.svg');
    background-size: cover; 
    background-position: center;
    transition: background 150ms ease; 

    &:hover {
      transform: scale(0.95);
      };
    }

    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px ${
        theme.palette.mode === "dark" ? blue[300] : blue[200]
      };
      outline: none;
    }
  `
);

const LoginDropDown = ({ user }) => {
  const navigate = useNavigate();
  const { reload, valoresCamposActuales } = useContext(ReloadContext);
  // console.log(user);
  // console.log(valoresCamposActuales);

  useEffect(() => {
    console.log("Se ha actualizado el estado");
  }, [reload]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    Swal.fire({
      title: "Sesión cerrada!",
      icon: "success",
    });
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="flex flex-col grow justify-end pb-6 mx-2 ">
      <Dropdown>
        <MenuButton>
          {" "}
          <div className="flex justify-center text-white">
            <img
              src={
                valoresCamposActuales
                  ? valoresCamposActuales.data.photo
                  : user.photo
              }
              className="w-6 h-6 mr-2 w-16 h-16 rounded-full object-cover"
            />
            <p>Hola, {user.name} !</p>
          </div>
        </MenuButton>
        <Menu slots={{ listbox: Listbox }}>
          <div className="flex flex-col w-full gap-2 p-6 ">
            <p className="flex self-center drop-shadow-lg">
              {user.name} {user.lastName}
            </p>
            <img
              src={
                valoresCamposActuales
                  ? valoresCamposActuales.data.photo
                  : user.photo
              }
              className="drop-shadow-lg w-16 h-16 rounded-full self-center object-cover"
            />
          </div>

          <MenuItem
            onClick={() => {
              navigate("/user/settings");
            }}
          >
            Perfil
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/user/experiences");
            }}
          >
            Mis Experiencias
          </MenuItem>
          <MenuItem
            className="rounded-full bg-red-500 text-white"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </MenuItem>
        </Menu>
      </Dropdown>
    </div>
  );
};

LoginDropDown.propTypes = {
  user: PropTypes.object,
};

export default LoginDropDown;
