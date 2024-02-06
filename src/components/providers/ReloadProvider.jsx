import { createContext, useState } from "react";

const ReloadContext = createContext();

const ReloadProvider = ({ children }) => {
  const [reload, setReload] = useState(false);

  const toggleReload = () => {
    setReload((prevReload) => !prevReload);
  };

  return (
    <ReloadContext.Provider value={{ reload, toggleReload }}>
      {children}
    </ReloadContext.Provider>
  );
};

export { ReloadContext, ReloadProvider };
