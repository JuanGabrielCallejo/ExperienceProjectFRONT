import { useContext, useEffect, useState } from "react";
import OwnExpList from "../components/experiences/OwnExpList";
import { AuthContext } from "../components/providers/AuthProvider";
import loadIcon from "/img/bouncing-circles.svg";
import { useParams } from "react-router-dom";
import { ReloadContext } from "../components/providers/ReloadProvider";

const SearchUser = () => {
  const [user] = useContext(AuthContext);
  const { valoresCamposActuales } = useContext(ReloadContext);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${import.meta.env.VITE_REACT_HOST}/user/${id}`;
        const res = await fetch(url, {
          method: "GET",
        });

        const responseData = await res.json();
        setData(JSON.parse(responseData.data.experiences));
        setUserData(responseData.data);
        // console.log(responseData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, user]);
  const userOf = user?.id == id;
  console.log(userOf);
  const date = userData ? userData.createdAt : "";
  const formatedDate = new Date(date).toLocaleString("es-ES", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Europe/Madrid",
  });
  //   console.log(userData);
  return (
    <div className="flex flex-col self-start m-12 h-screen">
      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl mt-10 mb-2">
            Perfil de {userData ? `${userData.name} ${userData.lastName}` : ""}
          </h1>
          <p>Cuenta creada el {userData ? `${formatedDate}` : ""}</p>
        </div>

        {userOf ? (
          <img
            className="w-64 h-64 rounded-full object-cover"
            src={
              valoresCamposActuales
                ? valoresCamposActuales.data.photo
                : userData && userData.photo
            }
            alt=""
          />
        ) : (
          <img
            className="w-64 h-64 rounded-full object-cover"
            src={userData && userData.photo}
            alt=""
          />
        )}
      </div>

      <div className="bg-black h-1 mb-8 mt-8"></div>
      <ul className="grid  grid-cols-1 grid-cols-[1fr_1fr_1fr] gap-4">
        {data ? (
          <OwnExpList experience={data} />
        ) : (
          <img className="h-32 w-32" src={loadIcon} alt="Loading icon" />
        )}
      </ul>
    </div>
  );
};

export default SearchUser;
