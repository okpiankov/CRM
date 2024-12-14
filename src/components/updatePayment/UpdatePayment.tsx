"./UpdatePayment.scss";
import { useState, FormEvent, ChangeEvent } from "react";
import { DB } from "../../../utils/appwrite";
import { COLLECTION_DEALS, DB_ID } from "../../../utils/app.constants";

type TypeArrayDeal = [
  {
    id: string;
    workName: string;
    price: number;
    companyName: string;
    contact_person: string;
    phone: string;
    $createdAt: string;
    actually_paid: number;
  }
];
export const UpdatePayment = (arrayDeals: { arrayDeals: TypeArrayDeal }) => {
  const [isLoading, setIsLoading] = useState(false);

  type TypeDeal = {
    customerName: string;
    actually_paid: number;
  };

  const [formData, setFormData] = useState<TypeDeal>({
    customerName: "",
    actually_paid: 0,
  });
  //Нахожу в [] всех сделок конктеную сделку по имени клиента и вытаскиваю id сделки
  const deal = arrayDeals.arrayDeals.find(
    (item) => item.companyName == formData.customerName
  );
  console.log(deal);

  const deal_id = deal?.id;

  //Записываю в actually_paid: все значения в преобразованном числовом типе
  formData.actually_paid = +formData?.actually_paid;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //Обновление суммы фактически уплаченной за работы
    const updateStatus = async () => {
      setIsLoading(true);
      try {
        const data = await DB.updateDocument(DB_ID, COLLECTION_DEALS, deal_id, {
          actually_paid: formData.actually_paid,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        location.reload();
      }
    };
    updateStatus(); 
  };

  return (
    <form className="show_form" onSubmit={handleSubmit} noValidate >
      <input
        type="text"
        value={formData.customerName}
        name="customerName"
        // onChange={handleСustomerChange}
        onChange={handleChange}
        placeholder="Клиент"
      />
      {/* <select>
        <option>Выберите клиента</option>
        {arrayDeals.arrayDeals.map((item) => (
          <option>{item.companyName}</option>
        ))}
      </select> */}
      <label className="lablePayment">
        Оплачено:
        <input
          // type="number"
          onFocus={(event) => (event.target.type = "number")}
          value={formData.actually_paid}
          name="actually_paid"
          onChange={handleChange}
          placeholder="Фактически оплачено"
          min="0"
          step="1"
        />
      </label>
      {/* <input
        // type="number"
        onFocus={(event) => (event.target.type = "number")}
        value={formData.price}
        name="price"
        onChange={handleChange}
        placeholder="Сумма сделки"
        min="1"
        step="1"
      /> */}
      <button>{isLoading ? "Загрузка..." : "Добавить"}</button>
    </form>
  );
};
