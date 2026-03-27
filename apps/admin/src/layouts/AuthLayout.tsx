import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <main className="h-screen bg-surface-primary flex items-center justify-center">
      <div className="container">
        <Outlet />
      </div>
    </main>
  );
}
