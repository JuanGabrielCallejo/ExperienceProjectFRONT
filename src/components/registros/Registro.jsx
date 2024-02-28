
const Registro = ({ registro }) => {
  const momento = registro.momento;
  const momentoFormateado = new Date(momento).toLocaleString("es-ES", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Europe/Madrid",
  });

  return (
    <div className="bg-slate-50 p-6 flex">
      <div className="bg-slate-50 p-6 flex flex-col">
        <address className="mb-6">
          <div className="w-full mr-3 text-sm text-gray-900">
            <div>
              <p className="text-base text-gray-400 S700">
                {registro.lugar_nombre}
              </p>
              <p className="text-base text-gray-500 dark:text-gray-400">
                <time>{momentoFormateado}</time>
              </p>
            </div>
          </div>
        </address>

        <div className="max-w-full overflow-x-auto">
          <table className="min-w-full table-auto bg-gray-100">
            <tbody>
              <tr className="bg-gray-200">
                <td className="border px-4 py-2">Altura Ola:</td>
                <td className="border px-4 py-2">Periodo Ola:</td>
                <td className="border px-4 py-2">Dirección Ola:</td>
                <td className="border px-4 py-2">Punto Marea:</td>
                <td className="border px-4 py-2">Subiendo Marea:</td>
                <td className="border px-4 py-2">Temperatura Agua:</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">{registro.altura_ola}</td>
                <td className="border px-4 py-2">{registro.periodo_ola}</td>
                <td className="border px-4 py-2">{registro.direccion_ola}</td>
                <td className="border px-4 py-2">{registro.punto_marea}</td>
                <td className="border px-4 py-2">{registro.subiendo_marea}</td>
                <td className="border px-4 py-2">{registro.temperatura_agua}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="min-w-full table-auto bg-gray-100">
            <tbody>
              <tr className="bg-gray-200">

                <td className="border px-4 py-2">Velocidad Viento:</td>
                <td className="border px-4 py-2">Dirección Viento:</td>
                <td></td>
                <td className="border px-4 py-2">Temperatura Ambiente:</td>
                <td className="border px-4 py-2">Lluvia:</td>
                <td className="border px-4 py-2">Nubes:</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">{registro.velocidad_viento}</td>
                <td className="border px-4 py-2">{registro.direccion_viento}</td>
                <td></td>
                <td className="border px-4 py-2">{registro.temperatura_ambiente}</td>
                <td className="border px-4 py-2">{registro.lluvia}</td>
                <td className="border px-4 py-2">{registro.nubes}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="min-w-full table-auto bg-gray-100">
            <tbody>
              <tr className="bg-gray-200">


                <td className="border px-4 py-2">Gente:</td>
                <td className="border px-4 py-2">Número Olas:</td>
                <td className="border px-4 py-2">Qué tal Olas:</td>
                <td className="border px-4 py-2">Qué tal Yo:</td>
                <td className="border px-4 py-2">Texto:</td>
                <td></td>
                <td className="border px-4 py-2">Foto Sesión:</td>
                <td className="border px-4 py-2">Fotos:</td>
                <td className="border px-4 py-2">Fotos Sesión:</td>

              </tr>
              <tr>
                <td className="border px-4 py-2">{registro.gente}</td>
                <td className="border px-4 py-2">{registro.numero_olas}</td>
                <td className="border px-4 py-2">{registro.que_tal_olas}</td>
                <td className="border px-4 py-2">{registro.que_tal_yo}</td>
                <td className="border px-4 py-2">{registro.texto}</td>
                <td></td>
                <td className="border px-4 py-2">{registro.foto_sesion}</td>
                <td className="border px-4 py-2">{registro.fotos}</td>
                <td className="border px-4 py-2">{registro.fotos_sesion}</td>
              </tr>
            </tbody>
          </table>
        </div>




      </div>
      <img className="mr-4 object-cover w-full h-full"
        src={`${import.meta.env.VITE_REACT_HOST}/${registro.fotos}`} alt={`${import.meta.env.VITE_REACT_HOST}/${registro.fotos}`} />
    </div>
  );
};

// Experience.propTypes = {
//   exp: PropTypes.any,
// };

export default Registro;
