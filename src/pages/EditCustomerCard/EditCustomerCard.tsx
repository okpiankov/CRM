import "./EditCustomerCard.scss";

export const EditCustomerCard = () => {
  return (
    <div className="wrapper">
      <span>Редактирование клиента</span>
      <form>
        <input type="text" placeholder="Наименование" />
        <input type="text" placeholder="Контактное лицо" />
        <input type="telephone" placeholder="Номер телефона" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Откуда пришел" />
        <button>Сохранить</button>
      </form>
    </div>
  );
};
