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
import { Layout } from "./components/style/Layout";
import { AuthProvider } from "./components/providers/AuthProvider";
import { SearchProvider } from "./components/providers/SearchProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
