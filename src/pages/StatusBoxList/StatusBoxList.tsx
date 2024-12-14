import './StatusBoxList.scss'
import { useState, useEffect } from "react";
import { StatusBox } from "../../components/StatusBox/StatusBox";
import { DealInfo } from "../../components/DealInfo/DealInfo";
import { DB } from "../../../utils/appwrite";
import { COLLECTION_DEALS, DB_ID } from "../../../utils/app.constants";
import { KANBAN_DATA } from "../../../utils/kanban_data";

type TypeCustomer = {
  contact_person: string;
  customerName: string;
  email: string;
  from_source: string;
  phone: string;
};

type TypeDeal = {
  $createdAt: string;
  $id: string;
  customer: TypeCustomer;
  price: number;
  status: string;
  workName: string;
};

type TypeArrayDeals = {
  $createdAt: string;
  id: string;
  workName: string;
  price: number;
  companyName: string;
  status: string;
};
type TypeNewBoard = {
  id: string;
  name: string;
  arrayDeals: TypeArrayDeals[];
};
export const StatusBoxList = () => {

  //dragCard и sourceColumn стейты для draggable(претаскивания карточек в другую статусную колонку)
  const [sourceColumn, setSourceColumn] = useState(""); //текущая колонка columnId "todo", "to-be-agreed",..
  const [dragCard, setDragCard] = useState(""); //текущая карточка ее id

  //При начале перетаскивания карточки получаю ее id:
  function handleDragStart(card: string, column: string) {
    setDragCard(card);
    setSourceColumn(column);
  }
  //targetColumn - куда хочу перенести те новый статус: "todo", "to-be-agreed", "in-progress", "produced"
  function handleDrop(targetColumn: string) {
    if (sourceColumn !== targetColumn) {
      updateStatus(targetColumn);
    }
  }
  //updateStatus handleDragStart  handleDrop размещаю в родительском компоненте чтобы избежать лишних рендеров
  //dragCard - id карточки приходящее с сервера, формат, например:  "67531a730002e6427f88",
  //columnId или status - статус карточки куда нужно переместить , на выбор: "todo", "to-be-agreed", "in-progress", "produced"
  const updateStatus = async (targetColumn: string) => {
    setIsLoading(true);
    try {
      const data = await DB.updateDocument(DB_ID, COLLECTION_DEALS, dragCard, {
        status: targetColumn,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      location.reload();
    }
  };

  //Для открытия бокового меню
  const [drawerMenu, setDrawerMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //Для хранения всех сделок приходящих с сервера
  const [deals, setDeals] = useState<TypeDeal[]>([]);

  //Получаю ВСЕ СДЕЛКИ
  //const data = await axios.get(DB.listDocuments(DB_ID, COLLECTION_DEALS));
  //Ошибка axios не надо использовать все запросы только через api appwrite
  useEffect(() => {
    const getDeals = async () => {
      setIsLoading(true);
      try {
        const data = await DB.listDocuments(DB_ID, COLLECTION_DEALS);
        console.log(data.documents);
        const dataDeals = data.documents as unknown as TypeDeal[]; //чтоб не ругался TypeScript
        setDeals(dataDeals);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getDeals();
  }, []);

  //Делаю копию KANBAN_DATA
  const newBoard: TypeNewBoard[] = KANBAN_DATA.map((column) => ({
    ...column,
    arrayDeals: [],
  }));
  // console.log(newBoard);

  //Пробегаю по массиву deals(в нем находятся данные приходящие с сервера)
  //Нахожу все карточки сделок(приходящих с сервера) у которых id статус совпадает с id статусом в пустом массиве newBoard
  //И записываю эти карточки с сервера в соответствующий id статусу items: [] в newBoard
  //Те каждый раз при рендеренге этого компонента будет монтироваться новая копия KANBAN_DATA
  for (const deal of deals) {
    const column = newBoard.find((col) => col.id === deal.status);
    if (column) {
      column.arrayDeals.push({
        $createdAt: deal?.$createdAt,
        id: deal?.$id,
        workName: deal?.workName,
        price: deal?.price,
        companyName: deal?.customer?.customerName,
        status: column?.name,
      });
    }
  }

  return (
    //И не надо  через <Outlet /> пробрасывать состояние drawerMenu
    //тк <DealInfo/> решил импортировать в StatusBoxList  ниже по вложенности уже внутри <Outlet />
    <>
      <div className="board">Доска сделок</div>
      {drawerMenu && <DealInfo setDrawerMenu={setDrawerMenu} />}
      <section>
        {/*Прохожусь по копии KANBAN_DATA(уже с данными с сервера) и передаю пропсы в 2 вложенных компонента */}
        {newBoard.map((item) => (
          <StatusBox
            key={item.id}
            columnId={item.id}
            columnName={item.name}
            arrayDeals={item.arrayDeals}
            setDrawerMenu={setDrawerMenu}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
          />
        ))}
        {isLoading && <div className="loading">Загрузка...</div>}
      </section>
    </>
  );
};

// {statusName.map((item) => (
//   <StatusBox name={item.name} setDrawerMenu={setDrawerMenu} />
// ))}
// const statusName = [
//   { name: "Входящие" },
//   { name: "На согласовании" },
//   { name: "В работе" },
//   { name: "Произведено" },
// ];

// {/* {deals.map((item) => (
//           <div>{item.name}</div>
//         ))} */}
//         {/* <StatusBox setDrawerMenu={setDrawerMenu}/> */}
