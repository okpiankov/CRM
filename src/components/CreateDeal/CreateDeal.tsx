import "./CreateDeal.scss";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { v4 as uuid } from "uuid";
import { DB } from "../../../utils/appwrite";
import {
  COLLECTION_DEALS,
  COLLECTION_CUSTOMERS,
  DB_ID,
} from "../../../utils/app.constants";
import { Navigate, useNavigate } from "react-router-dom";

export const CreateDeal = (columnId: {columnId: string}) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  //Уходящие все поля протипизировал иначе БД не будет принимать
  //Важно полное сооотвие вложенности приходящего объекта с appwrite и отправляемого!
  //customerName вложен в customer(сам appwrite формирует такой объект)
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
  };

  //Пробрасываю columnId статус колонки из newBoard через все компоненты, теперь каждой форме свой статус
  const [formData, setFormData] = useState<TypeDeal>({
    workName: "",
    price: 0,
    customer: {
      email: "",
      customerName: "",
      contact_person: "",
      phone: "",
    },
    status: columnId.columnId,
  });
  // console.log(formData);
  //Записываю в price: все значения в преобразованном числовом типе
  formData.price = +formData?.price;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //тк в объекте есть вложенный объект то для него сделал отдельную функцию handleСustomerChange
  //и обязательно разворачиваю сначала весь state ...prev а уже внутри него снова разворачиваю ...prev.customer
  const handleСustomerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      customer: { ...prev.customer, [name]: value },
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // uuid()- генерирует уникальный id, обязательное требование на appwrite
    //передаю только одну коллекцию, а связанную с ней другую ненадо передавать COLLECTION_CUSTOMERS...
    const createDeals = async () => {
      setIsLoading(true);
      try {
        const response = await DB.createDocument(
          DB_ID,
          COLLECTION_DEALS,
          uuid(),
          formData
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        navigate("/");
        location.reload();
      }
    };
    createDeals();
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        value={formData.workName}
        name="workName"
        onChange={handleChange}
        placeholder="Наименование работ"
      />
      <input
        // type="number"
        onFocus={(event) => (event.target.type = "number")}
        value={formData.price}
        name="price"
        onChange={handleChange}
        placeholder="Сумма сделки"
        min="1"
        step="1"
      />
      <input
        type="text"
        value={formData.customer.customerName}
        name="customerName"
        onChange={handleСustomerChange}
        // onChange={handleChange}
        placeholder="Клиент"
      />
       <input
        type="text"
        value={formData.customer.contact_person}
        name="contact_person"
        onChange={handleСustomerChange}
        placeholder="Контактное лицо"
      />
      <input
        type="email"
        value={formData.customer.email}
        name="email"
        onChange={handleСustomerChange}
        // onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        value={formData.customer.phone}
        name="phone"
        onChange={handleСustomerChange}
        placeholder="Телефон"
      />
      <button>{isLoading ? "Загрузка..." : "Добавить"}</button>
    </form>
  );
};

// const handleСustomerChange = event => {
//       const {name, value} = event.target
//       setFormData(({ customer }) => ({
//         customer: {
//               ...customer,
//               [name]: value
//           }}) )}

// const handleChange = e => {
//   const { name, value } = e.target;
//   if (name === 'email' || name === 'customerName') {
//     setFormData(({ customer }) => ({
//       customer: {
//             ...customer,
//             [name]: value
//         }}) );
//   } else {
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,

//     }));
// };
