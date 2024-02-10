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
    <div className=" shadow-2xl fixed bg-white rounded-2xl m-4 h-5/6 flex flex-col justify-end ">
      <button
        className="flex justify-content"
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/");
        }}
      >
        <img
          className="object-fit drop-shadow-2xl h-64"
          src="/img/prototipo1.png"
        />
      </button>
      <form
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
