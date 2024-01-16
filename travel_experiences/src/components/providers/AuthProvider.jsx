// import React from "react";
// import PropTypes from "prop-types";
// import { useLocalStorage } from "../../hooks/useLocalStorage";

// export const authContext = React.createContext();
// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useLocalStorage("token");
//   return (
//     <authContext.Provider value={[token, setToken]}>
//       {children}
//     </authContext.Provider>
//   );
// };
// AuthProvider.propTypes = {
//   children: PropTypes.object.isRequired,
// };
