import "./StatusPayBox.scss"
import { CirclePlus, ArrowUp } from "lucide-react";
import { PayCard } from "../PayCard/PayCard";
import { useState } from "react";

export const StatusPayBox = ({ setDrawerMenu, name }) => {
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
              <input type="text" placeholder="Клиент" />
              <input type="text" placeholder="Полная стоимость" />
              <input type="text" placeholder="Фактически оплачено" />
              <input type="text" placeholder="Контактное лицо" />
              <input type="text" placeholder="Телефон" />
              <input type="email" placeholder="Email" />
              <button>Добавить</button>
            </form>
          )}
          <PayCard setDrawerMenu={setDrawerMenu} />
        </div>
      );
    };
