import { Izquierda } from "./Izquierda";
import { Outlet } from "react-router-dom";
import { Pie } from "./Pie";

const Layout = () => {
  return (
    <main className="grid grid-cols-[320px_1px_1fr] h-screen">
      <header className="bg-white flex  ">
        {" "}
        <Izquierda />
      </header>
      <div className="bg-black"></div>
      <div className="flex flex-col">
        <article className="bg-gray-300 text-rgb(53, 53, 53)  flex justify-center items-center grow">
          {" "}
          <Outlet />
        </article>
        <div className="bg-black h-px"></div>
        <footer className="bg-gray-100 flex justify-center ">
          <Pie />
        </footer>
      </div>
    </main>
  );
};

export { Layout };
