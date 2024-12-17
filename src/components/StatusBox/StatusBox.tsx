import "./StatusBox.scss";
import { CirclePlus, ArrowUp } from "lucide-react";
import { CustomerCard } from "../CustomerCard/CustomerCard";
import {  useState } from "react";
import { CreateDeal } from "../CreateDeal/CreateDeal";

type TypeArrayDeals = {
  id: string
  workName: string
  price: number
  companyName: string
  $createdAt: string
}
type TypeProps = {
  setDrawerMenu: (drawerMenu: boolean) => void
  columnName: string
  arrayDeals: TypeArrayDeals[] 
  columnId: string
  handleDragStart: (card: string, column: string) => void
  handleDrop: (targetColumn: string) => void
  setStatus: (status: string) => void
}; 

export const StatusBox = ({
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
      {addCard && <CreateDeal columnId={columnId} setStatus={setStatus}/>}
      {/* <button onClick={updateStatus}>Изменить колонку</button> */}
      {arrayDeals.map((item) => (
        <CustomerCard
          key={item.id}
          workName={item.workName}
          companyName={item.companyName}
          price={item.price}
          $createdAt={item.$createdAt}
          cardId={item.id}
          setDrawerMenu={setDrawerMenu}
          columnName={columnName}
          handleDragStart={handleDragStart}
          columnId={columnId}
        />
      ))}
      {/* <CustomerCard setDrawerMenu={setDrawerMenu} /> */}
    </div>
  );
};

//   dragCard,
//   setDragCard,
//   sourceColumn,
//   setSourceColumn,

// //Ошибка
// // dragCard и sourceColumn нужно премесить на уровен выше до формирования колонок через map
// // иначе они не будут видны при перетаскивании в другую колонку тк там уже свои стейты
// // const [sourceColumn, setSourceColumn] = useState(null); //текущая колонка columnId "todo", "to-be-agreed",..
// // const [dragCard, setDragCard] = useState(''); //текущая карточка ее id

// function handleDragStart(card, column) {
//   console.log("handleDragStart", card);
//   setDragCard(card);
//   setSourceColumn(column);
// }
// console.log("dragCard", dragCard);
// console.log("sourceColumn", sourceColumn);

// //dragCard - id карточки приходящее с сервера, формат, например:  "67531a730002e6427f88",
// //columnId или status - статус карточки куда нужно переместить , на выбор: "todo", "to-be-agreed", "in-progress", "produced"
// const updateStatus = async (targetColumn) => {
//   console.log("updateStatus", dragCard);
//   setIsLoading(true);
//   try {
//     const data = await DB.updateDocument(DB_ID, COLLECTION_DEALS, dragCard, {
//       status: targetColumn,
//     });
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setIsLoading(false);
//     // navigate("/");
//   }
// };

// //targetColumn - куда хочу перенести те новый статус: "todo", "to-be-agreed", "in-progress", "produced"
// function handleDrop(targetColumn) {
//   console.log("handleDrop", dragCard);
//   if (sourceColumn !== targetColumn) {
//     updateStatus(targetColumn);
//   }
// }
