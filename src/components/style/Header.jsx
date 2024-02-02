import { useNavigate } from "react-router-dom";
import { Menu } from "../Menu";
import { LoginMenu } from "../LoginMenu";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="p-2 fixed h-screen flex flex-col justify-end">
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        <img className="object-fit" src="/img/prototipo1.png" />
      </button>

      {/* <img className="object-fit m-2" src="/img/My experiences.png"></img> */}

      <Menu />
      <LoginMenu />
    </div>
  );
};
