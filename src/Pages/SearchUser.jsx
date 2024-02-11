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
  const [height, setHeight] = useState("h-screen");
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

  useEffect(() => {
    if (data) {
      const expList = document.getElementById("OwnExpList");
      if (expList.clientHeight > window.innerHeight) {
        setHeight("h-full");
      }
    }
  }, [data]);
  //   console.log(userData);
  return (
    <div className={`flex flex-col self-start m-12 ${height}`}>
      <div className="flex justify-between">
        <div>
          <h1 className="lg:text-4xl md:text-3xl mobile:text-2xl mt-10 mb-2">
            Perfil de {userData ? `${userData.name} ${userData.lastName}` : ""}
          </h1>
          <p>Cuenta creada el {userData ? `${formatedDate}` : ""}</p>
        </div>

        {userOf ? (
          <img
            className="lg:w-64 lg:h-64 md:w-32 md:h-32 mobile:w-24 mobile:h-24 rounded-full object-cover"
            src={
              valoresCamposActuales
                ? valoresCamposActuales.data.photo
                : userData && userData.photo
            }
            alt=""
          />
        ) : (
          <img
            className="lg:w-64 lg:h-64 md:w-32 md:h-32 mobile:w-24 mobile:h-24 rounded-full object-cover"
            src={userData && userData.photo}
            alt=""
          />
        )}
      </div>

      <div className="bg-black h-1 mb-8 mt-8"></div>
      <ul
        id="OwnExpList"
        className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_1fr] gap-4"
      >
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
