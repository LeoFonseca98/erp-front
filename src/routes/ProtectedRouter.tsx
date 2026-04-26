import { Navigate } from "react-router-dom";


function ProtectedRouter({ children }: any) {
  const token = localStorage.getItem("token");

  console.log("ProtectedRoute rodando, token:", token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRouter;