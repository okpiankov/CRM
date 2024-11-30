import { NavLink } from "react-router-dom";
import "./OrdersList.scss";
import { Pencil } from "lucide-react";

export const OrdersList = () => {
  return (
    <div className="ordersList">
      <span>Лист заказов</span>
      <div className="header">
        <div>Наименование работ</div>
        <div>Наименование клиента</div>
        <div>Сумма сделки</div>
        <div className="date" >
          Дата начала<br></br>Дата завершения{" "}
        </div>
        <div>Статус работ</div>
      </div>
      <ul>
        <li>Разработка сайта</li>
        <li>ООО Фортуна</li>
        <li>100000 р.</li>
        <li>
          <div>01 ноября 2024</div>
          <div></div>
        </li>
        <li>
        <div>В работе</div>
        </li>
        <NavLink to="/editOrder">
          <Pencil className="pencil" />
        </NavLink>
      </ul>
      <ul>
        <li>Разработка сайта</li>
        <li>ООО Фортуна</li>
        <li>100000 р.</li>
        <li>
          <div>01 ноября 2024</div>
          <div>29 ноября 2024</div>
        </li>
        <li>
        <div>Завершен успешно</div>
        </li>
        <NavLink to="/editOrder">
          <Pencil className="pencil" />
        </NavLink>
      </ul>
    </div>
  );
};
