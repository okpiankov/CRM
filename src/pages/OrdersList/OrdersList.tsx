import { NavLink } from "react-router-dom";
import "./OrdersList.scss";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { DB } from "../../../utils/appwrite";
import { COLLECTION_DEALS, DB_ID } from "../../../utils/app.constants";
import dayjs from "dayjs";
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
  finish_date: string;
};
export const OrdersList = () => {
  const [isLoading, setIsLoading] = useState(false);
  //Для хранения всех сделок приходящих с сервера
  const [deals, setDeals] = useState<TypeDeal[]>([]);

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

  return (
    <div className="ordersList">
      {isLoading && <div className="loading">Загрузка...</div>}
      <span>Лист заказов</span>
      <div className="header">
        <div>Наименование работ</div>
        <div>Наименование клиента</div>
        <div>Сумма сделки руб.</div>
        <div className="date">
          Дата начала<br></br>Дата завершения{" "}
        </div>
        <div>Статус работ</div>
      </div>
      <ul>
        {deals.map((deal) => (
          <li key={deal.$id}>
            <div>{deal.workName}</div>
            <div>{deal.customer.customerName}</div>
            <div>{deal.price}</div>
            <div>
              {dayjs(deal.$createdAt).format("DD MMMM YYYY")}
              <br></br>
              {/* {deal.finish_date} */}
            </div>

            <div>
              <div>
                {KANBAN_DATA.find((item) => item.id === deal.status)?.name}
              </div>
            </div>
            {/* <NavLink to={`/editCustomer/${deal.customer.$id}`}> */}
            <NavLink to={`/editOrder/${deal.$id}`}>
              <Pencil className="pencil" />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
{
  /* <ul>
        <li>Разработка сайта</li>
        <li>ООО Фортуна</li>
        <li>100000 р.</li>
        <li>
          <div>01 ноября 2024</div>
          <div>29 ноября 2024</div>
        </li>
        <li>
        <div>Завершен успешно</div>
        </li>
        <NavLink to="/editOrder">
          <Pencil className="pencil" />
        </NavLink>
      </ul> */
}
