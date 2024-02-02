import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

const Layout = () => {
  return (
    <main className="grid grid-cols-[300px_2px_1fr] h-screen">
      <header className="bg-gray-300 flex ">
        {" "}
        <Header />
      </header>
      <div className="bg-black"></div>
      <div>
        <article className="bg-azure text-rgb(53, 53, 53) m-4 flex justify-center">
          {" "}
          <Outlet />
        </article>
        <footer className="bg-violet-300 flex justify-center">
          {" "}
          <Footer />
        </footer>
      </div>
    </main>
  );
};

export { Layout };
