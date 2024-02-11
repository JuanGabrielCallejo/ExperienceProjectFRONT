import { useNavigate } from "react-router-dom";
import { MenuNav } from "../Menu";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import PrimarySearchAppBar from "../../services/searchBar";
import { LoginMenu } from "../users/LoginMenu";
import LoginDropDown from "../../services/LoginDropDown";
import { SearchContext } from "../providers/SearchProvider";

export const Header = () => {
  const navigate = useNavigate();
  const [user] = useContext(AuthContext);
  const [, setSearch, viewBar, , handleSubmit, , , ,] =
    useContext(SearchContext);
  // console.log(user);
  return (
    <div className=" shadow-2xl fixed bg-white rounded-2xl m-4 sm:h-5/6 mobile:h-fit flex md:flex-col sm:flex-row justify-end mobile:items-center ">
      <button
        className="flex justify-content"
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/");
        }}
      >
        <img
          className="object-fit drop-shadow-2xl xl:h-64 lg:h-48 sm:h-36 sm:block mobile:hidden "
          src="/img/prototipo1.png"
        />
        <img
          className="object-fit drop-shadow-2xl sm:hidden mobile:h-20 "
          src="/img/logoResponsiveSmall.svg"
        />
      </button>

      <form
        className="mobile:hidden md:hidden lg:hidden xl:block"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/experiences");
          handleSubmit(e);
          setSearch("");
        }}
      >
        {viewBar && <PrimarySearchAppBar />}
      </form>

      <MenuNav />
      {user ? <LoginDropDown user={user} /> : <LoginMenu />}
    </div>
  );
};
