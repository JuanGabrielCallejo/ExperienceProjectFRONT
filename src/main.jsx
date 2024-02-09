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
import { ReloadProvider } from "./components/providers/ReloadProvider";
import MyExperiences from "./Pages/MyExperiences";
import SingleExperience from "./Pages/SingleExperience";
import SearchUser from "./Pages/SearchUser";

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
        path: "/user/experiences/:exp_id",
        element: <SingleExperience />,
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
        path: "/user/:id",
        element: <SearchUser />,
      },
      {
        path: "/user/settings",
        element: <ModUser />,
      },
      {
        path: "/user/experience/:exp_id/settings",
        element: <ModExp />,
      },
      {
        path: "/user/experiences",
        element: <MyExperiences />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <ReloadProvider>
          <RouterProvider router={router} />
        </ReloadProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
