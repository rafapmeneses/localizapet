import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks";

export const Guest = ({ children, allowedRoles  }) => {
  const { auth } = useAuth();

  if (auth?.token) {
    return <Navigate to="/"/>;
  } 
  else {
    return <>{children}</>;
  }
};
