import { useState, useEffect } from "react";
import { StatusBox } from "../../components/StatusBox/StatusBox";
import { DealInfo } from "../../components/DealInfo/DealInfo";
import { DB } from "../../../utils/appwrite";
import { COLLECTION_DEALS, DB_ID } from "../../../utils/app.constants";
import { Key } from "lucide-react";
import { useLocation } from "react-router-dom";

export const StatusBoxList = () => {
  // const statusName = [
  //   { name: "Входящие" },
  //   { name: "На согласовании" },
  //   { name: "В работе" },
  //   { name: "Произведено" },
  // ];
  const KANBAN_DATA = [
    {
      id: "todo",
      name: "Входящие",
      items: [],
    },
    {
      id: "to-be-agreed",
      name: "На согласовании",
      items: [],
    },
    {
      id: "in-progress",
      name: "В производстве",
      items: [],
    },
    {
      id: "produced",
      name: "Произведено",
      items: [],
    },
  ];

  const [drawerMenu, setDrawerMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [deals, setDeals] = useState([]);

  //const data = await axios.get(DB.listDocuments(DB_ID, COLLECTION_DEALS));
  //Ошибка axios не надо использовать все запросы только через api appwrite

  useEffect(() => {
    const getDeals = async () => {
      setIsLoading(true);
      try {
        const data = await DB.listDocuments(DB_ID, COLLECTION_DEALS);
        console.log(data);
        setDeals(data.documents);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getDeals();
  }, []);

  //Делаю копию KANBAN_DATA
  const newBoard = KANBAN_DATA.map((column) => ({
    ...column,
    items: [],
  }));
  // console.log(newBoard);

  //Пробегаю по массиву deals(в нем находятся данные приходящие с сервера)
  //Нахожу все карточки сделок(приходящих с сервера) у которых id статус совподает с id статусом в пустом массиве newBoard
  //И записываю эти карточки с сервера в соответствующий id статусу items: [] в newBoard
  //Те каждый раз при рендеренге этого компонента будет монтироваться новая копия KANBAN_DATA
  for (const deal of deals) {
    const column = newBoard.find((col) => col.id === deal.status);
    if (column) {
      column.items.push({
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
      {drawerMenu && (
        <DealInfo drawerMenu={drawerMenu} setDrawerMenu={setDrawerMenu} />
      )}
      <section>
        {/*Прохожусь по копии KANBAN_DATA(уже с данными с сервера) и передаю пропсы в 2 вложенных компонента */}
        {newBoard.map((item) => (
          <StatusBox
            key={item.id}
            columnId={item.id}
            columnName={item.name}
            columnItems={item.items}
            setDrawerMenu={setDrawerMenu}
          />
        ))}

        {/* {deals.map((item) => (
          <div>{item.name}</div>
        ))} */}
        {/* <StatusBox setDrawerMenu={setDrawerMenu}/> */}
      </section>
    </>
  );
};
// {statusName.map((item) => (
//   <StatusBox name={item.name} setDrawerMenu={setDrawerMenu} />
// ))}
