import { NavLink } from "react-router-dom";
import "./LeftMenu.scss";
import {
  LogOut,
  LayoutGrid,
  BriefcaseBusiness,
  BadgeDollarSign,
  ListOrdered,
  Users,
  MessageCircleMore,
  Settings,
  BadgeHelp,
} from "lucide-react";

export const LeftMenu = () => {
  return (
    <nav>
      <LogOut className="logOut" />
      <img src="vite.svg" alt="logo" />
      <ul>
        <NavLink to="/">
          <li>
            <BriefcaseBusiness />
            {/* <LayoutGrid /> */}
            Главная
          </li>
        </NavLink>
        <NavLink to="/payList">
          <li>
            <BadgeDollarSign />
            Платежи
          </li>
        </NavLink>
        <NavLink to="/ordersList">
          <li>
            <ListOrdered />
            Заказы
          </li>
        </NavLink>
        <NavLink to="/customersList">
          <li>
            <Users />
            Клиенты
          </li>
        </NavLink>
        <li>
          <Settings />
          Настройки
        </li>
        <li>
          <BadgeHelp />
          Помощь
        </li>
        {/* <li>
          <LayoutGrid />
          Продукты
        </li>
        <li>
          <MessageCircleMore />
          Связь
        </li> */}
      </ul>
    </nav>
  );
};
