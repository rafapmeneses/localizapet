import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks";

export const Private = ({ children, allowedRoles }) => {
  //todo: ver como salvar roles no context e validar allowedRoles
  const { auth } = useAuth();

  if (auth?.token) {
    return <>{children}</>;
  } 
  else {
    return <Navigate to="/login"/>;
  }
};
