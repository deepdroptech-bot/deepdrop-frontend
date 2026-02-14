import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login/ekiosa" />;

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children ? <Outlet /> : <Navigate to="/login/ekiosa" />;
}
