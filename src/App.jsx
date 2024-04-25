import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { ContextoPersonal } from "./Contexts/ContextoPersonal";

// import HomePage from "./Pages/HomePage";
// import LoginPage from "./Pages/LoginPage";
// import RegisterPage from "./Pages/RegisterPage";
// import { ModUser } from "./Pages/ModUser";
// import { CreateExperience } from "./Pages/CreateExperience";
// import FilterExperience from "./Pages/FilterExperience";
// import { ModExp } from "./Pages/ModExperience";
import { Layout } from "./components/style/Layout";
// import { AuthProvider } from "./components/providers/AuthProvider";
// import { SearchProvider } from "./components/providers/SearchProvider";
// import { ReloadProvider } from "./components/providers/ReloadProvider";
// import MyExperiences from "./Pages/MyExperiences";
// import SingleExperience from "./Pages/SingleExperience";
// import SearchUser from "./Pages/SearchUser";
import PaginaPrincipal from "./Pages/PaginaPrincipal";
import Registros from "./Pages/Registros";
import Lugares from "./Pages/Lugares";
import InsertarRegistro from "./Pages/InsertarRegistro";
import { useState } from "react";
// import Camara from "./components/Camara";
// import WebcamStreamCapture from "./components/WebcamStreamCapture";
// import volcadoImagenes from "./components/registros/volcadoImagenes";
// import pruebaS3React from "../pruebaS3React.jsx";

const App = () => {
  const [admin, setAdmin] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <PaginaPrincipal />,
        },
        {
          path: "/registros",
          element: <Registros pruebas={false} />,
        },
        {
          path: "/registros/pruebas",
          element: <Registros pruebas={true} />,
        },
        {
          path: "/lugares",
          element: <Lugares />,
        },
        {
          path: "/registro/insertar",
          element: <InsertarRegistro />,
        },
        // {
        //   path: "/prueba",
        //   element: <pruebaS3React />,
        // },
        // {
        //   path: "/imagenes",
        //   element: <volcadoImagenes />,
        // },
        // {
        //   path: "/user/experiences/:exp_id",
        //   element: <SingleExperience />,
        // },
        // {
        //   path: "/compose/experience",
        //   element: <CreateExperience />,
        // },
        // {
        //   path: "/login",
        //   element: <LoginPage />,
        // },
        // {
        //   path: "/register",
        //   element: <RegisterPage />,
        // },

        // {
        //   path: "/user/settings",
        //   element: <ModUser />,
        // },
        // {
        //   path: "/user/experience/:exp_id/settings",
        //   element: <ModExp />,
        // },
        // {
        //   path: "/user/experiences",
        //   element: <MyExperiences />,
        // },
      ],
    },
  ]);

  return (
    <ContextoPersonal.Provider
      value={{
        admin_estado: [admin, setAdmin]
      }}>
      {/* <AuthProvider>
      <SearchProvider>
        <ReloadProvider> */}
      <RouterProvider router={router} />
      {/* </ReloadProvider>
      </SearchProvider>
    </AuthProvider> */}
    </ContextoPersonal.Provider>
  );
};

export default App;
