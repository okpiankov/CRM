import "./PayInfo.scss";

export const PayInfo = ({ setDrawerMenu }) => {
  return (
    <>
      <div onClick={() => setDrawerMenu(false)} className="overlay"></div>
      <div className="box showRight">
        <div className="infoBlock">
          <div>ИНФОРМАЦИЯ О ПЛАТЕЖАХ</div>
          <label>
            клиент
            <div className="company">Компания ООО Фортуна</div>
          </label>
          <label>
            полная стоимость
            <div className="fullPrice">100000 р.</div>
          </label>
          <label>
            фактически оплачено
            <div className="actuallyPaid ">50000 р.</div>
          </label>
          <label>
            остаток к оплате
            <div className="remains">50000 р.</div>
          </label>
          <label>
            контактное лицо по оплате
            <div className="date">Морозова Ирина</div>
          </label>
          <label>
            телефон
            <div className="date">88000000000</div>
          </label>
          <label>
            email
            <div className="date">client@ya.ru</div>
          </label>
          {/* <label>
          статус
          <div className="status">Аванс</div>
        </label> */}
        </div>
        <div className="line"></div>
        <form>
          <textarea placeholder="Оставить комментарий"></textarea>
        </form>
        <div className="comment">
          <div>Комментарий: 25 ноября 2024</div>Оплата будет выполнена 17
          декабря 2024
        </div>
      </div>
    </>
  );
};
