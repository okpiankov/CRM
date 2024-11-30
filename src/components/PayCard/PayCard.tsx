import "./PayCard.scss";
import { SquareMenu } from "lucide-react";

export const PayCard = ({ setDrawerMenu }) => {
  return (
    //Передачу состояния производить до самого низового компонента!
    <div onClick={() => setDrawerMenu(true)} className="customerCard">
      <div className="name">ООО Фортуна</div>
      <div className="fullPrice">Полная стоимость: 100000 р.</div>
      <div className="reallyPrice">Фактически оплачено: 100000 р.</div>
      <div className="date">
        25 ноября 2024 <SquareMenu className="squareMenu" />
      </div>
    </div>
  );
};
