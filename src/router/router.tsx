import { createBrowserRouter } from "react-router-dom";
import { CustomersList } from "../pages/CustomersList/CustomersList";
import { MainPage } from "../pages/MainPage";
import { StatusBoxList } from "../pages/StatusBoxList/StatusBoxList";
import { EditCustomer } from "../pages/EditCustomer/EditCustomer";
import { PayList } from "../pages/PayList/PayList";
import { OrdersList } from "../pages/OrdersList/OrdersList";
import { EditOrder } from "../pages/EditOrder/EditOrder";
import { Help } from "../pages/Help/help";
import { Settings } from "../pages/Settings/Settings";

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
      //динамический роут чтобы взять потом id из url и передать его в функцию updateCustomer
        path: "/editCustomer/:id",
        element: <EditCustomer />,
      },
      {
        path: "/ordersList",
        element: <OrdersList />,
      },
      {
        path: "/editOrder/:id",
        element: <EditOrder />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/help",
        element: <Help />,
      },
    ],
  },
]);
// ошибка! расширение router.tsx должно быть tsx а не ts 
