
const PaginaPrincipal = () => {

  return (
    <>
      <img src="/img/logo_cuaderno_olasol.png" className="w-40 h-40" />

      <p className="m-4">
        SurfLog, registros para surfeir@s</p>
      <p className="m-4">
        Registra el estado de una playa, con la previsión del mar y del tiempo atmosférico para ese momento y añade tus fotos y comentarios.
      </p>
      <p className="m-4">
        Los datos provienen de fuentes de datos (apis) libres o públicas: Open Meteo, Open Marine, Meteogalicia, AEMET.

        Si te metes al agua a surfear, registra todos los datos de la sesión (olas, tiempo, fotos,...).
      </p>
      <p className="m-4">
        En esta versión en pruebas, los registros que hagas aparecerán en la lista de pruebas, en la P.
      </p>
    </>

  );
};

export default PaginaPrincipal;
