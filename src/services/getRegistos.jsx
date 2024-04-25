const getRegistros = async (pruebas) => {

  try {
    let ruta = "/registros/lista";
    if (pruebas) {
      ruta = ruta + "/pruebas";
    }
    // console.log(ruta);

    const result = await fetch(
      import.meta.env.VITE_REACT_HOST + ruta
    );
    if (!result.ok) {
      throw new Error(`Error: ${result.status} - ${result.statusText}`);
    }
    const res = await result.json();
    console.log("Resultados registros: ");
    console.log(res);

    return res.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getRegistros;
