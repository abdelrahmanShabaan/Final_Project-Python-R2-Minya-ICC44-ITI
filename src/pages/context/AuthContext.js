// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roleContext, setRole] = useState("customer");

  const loginContext = () => setIsLoggedIn(true);
  const logoutContext = () => setIsLoggedIn(false);

  const setRoleCustomer = () => setRole("customer");
  const setRoleSeller = () => setRole("seller");

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loginContext,
        logoutContext,
        roleContext,
        setRoleCustomer,
        setRoleSeller,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
