import { useEffect, useState } from "react";
import loadIcon from "/img/bouncing-circles.svg";
import getSingleExperience from "../services/getSingleExperiencie";
import { useParams } from "react-router-dom";
import OwnExperience from "../components/experiences/OwnExperience";

const SingleExperience = () => {
  const [exp, setExp] = useState([]);
  const [loading, setLoading] = useState(true);
  const { exp_id } = useParams();

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const data = await getSingleExperience(exp_id);
        setExp(data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    loadExperiences();
  }, [exp_id]);
  // console.log(exp);
  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <img className="h-32 w-32" src={loadIcon} alt="Loading Icon"></img>
        </div>
      ) : (
        <ul>
          <OwnExperience exp={exp} />
        </ul>
      )}
    </div>
  );
};

export default SingleExperience;
