import "./CustomerCard.scss";
import { SquareMenu } from "lucide-react";

export const CustomerCard = ({ setDrawerMenu, workName, companyName, price }) => {
  return (
    //Передачу состояния производить до самого низового компонента!
    <div onClick={() => setDrawerMenu(true)} className="customerCard show" draggable="true">
      <div className="name">{workName}</div>
      <div className="price">{price} руб.</div>
      <div className="company">{companyName}</div>
      <div className="date">
        25 ноября 2024 <SquareMenu className="squareMenu" />
      </div>
    </div>
  );
};

// return (
//   //Передачу состояния производить до самого низового компонента!
//   <div onClick={() => setDrawerMenu(true)} className="customerCard show" draggable="true">
//     <div className="name">Разработка сайта</div>
//     <div className="price">100000 р.</div>
//     <div className="company">Компания ООО Фортуна</div>
//     <div className="date">
//       25 ноября 2024 <SquareMenu className="squareMenu" />
//     </div>
//   </div>
// );
// };