import { Outlet } from "react-router";

export function AdminLayout() {
  return (
    <div>
      <aside></aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
