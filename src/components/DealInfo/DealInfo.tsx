import { useContext, useEffect, useState } from "react";
import { Comments } from "../Comments/Comments";
import "./DealInfo.scss";
import { ContextDeal } from '../../App';
import { COLLECTION_DEALS, DB_ID } from "../../../utils/app.constants";
import { DB } from "../../../utils/appwrite";
import dayjs from 'dayjs'

export const DealInfo = ({ setDrawerMenu }: { setDrawerMenu:  (drawerMenu: boolean) => void })  => {
  type TypeDeal = {
    workName: string;
    price: number;
    customer: {
      email: string;
      customerName: string;
      contact_person: string;
      phone: string;
    };
    status: string;
    $createdAt: string
  };

  const  { cardId, columnName } = useContext(ContextDeal);
  const [isLoading, setIsLoading] = useState(false);
  const [deal, setDeal] = useState<TypeDeal>({
    workName: "",
    price: 0,
    customer: {
      email: "",
      customerName: "",
      contact_person: "",
      phone: "",
    },
    status: "",
    $createdAt: ""
  });

  useEffect(() => {
    const getComments = async () => {
      setIsLoading(true);
      try {
        const data = await DB.getDocument(DB_ID, COLLECTION_DEALS, cardId);
        // console.log(data);
        const dataDeal = data as unknown as TypeDeal;//чтоб не ругался TypeScript
        setDeal(dataDeal);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getComments();
  }, []);

  
  return (
    <>
      <div onClick={() => setDrawerMenu(false)} className="overlay"></div>
      <div className="box showRight">
        <div className="infoBlock">
          <div>ИНФОРМАЦИЯ О СДЕЛКЕ</div>
          {isLoading && <div className="loadingInfo">Загрузка...</div>}
          <label>
            наименование работ
            <div className="name">{deal.workName}</div>
          </label>
          <label>
            сумма сделки
            <div className="price">{deal.price} руб.</div>
          </label>
          <label>
            клиент
            <div className="company">{deal.customer.customerName}</div>
          </label>
          <label>
            контактное лицо
            <div className="date">{deal.customer.contact_person}</div>
          </label>
          <label>
            телефон
            <div className="date">{deal.customer.phone}</div>
          </label>
          <label>
            email
            <div className="date">{deal.customer.email}</div>
          </label>
          <div className="statusBoxInfo">
          <label>
            дата создания
            <div className="dateInfo">{ dayjs(deal.$createdAt).format('DD MMMM YYYY') }</div>
          </label>
          <label>
            статус
            <div className="statusInfo">{columnName}</div>
          </label>
          </div>
          
        </div>
        <div className="line"></div>
        <Comments />
        {/* <form>
          <textarea placeholder="Оставить комментарий"></textarea>
        </form>
        <div className="comment">
          <div>Комментарий: 25 ноября 2024</div>Перенес встречу на завтра на 10
          утра
        </div> */}
      </div>
    </>
  );
};
