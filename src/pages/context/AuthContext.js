// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedInContext, setIsLoggedInContext] = useState(false);
  const [roleContext, setRoleContext] = useState("customer");

  // const loginContext = () => setIsLoggedIn(true);
  // const logoutContext = () => setIsLoggedIn(false);

  // const setRoleCustomer = () => setRole("customer");
  // const setRoleSeller = () => setRole("seller");

  return (
    <AuthContext.Provider
      value={{
        setIsLoggedInContext,
        setRoleContext,
        isLoggedInContext,
        roleContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
