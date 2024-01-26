import useExperiences from "../components/useExperiences";
import ExpList from "../components/ExpList";

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
