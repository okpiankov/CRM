import { NavLink } from "react-router-dom";
import "./CustomersList.scss";
import { Pencil} from "lucide-react";

export const CustomersList = () => {
  return (
    <div className="customersList">
      <span>Наши клиенты</span>
      <div className="header">
        <div>Наименование</div>
        <div>Контакты</div>
        <div>Откуда пришел</div>
      </div>
      <ul>
        <li>ООО Фортуна</li>
        <li className="contacts">
          <div>Морозова Ирина Анатольевна</div>
          <div>88000000000</div>
          <div>client@ya.ru</div>
          </li>
        <li>yandex direct</li>
        <NavLink to="/editCustomerCard"><Pencil className="pencil"/></NavLink>
      </ul>
      <ul>
        <li>ООО Фортуна</li>
        <li className="contacts">
          <div>Морозова Ирина Анатольевна</div>
          <div>88000000000</div>
          <div>client@ya.ru</div>
          </li>
        <li>yandex direct</li>
        <NavLink to="/editCustomerCard"><Pencil className="pencil"/></NavLink>
      </ul>
    </div>
  );
};
