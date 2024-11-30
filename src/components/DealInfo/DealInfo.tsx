import "./DealInfo.scss";

export const DealInfo = ({ setDrawerMenu }) => {
  return (
    <>
      <div onClick={() => setDrawerMenu(false)} className="overlay"></div>
      <div className="box showRight">
        <div className="infoBlock">
          <div>ИНФОРМАЦИЯ О СДЕЛКЕ</div>
          <label>
            наименование работ
            <div className="name">Разработка сайта</div>
          </label>
          <label>
            сумма сделки
            <div className="price">100000 р.</div>
          </label>
          <label>
            клиент
            <div className="company">Компания ООО Фортуна</div>
          </label>
          <label>
            контактное лицо
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
          <label>
            дата создания
            <div className="date">25 ноября 2024</div>
          </label>
          {/* <label>
            статус
            <div className="status">Входящие</div>
          </label> */}
        </div>
        <div className="line"></div>
        <form>
          <textarea placeholder="Оставить комментарий"></textarea>
        </form>
        <div className="comment">
          <div>Комментарий: 25 ноября 2024</div>Перенес встречу на завтра на 10
          утра
        </div>
      </div>
    </>
  );
};
