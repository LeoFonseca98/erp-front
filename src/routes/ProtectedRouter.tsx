import { Navigate } from "react-router-dom";


function ProtectedRouter({ children }: any) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRouter;