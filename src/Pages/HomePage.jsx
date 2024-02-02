import useExperiences from "../components/experiences/useExperiences";
import ExpList from "../components/experiences/ExpList";

const HomePage = () => {
  const { exp } = useExperiences();
  return (
    <>
      <ul>
        <ExpList experience={exp} />
      </ul>
    </>
  );
};

export default HomePage;
