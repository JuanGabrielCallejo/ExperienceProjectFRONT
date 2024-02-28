
import loadIcon from "/img/bouncing-circles.svg";
import LugaresLista from "../components/lugares/LugaresLista";
import useLugares from "../hooks/useLugares";

const Lugares = () => {

  const { lugares } = useLugares();

  return (
    <div className="h-full w-full flex flex-col items-center bg-fixed bg-cover">
      {!lugares ? (
        <div className="flex flex-col items-center justify-center">
          <img className="h-32 w-32" src={loadIcon} alt="Loading Icon"></img>
        </div>
      ) : (
        <>
          <p>Lugares</p>
          <div className="flex flex-col justify-center h-full">
            {lugares.length === 0 ? (
              <div className="flex flex-col p-6 rounded-xl items-center gap-4 bg-white w-fit">
                <p>No hay lugares.</p>
              </div>
            ) : (
              <ul>
                <LugaresLista lugares={lugares} />
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Lugares;
