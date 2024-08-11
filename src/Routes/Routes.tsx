import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Main from "../Layout/Main";

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Main />,
    children: [
      {
        path: "admin-dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
