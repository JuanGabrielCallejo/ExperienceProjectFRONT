import { Menu } from "../Menu";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

const Layout = () => {
  return (
    <main className="bg-blue grid grid-rows-[90px_50px_3fr_50px] h-screen">
      <header className="bg-blue-300 flex justify-center">
        {" "}
        <Header />
      </header>
      <nav className="bg-rgb(188, 196, 250) flex justify-center">
        {" "}
        <Menu />
      </nav>
      <article className="bg-azure text-rgb(53, 53, 53) m-4 flex justify-center">
        {" "}
        <Outlet />
      </article>
      <footer className="bg-violet-300 flex justify-center">
        {" "}
        <Footer />
      </footer>
    </main>
  );
};

export { Layout };
