import React, { useContext } from "react";
import { ContextoPersonal } from "../../Contexts/ContextoPersonal";
import packageJson from '../../../package.json';

export const Pie = () => {
  const { admin_estado } = useContext(ContextoPersonal);
  const [admin, setAdmin] = admin_estado;
  // console.log(admin);
  const version = packageJson.version;

  return (
    <div className="p-4">
      <button onClick={() => setAdmin(!admin)}>
        {version}
      </button>
      {admin && (
        <>{' - ADMIN - '}</>
      )}

      {admin && (
        <React.Fragment className="flex flex-col">
          <div>{`API en: ${import.meta.env.VITE_REACT_HOST}`}</div>
          <div>{`Adjuntos en: ${import.meta.env.VITE_DIRECCION}${import.meta.env.VITE_CARPETA_ARCHIVOS}`}</div>
        </React.Fragment>
      )}
    </div>
  );
};
