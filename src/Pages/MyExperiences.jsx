import { useContext, useEffect, useState } from "react";
import OwnExpList from "../components/experiences/OwnExpList";
import { AuthContext } from "../components/providers/AuthProvider";
import loadIcon from "/img/bouncing-circles.svg";

const MyExperiences = () => {
  const [user] = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [height, setHeight] = useState(
    "xl:h-screen lg:h-screen md:h-full sm:h-full"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${import.meta.env.VITE_REACT_HOST}/user/${user.id}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const responseData = await res.json();
        setData(JSON.parse(responseData.data.experiences));
        // console.log(responseData.data.experiences);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (data) {
      const expList = document.getElementById("OwnExpList");
      if (expList.clientHeight > window.innerHeight) {
        setHeight("xl:h-screen lg:h-full md:h-full sm:h-full");
      }
    }
  }, [data]);

  return (
    <div className={`flex flex-col self-start m-12 ${height}`}>
      <h1 className="text-4xl mt-10 mb-2">Mis Experiencias</h1>
      <div className="bg-black h-1 mb-8"></div>
      <ul
        id="OwnExpList"
        className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_1fr] gap-4"
      >
        {data ? (
          <OwnExpList experience={data} />
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <img className="h-32 w-32" src={loadIcon} alt="Loading Icon"></img>
          </div>
        )}
      </ul>
    </div>
  );
};

export default MyExperiences;
