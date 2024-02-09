import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

const Layout = () => {
  return (
    <main className="grid grid-cols-[320px_1fr] grid-rows-[1fr_1px_10px] bg-[url('/img/fondoWeb.svg')] bg-fixed bg-cover ">
      <header className="">
        {" "}
        <Header />
      </header>

      <div className="flex flex-col">
        <article className=" text-rgb(53, 53, 53)  flex justify-center items-center grow">
        <article className=" text-rgb(53, 53, 53)  flex justify-center items-center grow">
          {" "}
          <Outlet />
        </article>
      </div>
      <div className="col-span-2 bg-black h-px"></div>
      <footer className=" col-span-2 bg-white flex justify-center">
        <Footer />
      </footer>
    </main>
  );
};

export { Layout };
