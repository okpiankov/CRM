import "./CustomerCard.scss";
import { SquareMenu } from "lucide-react";

export const CustomerCard = ({ setDrawerMenu }) => {
  return (
    //Передачу состояния производить до самого низового компонента!
    <div onClick={() => setDrawerMenu(true)} className="customerCard">
      <div className="name">Разработка сайта</div>
      <div className="price">100000 р.</div>
      <div className="company">Компания ООО Фортуна</div>
      <div className="date">
        25 ноября 2024 <SquareMenu className="squareMenu" />
      </div>
    </div>
  );
};
