import { useContext, useDebugValue } from "react";
import { AuthContext } from "../../context/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  // useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
  return context;
}