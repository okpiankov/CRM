import { createBrowserRouter } from "react-router-dom";
import { CustomersList } from "../pages/CustomersList/CustomersList";
import { MainPage } from "../pages/MainPage";
import { StatusBoxList } from "../pages/StatusBoxList/StatusBoxList";
import { EditCustomerCard } from "../pages/EditCustomerCard/EditCustomerCard";
import { PayList } from "../pages/PayList/PayList";
import { OrdersList } from "../pages/OrdersList/OrdersList";
import { EditOrder } from "../pages/EditOrder/EditOrder";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
        //Все роуты приходящие в  <Outlet /> в <MainPage />:
      {
        path: "/",
        element: <StatusBoxList />,
      },
      {
        path: "/payList",
        element: <PayList />,
      },
      {
        path: "/customersList",
        element: <CustomersList />,
      },
      {
        path: "/ordersList",
        element: <OrdersList />,
      },
      {
        path: "/editCustomerCard",
        element: <EditCustomerCard />,
      },
      {
        path: "/editOrder",
        element: <EditOrder />,
      },
    ],
  },
]);
// ошибка! расширение router.tsx должно быть tsx а не ts 
