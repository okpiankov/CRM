import "./StatusBox.scss";
import { CirclePlus, ArrowUp } from "lucide-react";
import { CustomerCard } from "../CustomerCard/CustomerCard";
import { useState } from "react";

export const StatusBox = ({ setDrawerMenu, name }) => {
  const [addCard, setAddCard] = useState(false);

  return (
    <div className="statusBox">
      <div className="status">{name}</div>
      <div className="addCard">
        {addCard === false ? (
          <CirclePlus onClick={() => setAddCard(true)} className="plus" />
        ) : (
          <ArrowUp onClick={() => setAddCard(false)} className="arrow" />
        )}
      </div>
      {addCard && (
        <form>
          <input type="text" placeholder="Наименование работ" />
          <input type="text" placeholder="Сумма сделки" />
          <input type="text" placeholder="Клиент" />
          <input type="text" placeholder="Контактное лицо" />
          <input type="text" placeholder="Телефон" />
          <input type="email" placeholder="Email" />
          <button>Добавить</button>
        </form>
      )}
      <CustomerCard setDrawerMenu={setDrawerMenu} />
    </div>
  );
};
