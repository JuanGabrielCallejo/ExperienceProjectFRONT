import React from "react";
import PropTypes from "prop-types";
import { useLocalStorage } from "../../hooks/uselocalStorage";

const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user');
  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export {AuthContext, AuthProvider}