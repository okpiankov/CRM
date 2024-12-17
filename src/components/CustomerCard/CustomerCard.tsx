import "./CustomerCard.scss";
import { SquareMenu } from "lucide-react";
// import { useContext } from "react";
// import { ContextDeal } from "../../App";
import dayjs from "dayjs";
import store from "../../store/index";

type TypeProps = {
  setDrawerMenu: (drawerMenu: boolean) => void;
  workName: string;
  companyName: string;
  price: number;
  $createdAt: string;
  handleDragStart: (card: string, column: string) => void;
  cardId: string;
  columnId: string;
  columnName: string;
};

export const CustomerCard = ({
  setDrawerMenu,
  workName,
  companyName,
  price,
  $createdAt,
  handleDragStart,
  cardId,
  columnId,
  columnName,
}: TypeProps) => {
  //Достаю функцию getContextDeal из контекста для передачи в нее id и статуса
  // const  {getContextDeal} = useContext(ContextDeal);
  ////  export const ContextDeal = createContext({companyName,cardId});
  //// const contextClick =  () => {
  ////    const ContextDeal = createContext({companyName,cardId});
  //// console.log('contextDeal',ContextDeal)
  ////  }

  return (
    //Передачу состояния производить до самого низового компонента!
    <div
      onClick={() => {
        setDrawerMenu(true);
        // getContextDeal(cardId, columnName); //Передача в react useContext
        store.addStore(cardId, columnName, 0); //Запись id сделки и статуса в стор mobx
      }}
      //Применяю событие DragStart=, не onMouseDown= и не handleDragStart в onClick=
      //событие DragStart= передаю в самый низовой элемент который хочу перетаскивать
      //атрибут draggable="true" указываю обязательно и + отмену его дефолтного поведения
      onDragStart={() => handleDragStart(cardId, columnId)}
      className="customerCard show"
      draggable="true"
    >
      <div className="name">{workName}</div>
      <div className="price">{price} руб.</div>
      <div className="company">{companyName}</div>
      <div className="date">
        {/* Получаю дату с сервера в нужном формате */}
        {dayjs($createdAt).format("DD MMMM YYYY")}{" "}
        <SquareMenu className="squareMenu" />
        {/* <div>Колонка: {columnName}</div>
        <div>status: {columnId}</div>
        <div>id: {cardId}</div> */}
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
