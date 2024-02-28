import Lugar from "./Lugar";

const LugaresLista = ({ lugares }) => {

  return lugares.map((lugar) => {
    return (
      <li key={lugar.id}>
        <Lugar lugar={lugar} />
      </li>
    );
  });
};

// ExpList.propTypes = {
//   experience: PropTypes.any,
// };
export default LugaresLista;
