import Registro from "./Registro";


const RegistrosLista = ({ registros, setActualizar, pruebas }) => {


  // console.log(registros);
  // console.log(pruebas);
  return registros.slice().reverse().map((registro) => {
    return (
      <li key={registro.id} className="pb-5">
        <Registro registro={registro} setActualizar={setActualizar} pruebas={pruebas} />
      </li>
    );
  });
};
export default RegistrosLista;
