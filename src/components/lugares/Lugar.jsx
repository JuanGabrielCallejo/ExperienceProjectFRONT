const Lugar = ({ lugar }) => {
  // console.log(lugar)
  // const nombre = lugar.nombre;
  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 antialiased">
        <div className="flex justify-center items-center">
          <div className="shadow-2xl w-3/4">
            <article className="mx-auto w-full h-full bg-white p-6 lg:p-8 rounded-2xl ">
              <header className="mb-8">
                <address className="flex items-center mb-6">
                  <div className="inline-flex w-full items-center mr-3 text-sm text-gray-900 ">
                    <div>
                      Nombre: {lugar.nombre}

                    </div>
                    <div>
                      Coordenadas: {lugar.coordenadas}

                    </div>

                  </div>
                </address>

              </header>

            </article>
          </div>
        </div>

      </main>

    </>
  );
};

export default Lugar;
