import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Main from "../Layout/Main";
import Category from "../pages/Category/Category";
import AllProducts from "../pages/Products/AllProducts";
import AddNewProduct from "../pages/Products/AddNewProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/add-new-product",
        element: <AddNewProduct />,
      },
    ],
  },
]);
