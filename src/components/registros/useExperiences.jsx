import { useEffect, useState } from "react";
import getAllExperiences from "../../services/getAllExperiences";

const useExperiences = () => {
  const [exp, setExp] = useState([]);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const data = await getAllExperiences();
        setExp(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    loadExperiences();
  }, []);

  return { exp };
};

export default useExperiences;
