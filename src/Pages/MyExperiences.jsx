import { useContext, useEffect, useState } from "react";
import OwnExpList from "../components/experiences/OwnExpList";
import { AuthContext } from "../components/providers/AuthProvider";
import loadIcon from "/img/bouncing-circles.svg";

const MyExperiences = () => {
  const [user] = useContext(AuthContext);
  const [data, setData] = useState(null);

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

  return (
    <div className="flex flex-col self-start m-12 h-screen">
      <h1 className="text-4xl mt-10 mb-2">Mis Experiencias</h1>
      <div className="bg-black h-1 mb-8"></div>
      <ul className="grid grid-cols-1 grid-cols-[1fr_1fr_1fr] gap-4">
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
