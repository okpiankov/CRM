import { NavLink } from "react-router-dom";
import "./CustomersList.scss";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { DB } from "../../../utils/appwrite";
import { COLLECTION_DEALS, DB_ID } from "../../../utils/app.constants";

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
export const CustomersList = () => {
  const [isLoading, setIsLoading] = useState(false);
  //Для хранения всех сделок приходящих с сервера
  const [deals, setDeals] = useState<TypeDeals[]>([]);

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
  }, []);

  return (
    <div className="customersList">
      {isLoading && <div className="loading">Загрузка...</div>}
      <span>Наши клиенты</span>
      <div className="header">
        <div>Наименование</div>
        <div>Контакты</div>
        <div>Откуда пришел</div>
      </div>
      <ul>
        {deals.map((deal) => (
          <li key={deal.$id}>
            <div>{deal.customer.customerName}</div>
            <div className="contacts">
              <div>{deal.customer.contact_person}</div>
              <div>{deal.customer.phone}</div>
              <div>{deal.customer.email}</div>
            </div>
            <div>
              {deal.customer.from_source && deal.customer.from_source
                ? deal.customer.from_source
                : "данные отстутствуют"}
            </div>
            <NavLink to={`/editCustomer/${deal.customer.$id}`}>
              <Pencil className="pencil" /> 
            </NavLink>
          </li>
        ))}
      </ul>
      {/* <ul>
        <li>ООО Фортуна</li>
        <li className="contacts">
          <div>Морозова Ирина Анатольевна</div>
          <div>88000000000</div>
          <div>client@ya.ru</div>
          </li>
        <li>yandex direct</li>
        <NavLink to="/editCustomerCard"><Pencil className="pencil"/></NavLink>
      </ul> */}
    </div>
  );
};
