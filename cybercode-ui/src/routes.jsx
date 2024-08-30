import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProblemPage from "./pages/ProblemPage";
import UserProfile from "./pages/UserProfile";
import UserUpdate from "./pages/UserUpdate";
import AdminDashboard from "./pages/AdminDashboard";
import UserRegisterPage from "./pages/UserRegisterPage";
import CreateAdminPage from "./pages/CreateAdminPage";
import AdminProfilePage from "./pages/AdminProfilePage";
import UsersPage from "./pages/UsersPage";
import ProblemSolvePage from "./pages/ProblemSolvePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> }, // Todo: Make a home page
      { path: "/signup", element: <UserRegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/problems", element: <ProblemPage /> },
      { path: "/problems/:problemId", element: <ProblemSolvePage /> },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      { path: "profile/:userId", element: <UserProfile /> },
      { path: "update-profile", element: <UserUpdate /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "users", element: <UsersPage /> },
      { path: "profile", element: <AdminProfilePage /> },
      { path: "create-admin", element: <CreateAdminPage /> },
    ],
  },
]);
