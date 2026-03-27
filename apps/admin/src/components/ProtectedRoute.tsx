import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import type { RootState } from "../store";
import { AuthStatus } from "../store/auth/authSlice";

export function ProtectedRoute() {
  const { status } = useSelector((state: RootState) => state.auth);

  if (status === AuthStatus.Idle || status === AuthStatus.Loading) return null;
  if (status === AuthStatus.Unauthenticated)
    return <Navigate to="/auth" replace />;

  return <Outlet />;
}
