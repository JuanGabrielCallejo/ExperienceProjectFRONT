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
    <div className="flex flex-col self-start m-12">
      <h1 className="text-4xl mt-10 mb-2">Mis Experiencias</h1>
      <div className="bg-black h-1 mb-8"></div>
      <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data ? (
          <OwnExpList experience={data} />
        ) : (
          <img className="h-32 w-32" src={loadIcon} alt="Loading icon" />
        )}
      </ul>
    </div>
  );
};

export default MyExperiences;
