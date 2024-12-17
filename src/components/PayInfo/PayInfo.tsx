import "./PayInfo.scss";
// import { ContextDeal } from "../../App";
import { COLLECTION_DEALS, DB_ID } from "../../../utils/app.constants";
import { DB } from "../../../utils/appwrite";
import dayjs from "dayjs";
import { Comments } from "../Comments/Comments";
import { useEffect, useState } from "react";
import store from "../../store/index";

export const PayInfo = ({
  setDrawerMenu,
}: {
  setDrawerMenu: (drawerMenu: boolean) => void;
}) => {
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
    $createdAt: string;
  };

  // const { cardId, columnName, actually_paid } = useContext(ContextDeal);
  //Получаю  id сделки и название колонки статуса из mobx
  // const object = store.data;
  // console.log({...object})
  const cardId = store.data.cardId;
  const columnName = store.data.columnName;
  const actually_paid = store.data.actually_paid;

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
    $createdAt: "",
  });

  useEffect(() => {
    const getDeal = async () => {
      setIsLoading(true);
      try {
        const data = await DB.getDocument(DB_ID, COLLECTION_DEALS, cardId);
        // console.log(data);
        const dataDeal = data as unknown as TypeDeal; //чтоб не ругался TypeScript
        setDeal(dataDeal);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getDeal();
  }, [cardId]);

  return (
    <>
      <div onClick={() => setDrawerMenu(false)} className="overlay"></div>
      <div className="box showRight">
        <div className="infoBlock">
          <div>ИНФОРМАЦИЯ О ПЛАТЕЖАХ</div>
          {isLoading && <div className="loadingInfo">Загрузка...</div>}
          <label>
            клиент
            <div className="company">{deal.customer.customerName}</div>
          </label>
          {/* <label>
            наименование работ
            <div className="nameWork">{deal.workName}</div>
          </label> */}
          <label>
            Полная стоимость
            <div className="price">{deal.price} руб.</div>
          </label>
          <label>
            фактически оплачено
            <div className="actuallyPaid ">{actually_paid} руб.</div>
          </label>
          <label>
            остаток к оплате
            <div className="remains">{deal.price - actually_paid} руб.</div>
          </label>
          <label>
            контактное лицо по оплате
            <div className="date">{deal.customer.contact_person}</div>
          </label>
          <div className="statusBoxInfo">
            <label>
              телефон
              <div className="date">{deal.customer.phone}</div>
            </label>
            <label>
              email
              <div className="email">{deal.customer.email}</div>
            </label>
          </div>
          <div className="statusBoxInfo">
            <label>
              дата создания
              <div className="dateInfo">
                {dayjs(deal.$createdAt).format("DD MMMM YYYY")}
              </div>
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

// export const PayInfo = ({ setDrawerMenu }) => {
//   return (
//     <>
//       <div onClick={() => setDrawerMenu(false)} className="overlay"></div>
//       <div className="box showRight">
//         <div className="infoBlock">
//           <div>ИНФОРМАЦИЯ О ПЛАТЕЖАХ</div>
//           <label>
//             клиент
//             <div className="company">Компания ООО Фортуна</div>
//           </label>
//           <label>
//             полная стоимость
//             <div className="fullPrice">100000 р.</div>
//           </label>
//           <label>
//             фактически оплачено
//             <div className="actuallyPaid ">50000 р.</div>
//           </label>
//           <label>
//             остаток к оплате
//             <div className="remains">50000 р.</div>
//           </label>
//           <label>
//             контактное лицо по оплате
//             <div className="date">Морозова Ирина</div>
//           </label>
//           <label>
//             телефон
//             <div className="date">88000000000</div>
//           </label>
//           <label>
//             email
//             <div className="date">client@ya.ru</div>
//           </label>
//           {/* <label>
//           статус
//           <div className="status">Аванс</div>
//         </label> */}
//         </div>
//         <div className="line"></div>
//         <form>
//           <textarea placeholder="Оставить комментарий"></textarea>
//         </form>
//         <div className="comment">
//           <div>Комментарий: 25 ноября 2024</div>Оплата будет выполнена 17
//           декабря 2024
//         </div>
//       </div>
//     </>
//   );
// };
