import useExperiences from "../components/experiences/useExperiences";
import ExpList from "../components/experiences/ExpList";

const HomePage = () => {
  const { exp } = useExperiences();
  return (
    <>
      <h1>Página Home</h1>
      <ul>
        <ExpList experience={exp} />
      </ul>
    </>
  );
};

export default HomePage;
