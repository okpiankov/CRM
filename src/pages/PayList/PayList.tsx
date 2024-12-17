import { useState, useEffect } from "react";
import { StatusPayBox } from "../../components/StatusPayBox/StatusPayBox";
import './PayList.scss'
import { PayInfo } from "../../components/PayInfo/PayInfo";
import { DB } from "../../../utils/appwrite";
import { COLLECTION_DEALS, DB_ID } from "../../../utils/app.constants";
import { KANBAN_PAYMENTS } from "../../../utils/kanban_data";


type TypeCustomer = {
  $id: string;
  customerName: string;
  contact_person: string;
  email: string;
  phone: string;
  from_source: string;
};

type TypeDeals = {
  $id: string;
  workName: string;
  price: number;
  $createdAt: string;
  customer: TypeCustomer;
  status: string;
  payment_status: string
  actually_paid: number
  finish_date: string
};

type TypeArrayDeals = {
  id: string;
  workName: string;
  price: number;
  companyName: string;
  $createdAt: string;
  actually_paid: number;
};
type TypeNewBoard = {
  id: string;
  name: string;
  arrayDeals: TypeArrayDeals[];
};

export const PayList = () => {
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

  //Для подписки getDeals на измение статуса карточки
  const[status, setStatus] = useState({});

  //updateStatus handleDragStart  handleDrop размещаю в родительском компоненте чтобы избежать лишних рендеров
  //dragCard - id карточки приходящее с сервера, формат, например:  "67531a730002e6427f88",
  //columnId или status - статус карточки куда нужно переместить , на выбор: "todo", "to-be-agreed", "in-progress", "produced"
  const updateStatus = async (targetColumn: string) => {
    setIsLoading(true);
    try {
      const data = await DB.updateDocument(DB_ID, COLLECTION_DEALS, dragCard, {
        payment_status: targetColumn,
      });
      console.log(data);
      const dataDeal = data as unknown as TypeDeals; //чтоб не ругался TypeScript
      setStatus(dataDeal)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      // location.reload();
    }
  };

  //Для открытия бокового меню
  const [drawerMenu, setDrawerMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //Для хранения всех сделок приходящих с сервера
  const [deals, setDeals] = useState<TypeDeals[]>([]);

  //Получаю ВСЕ СДЕЛКИ
  //const data = await axios.get(DB.listDocuments(DB_ID, COLLECTION_DEALS));
  //Ошибка axios не надо использовать все запросы только через api appwrite
  useEffect(() => {
    const getDeals = async () => {
      setIsLoading(true);
      try {
        const data = await DB.listDocuments(DB_ID, COLLECTION_DEALS);
        console.log(data.documents);
        const dataDeals = data.documents as unknown as TypeDeals[]; //чтоб не ругался TypeScript
        setDeals(dataDeals);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getDeals();
  }, [status]);

  //Делаю копию KANBAN_DATA
  const newBoard: TypeNewBoard[] = KANBAN_PAYMENTS.map((column) => ({
    ...column,
    arrayDeals: [],
  }));
  // console.log(newBoard);

  //Пробегаю по массиву deals(в нем находятся данные приходящие с сервера)
  //Нахожу все карточки сделок(приходящих с сервера) у которых id статус совпадает с id статусом в пустом массиве newBoard
  //И записываю эти карточки с сервера в соответствующий id статусу items: [] в newBoard
  //Те каждый раз при рендеренге этого компонента будет монтироваться новая копия KANBAN_DATA
  for (const deal of deals) {
    const column = newBoard.find((col) => col.id === deal.payment_status);
    if (column) {
      column.arrayDeals.push({
        id: deal?.$id,
        workName: deal?.workName,
        price: deal?.price,
        companyName: deal?.customer?.customerName,
        $createdAt: deal?.$createdAt,
        actually_paid: deal?.actually_paid,
      });
    }
  }

  return (
    //И не надо  через <Outlet /> пробрасывать состояние drawerMenu
    //тк <DealInfo/> решил импортировать в StatusBoxList  ниже по вложенности уже внутри <Outlet />
    <>
      <div className="board">Доска платежей</div>
      {drawerMenu && <PayInfo setDrawerMenu={setDrawerMenu} />}
      <section>
        {/*Прохожусь по копии KANBAN_DATA(уже с данными с сервера) и передаю пропсы в 2 вложенных компонента */}
        {newBoard.map((item) => (
          <StatusPayBox
            key={item.id}
            columnId={item.id}
            columnName={item.name}
            arrayDeals={item.arrayDeals}
            setDrawerMenu={setDrawerMenu}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
            setStatus={setStatus}
          />
        ))}
        {isLoading && <div className="loading">Загрузка...</div>}
      </section>
    </>
  );
};


    // export const PayList = () => {
    //   const statusName = [
    //       // { name: "Подготовка документов" },
    //       { name: "Счет на оплате" },
    //       { name: "Аванс" },
    //       { name: "Оплата с отсрочкой" },
    //       { name: "Оплачено" },
    //     ];
      
    //     const [drawerMenu, setDrawerMenu] = useState(false);
      
    //     return (
    //       //И не надо  через <Outlet /> пробрасывать состояние drawerMenu
    //       //тк <DealInfo/> решил импортировать в StatusBoxList  ниже по вложенности уже внутри <Outlet />
    //       <>
    //         {drawerMenu && (
    //           <PayInfo drawerMenu={drawerMenu} setDrawerMenu={setDrawerMenu} />
    //         )}
    //         <section>
    //           {statusName.map((item) => (
    //             <StatusPayBox name={item.name} setDrawerMenu={setDrawerMenu} />
    //           ))}
    //           {/* <StatusBox setDrawerMenu={setDrawerMenu}/> */}
    //         </section>
    //       </>
    //     );
    //   };
    