import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { ModUser } from "./Pages/ModUser";
import { CreateExperience } from "./Pages/CreateExperience";
import FilterExperience from "./Pages/FilterExperience";
import { ModExp } from "./Pages/ModExperience";
// import { AuthProvider } from "./components/providers/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/experiences",
    element: <FilterExperience />,
  },
  {
    path: "/compose/experience",
    element: <CreateExperience />,
  },
  {
    path: "/compose/experience",
    element: <CreateExperience />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/settings/profile",
    element: <ModUser />,
  },
  {
    path: "/settings/experience",
    element: <ModExp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
