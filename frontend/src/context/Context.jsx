import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  return <AuthContext.Provider value={{}}>{!loading && children}</AuthContext.Provider>;
};
