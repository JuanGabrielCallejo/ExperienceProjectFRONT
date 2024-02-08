import { useEffect, useState } from "react";

import getSingleExperience from "../services/getSingleExperiencie";
import { useParams } from "react-router-dom";
import OwnExperience from "../components/experiences/OwnExperience";

const SingleExperience = () => {
  const [exp, setExp] = useState([]);
  const { exp_id } = useParams();

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const data = await getSingleExperience(exp_id);
        setExp(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    loadExperiences();
  }, [exp_id]);
  // console.log(exp);
  return (
    <ul>
      <OwnExperience exp={exp} />
    </ul>
  );
};

export default SingleExperience;
