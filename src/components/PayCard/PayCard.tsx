import { useContext } from "react";
import "./PayCard.scss";
import { SquareMenu } from "lucide-react";
import dayjs from "dayjs";
import { ContextDeal } from "../../App";



type TypeProps = {
  setDrawerMenu: (drawerMenu: boolean) => void
  workName: string
  companyName: string
  price: number
  $createdAt: string
  handleDragStart: (card: string, column: string) => void
  cardId: string
  columnId: string
  columnName: string
  actually_paid: number
}; 

export const PayCard = ({
  setDrawerMenu,
  workName,
  companyName,
  price,
  $createdAt,
  handleDragStart,
  cardId,
  columnId,
  columnName,
  actually_paid
}: TypeProps) => {

//  export const ContextDeal = createContext({companyName,cardId});

// const contextClick =  () => {
//    const ContextDeal = createContext({companyName,cardId});
// console.log('contextDeal',ContextDeal)
//  }
const  {getContextDeal} = useContext(ContextDeal);

  return (
    //Передачу состояния производить до самого низового компонента!
    <div
      onClick={() => {
        setDrawerMenu(true);
        getContextDeal(cardId, columnName, actually_paid);
      }}
      //Применяю событие DragStart=, не onMouseDown= и не handleDragStart в onClick=
      //событие DragStart= передаю в самый низовой элемент который хочу перетаскивать
      //атрибут draggable="true" указываю обязательно и + отмену его дефолтного поведения
      onDragStart={() => handleDragStart(cardId, columnId)}
      className="customerCard show"
      draggable="true"
    >
      <div className="name">{companyName}</div>
      <div className="company">{workName}</div>
      <div className="price">Полная стоимость:<br></br> {price} руб.</div>
      <div className="reallyPrice">Фактически оплачено:<br></br> {actually_paid} руб.</div>
      <div className="date">
        {/* Получаю дату с сервера в нужном формате */}
      { dayjs($createdAt).format('DD MMMM YYYY') } <SquareMenu className="squareMenu" />
        {/* <div>Колонка: {columnName}</div>
        <div>status: {columnId}</div>
        <div>id: {cardId}</div> */}
      </div>
    </div>
  );
};



// export const PayCard = ({ setDrawerMenu }) => {
//   return (
//     //Передачу состояния производить до самого низового компонента!
//     <div onClick={() => setDrawerMenu(true)} className="customerCard">
//       <div className="name">ООО Фортуна</div>
//       <div className="fullPrice">Полная стоимость: 100000 р.</div>
//       <div className="reallyPrice">Фактически оплачено: 100000 р.</div>
//       <div className="date">
//         25 ноября 2024 <SquareMenu className="squareMenu" />
//       </div>
//     </div>
//   );
// };
