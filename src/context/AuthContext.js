import React, { useState, useEffect, useContext } from "react";

const AuthContext = React.createContext();

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);

  const loggedIn = (userData) => {
    setAuthUser(userData);
  };

  const logout = () => {
    setAuthUser(null);
  };

  const value = {
    authUser,
    setAuthUser,
    isLoggedin,
    setIsLoggedIn,
    loggedIn,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
