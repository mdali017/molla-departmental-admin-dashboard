import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Main from "../Layout/Main";
import Category from "../pages/Category/Category";
import AllProducts from "../pages/Products/AllProducts";
import AddNewProduct from "../pages/Products/AddNewProduct";
import AllOrders from "../pages/Orders/AllOrders";
import CompletedOrders from "../pages/Orders/CompletedOrders";
import CanceledOrders from "../pages/Orders/CanceledOrders";
import ProcessingOrder from "../pages/Orders/ProcessingOrder";
// import AllOrders from "../pages/Orders/AllOrders";

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
      {
        path: "/all-orders",
        element: <AllOrders />,
      },
      {
        path: "/completed-orders",
        element: <CompletedOrders />,
      },
      {
        path: "/processing-order",
        element: <ProcessingOrder />,
      },
      {
        path: "/canceled-orders",
        element: <CanceledOrders />,
      },
    ],
  },
]);
