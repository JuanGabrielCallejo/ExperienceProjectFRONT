import { createContext, useState } from "react";
import PropTypes from "prop-types";

const ReloadContext = createContext();

const ReloadProvider = ({ children }) => {
  const [reload, setReload] = useState(false);
  const [valoresCamposActuales, setValoresCamposActuales] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const toggleReload = () => {
    setReload((prevReload) => !prevReload);
  };

  return (
    <ReloadContext.Provider
      value={{
        reload,
        toggleReload,
        valoresCamposActuales,
        setValoresCamposActuales,
        currentUserData,
        setCurrentUserData,
      }}
    >
      {children}
    </ReloadContext.Provider>
  );
};

ReloadProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ReloadContext, ReloadProvider };
