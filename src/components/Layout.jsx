import { Menu } from "./Menu";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header className="cabecera">
        Cabecera
      </header>
      <nav className="navbar">
        <Menu />
      </nav>
      <article className="main">
        <Outlet />
      </article>
      <footer className="pie">
        Pié
      </footer>
    </div>
  );
};

export { Layout };
