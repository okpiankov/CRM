import { NavLink } from "react-router-dom";
import "./LeftMenu.scss";
import {
  LogOut,
  // LayoutGrid,
  // MessageCircleMore,
  BriefcaseBusiness,
  BadgeDollarSign,
  ListOrdered,
  Users,
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
        <NavLink to="/settings">
        <li>
          <Settings />
          Настройки
        </li>
        </NavLink>
        <NavLink to="/help">
        <li>
          <BadgeHelp />
          Помощь
        </li>
        </NavLink>
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
