import "./StatusPayBox.scss";
import { CirclePlus, ArrowUp } from "lucide-react";
import { PayCard } from "../PayCard/PayCard";
import { useState } from "react";
import { UpdatePayment } from "../UpdatePayment/UpdatePayment";

type TypeArrayDeals = {
  id: string;
  workName: string;
  price: number;
  companyName: string;
  $createdAt: string;
  actually_paid: number;
};

type TypeProps = {
  setDrawerMenu: (drawerMenu: boolean) => void;
  columnName: string;
  arrayDeals: TypeArrayDeals[];
  columnId: string;
  handleDragStart: (card: string, column: string) => void;
  handleDrop: (targetColumn: string) => void;
  setStatus: (status: string) => void
};

export const StatusPayBox = ({
  setDrawerMenu,
  columnName,
  arrayDeals,
  columnId,
  handleDragStart,
  handleDrop,
  setStatus
}: TypeProps) => {
  const [addCard, setAddCard] = useState(false);

  return (
    //Событие onDrop= наступает при отпускании элемента, отпустил на колонке- пришел статус из этой колонки
    //События onDragOver=  onDrop= указываю на родительском компоненте
    //В onDragOver= отключаю дефолтное поведение draggable="true", если нет то не будет работать  onDrop=
    <div
      className="statusBox"
      onDragOver={(event) => event.preventDefault()}
      onDrop={() => handleDrop(columnId)}
    >
      <div className="status">
        {columnName}
        <div className="triangle-right"></div>
        <div className="triangle-left-top"></div>
        <div className="triangle-left-bottom"></div>
      </div>

      <div className="addCard">
        {addCard === false ? (
          <CirclePlus onClick={() => setAddCard(true)} className="plus" />
        ) : (
          <ArrowUp onClick={() => setAddCard(false)} className="arrow" />
        )}
      </div>
      {addCard && <UpdatePayment arrayDeals={arrayDeals} setStatus={setStatus}/>}
      {/* <button onClick={updateStatus}>Изменить колонку</button> */}
      {arrayDeals.map((item) => (
        <PayCard
          key={item.id}
          workName={item.workName}
          companyName={item.companyName}
          price={item.price}
          $createdAt={item.$createdAt}
          setDrawerMenu={setDrawerMenu}
          columnName={columnName}
          handleDragStart={handleDragStart}
          columnId={columnId}
          cardId={item.id}
          actually_paid={item.actually_paid}
        />
      ))}
      {/* <CustomerCard setDrawerMenu={setDrawerMenu} /> */}
    </div>
  );
};

// export const StatusPayBox = ({ setDrawerMenu, name }) => {
//     const [addCard, setAddCard] = useState(false);

//     return (
//         <div className="statusBox">
//           <div className="status">
//         {name}
//         <div className="triangle-right"></div>
//         <div className="triangle-left-top"></div>
//         <div className="triangle-left-bottom"></div>
//       </div>
//           <div className="addCard">
//             {addCard === false ? (
//               <CirclePlus onClick={() => setAddCard(true)} className="plus" />
//             ) : (
//               <ArrowUp onClick={() => setAddCard(false)} className="arrow" />
//             )}
//           </div>
//           {addCard && (
//             <form>
//               <input type="text" placeholder="Клиент" />
//               <input type="text" placeholder="Полная стоимость" />
//               <input type="text" placeholder="Фактически оплачено" />
//               <input type="text" placeholder="Контактное лицо" />
//               <input type="text" placeholder="Телефон" />
//               <input type="email" placeholder="Email" />
//               <button>Добавить</button>
//             </form>
//           )}
//           <PayCard setDrawerMenu={setDrawerMenu} />
//         </div>
//       );
//     };
