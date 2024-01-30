import { Menu } from "./Menu";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main>
      <header>
        <Header />
      </header>
      <nav>
        <Menu />
      </nav>
      <article>
        <Outlet />
      </article>
      <footer>
        Pié
      </footer>
    </main>
  );
};

export { Layout };
