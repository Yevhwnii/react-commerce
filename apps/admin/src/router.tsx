import { createBrowserRouter } from "react-router";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { AdminLayout, AuthLayout } from "./layouts";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "signup", element: <div>Sign Up</div> },
      { path: "forgot-password", element: <div>Forgot Password</div> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <div>Dashboard</div> },
          { path: "products", element: <div>Products</div> },
          { path: "products/new", element: <div>New Product</div> },
          { path: "products/:id", element: <div>Edit Product</div> },
          { path: "orders", element: <div>Orders</div> },
          { path: "orders/:id", element: <div>Order Detail</div> },
          { path: "users", element: <div>Users</div> },
        ],
      },
      { path: "*", element: <div>404 Not Found</div> },
    ],
  },
]);
