const getRegistros = async () => {
  try {
    // const response_object = new Headers();
    // response_object.append("Access-Control-Allow-Origin", "*");
    // response_object.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // const result = await fetch(
    //   `${import.meta.env.VITE_REACT_HOST}/registros`,
    //   {
    //     method: 'GET',  // You can adjust the method accordingly (GET, POST, etc.)
    //     headers: response_object,
    //   }
    // );

    const result = await fetch(
      `${import.meta.env.VITE_REACT_HOST}/registros/lista`
    );
    // Now you can use the 'result' as needed

    if (!result.ok) {
      throw new Error(`Error: ${result.status} - ${result.statusText}`);
    }
    const res = await result.json();
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getRegistros;
