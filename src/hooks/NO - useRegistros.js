// import { useEffect, useState } from "react";
// import getRegistros from "../services/getRegistos";

// const useRegistros = (pruebas) => {
//   const [registros, setRegistros] = useState([]);
//   console.log("pruebas use: " + pruebas);

//   useEffect(() => {
//     const recogerRegistros = async () => {
//       try {
//         const data = await getRegistros(pruebas);
//         setRegistros(data);
//       } catch (error) {
//         console.error(error.message);
//       }
//     };
//     recogerRegistros();
//   }, [pruebas]);

//   return { registros };
// };

// export default useRegistros;
