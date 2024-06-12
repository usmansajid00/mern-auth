import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const protectedRoute = ({ children }) => {
  const { user } = AuthContext();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default protectedRoute;
