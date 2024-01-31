import { Menu } from "./Menu";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

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
        <Footer />
      </footer>
    </main>
  );
};

export { Layout };
