import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminChangePassword from "../pages/admin/AdminChangePassword";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, mustChangePassword } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-edge border-t-emerald-700" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (mustChangePassword) {
    return <AdminChangePassword forced />;
  }

  return children;
}
