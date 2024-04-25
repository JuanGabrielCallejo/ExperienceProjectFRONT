import { useContext, useEffect, useState } from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { ContextoPersonal } from '../../Contexts/ContextoPersonal';
// import { Navigate } from 'react-router-dom';
// import { NavLink, useNavigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { getFromS3 } from "../../Utils/gestorS3";


const VideoPreview = ({ videoUrl, altura }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleVideoClick = () => {
    // Open the video in a new window when clicked
    window.open(videoUrl, '_blank');
  };

  const handleVideoError = () => {
    // Handle video loading errors
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoadStart = () => {
    // Video loading has started
    setIsLoading(true);
  };

  const handleLoadedData = () => {
    // Video has loaded data and is ready to play
    setIsLoading(false);
  };

  return (
    <div>
      <video
        controls
        onClick={handleVideoClick}
        onMouseEnter={() => setIsPlaying(true)}
        onMouseLeave={() => setIsPlaying(false)}
        onError={handleVideoError}
        onLoadStart={handleLoadStart}
        onLoadedData={handleLoadedData}
        style={{ height: `${altura}` }}            >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {hasError && <p>Error loading the video</p>}
      {/* {isPlaying && !hasError && <p>Click to open the video</p>} */}
      {isLoading && <p>Cargando vídeo...</p>}
    </div>
  );
};

const Registro = ({ registro, setActualizar, pruebas }) => {
  const { admin_estado } = useContext(ContextoPersonal);
  const [admin, setAdmin] = admin_estado;
  const navigate = useNavigate();
  // console.log(registro);
  // const handlers = useSwipeable({
  //   onSwiped: (eventData) => console.log("User Swiped!", eventData),
  // });

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

  const [adjuntosData, setAdjuntosData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (registro.adjuntos && registro.adjuntos.length !== 0) {
        const adjuntosPromises = registro.adjuntos.map(async (adjunto) => {
          try {
            console.log(adjunto)
            const url_persigned_archivo = await getFromS3(adjunto.ruta);
            return { adjunto, url_persigned_archivo };
          } catch (error) {
            console.error("Error fetching attachment:", error);
            return { adjunto, url_persigned_archivo: null };
          }
        });

        const adjuntosData = await Promise.all(adjuntosPromises);
        setAdjuntosData(adjuntosData);
      }
    };

    fetchData();
  }, [registro.adjuntos]);

  async function peticionServidor(id) {
    // console.log(JSON.stringify(usuario));
    // const navigate = useNavigate();

    let datos;
    try {
      const urlPeticion = `${import.meta.env.VITE_REACT_HOST}/registro/` + id + `?pruebas=` + pruebas;
      const respuesta = await fetch(urlPeticion, {
        method: "DELETE"
        // headers: {
        //   Authorization: `Bearer ${user.token}`,
        // },
      });
      datos = await respuesta.json();
      // console.log(datos);
      if (!respuesta.ok) {
        // console.log(datos.message);
        console.log("Error en la petición");
        return datos;
        // throw Error("Error en la petición");
      }
      let urlRedireccion = "/registros";
      pruebas ? urlRedireccion = urlRedireccion + "/pruebas" : "";
      setActualizar(new Date());
      navigate(urlRedireccion);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  }

  const eliminarRegistro = async (id, lugar_nombre, momento) => {
    const result = await Swal.fire({
      title: 'Confirmación de borrado de ' + `${lugar_nombre} - ${momento}`,
      text: '¿Confirmas que quieres borrar definitivamente este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo',
    });
    if (result.isConfirmed) {
      peticionServidor(id);
    }
  }

  return (
    <div className="bg-slate-50 p-2 flex flex-col">

      <address>
        <div className="m-1 bg-teal-100 font-semibold text-sm text-black flex justify-around rounded-xl">
          <p className="p-1">
            {admin && <>{registro.id} - </>}
            {registro.lugar_nombre}
          </p>
          <p className="p-1">
            {momentoFormateado.split(',')[0]}
          </p>
          <p className="p-1">
            {momentoFormateado.split(',')[1].split(':')[0] + ':' + momentoFormateado.split(',')[1].split(':')[1]}
          </p>
        </div>
        <div className="flex flex-wrap">

          {adjuntosData.map(({ adjunto, url_persigned_archivo }) => {
            console.log("Archivo: ");
            console.log(url_persigned_archivo);
            console.log(adjunto.tipo);

            return (
              adjunto.tipo === "foto" ? (
                <div key={adjunto.id} className="m-1 p-1">
                  <Zoom>
                    <img
                      className="w-72 h-52 object-cover rounded-2xl"
                      src={url_persigned_archivo}
                      alt={adjunto.ruta}
                    />
                  </Zoom>
                </div>
              ) : (
                adjunto.tipo === "video" && (
                  <div key={adjunto.id} className="w-72 h-52 object-cover rounded-2xl">
                    <VideoPreview videoUrl={url_persigned_archivo} alt={adjunto.ruta} altura="200px" />                </div>
                )
              )
            );

          })}
        </div>
      </address >
      {registro.texto &&
        <p className="border pr-2 py-2 text-s text-justify">
          {registro.texto}
        </p>}
      {(registro.numero_olas !== null || registro.gente !== null || registro.que_tal_olas !== null || registro.que_tal_yo !== null) &&
        <div className="flex justify-evenly overflow-x-auto">
          <table className="min-w-32 table-auto bg-gray-100 text-xs text-center">
            <tbody>
              <tr className="bg-gray-200">
                <td className="border px-4 py-2" colSpan="2">.: La playa :.</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="border px-4 py-2">Las olas</td>
                <td className="border px-4 py-2">Gente</td>
              </tr>
              <tr className='text-lg'>
                <td className="border px-4 py-2">{registro.que_tal_olas !== null ? registro.que_tal_olas + '/5' : '-'}</td>
                <td className="border px-4 py-2 content-center">{registro.gente !== null ? registro.gente + '/5' : '-'}</td>
              </tr>
            </tbody>
          </table>
          <table className="min-w-32 table-auto bg-gray-100 text-xs text-center">
            <tbody>
              <tr className="bg-gray-200">
                <td className="border px-4 py-2" colSpan="2">.: Mi surf :.</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="border px-4 py-2">#Olas</td>
                <td className="border px-4 py-2">Mi surf</td>
              </tr>
              <tr className='text-lg'>
                <td className="border px-4 py-2">{registro.numero_olas !== null ? registro.numero_olas : '-'}</td>
                <td className="border px-4 py-2">{registro.que_tal_yo !== null ? registro.que_tal_yo + '/5' : '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>}
      {(registro.altura_ola || registro.periodo_ola || registro.direccion_ola || registro.punto_marea || registro.subiendo_marea || registro.temperatura_agua) &&
        <div className="max-w-full overflow-x-auto mb-1">
          <table className="min-w-full table-auto bg-gray-100 text-xs">
            <tbody>
              <tr className="bg-gray-200">
                <td className="border px-2 py-1">Altura Ola:</td>
                <td className="border px-2 py-1">Periodo Ola:</td>
                <td className="border px-2 py-1">Dirección Ola:</td>
                <td className="border px-2 py-1">Punto Marea:</td>
                <td className="border px-2 py-1">Subiendo Marea:</td>
                <td className="border px-2 py-1">Temperatura Agua:</td>
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
        </div>}
      {(registro.velocidad_viento || registro.direccion_viento || registro.temperatura_ambiente || registro.lluvia || registro.nubes) &&

        <div className="max-w-full overflow-x-auto">
          <table className="min-w-full table-auto bg-gray-100 text-xs">
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
      }


      {
        admin &&
        (<div
          className="rounded-full bg-red-500 text-white p-2 text-sm hover:cursor-pointer"
          onClick={(evento) => {
            evento.preventDefault();
            eliminarRegistro(registro.registro_id, registro.lugar_nombre, registro.momento);
          }}
        >
          Eliminar
        </div>)
      }

    </div >
  );
};

export default Registro;
