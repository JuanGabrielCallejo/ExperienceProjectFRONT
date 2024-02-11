import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

const Layout = () => {
  return (
    <main className="grid xl:grid-cols-[320px_1fr] lg:grid-cols-[200px_1fr] sm:grid-cols-[150px_1fr] mobile:md:grid-cols-[1fr] sm:grid-rows-[1fr_1px_10px] mobile:grid-rows-[120px_1fr_10px] bg-[url('/img/fondoWeb.svg')] bg-fixed bg-cover ">
      <header className="mobile:z-10">
        {" "}
        <Header />
      </header>

      <div className="flex flex-col w-full">
        <article className=" text-rgb(53, 53, 53)  flex justify-center items-center grow">
          {" "}
          <Outlet />
        </article>
      </div>
      <div className="sm:col-span-2 mobile:col-span-1 bg-black h-px"></div>
      <footer className=" sm:col-span-2 mobile:col-span-1 bg-white flex justify-center">
        <Footer />
      </footer>
    </main>
  );
};

export { Layout };
