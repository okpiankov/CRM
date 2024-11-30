import "./EditOrder.scss";

export const EditOrder = () => {
  return (
    <div className="wrapper">
      <span>Редактирование заказа</span>
      <form>
        {/* <input type="text" placeholder="Наименование клиента" /> */}
        <input type="text" placeholder="Наименование работ" />
        <input type="text" placeholder="Сумма сделки" />
        <input type="date" placeholder="Дата начала работ" />
        <input type="date" placeholder="Дата завершения работ" />
        <button>Сохранить</button>
      </form>
    </div>
  );
};