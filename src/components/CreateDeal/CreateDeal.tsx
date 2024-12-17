import "./CreateDeal.scss";
import { useState, FormEvent, ChangeEvent } from "react";
import { v4 as uuid } from "uuid";
import { DB } from "../../../utils/appwrite";
import { COLLECTION_DEALS, DB_ID } from "../../../utils/app.constants";
// import { useNavigate } from "react-router-dom";
import {
  validateContactPerson,
  validateCustomerName,
  validateEmail,
  validateTel,
  validateWorkName,
} from "../../service/validate";

type TypeProps = {
  columnId: string;
  setStatus: (status: string) => void;
};

export const CreateDeal = ({ columnId, setStatus }: TypeProps) => {
  // const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  //Уходящие все поля протипизировал иначе БД не будет принимать
  //Важно полное сооотвие вложенности приходящего объекта с appwrite и отправляемого!
  //customerName вложен в customer(сам appwrite формирует такой объект)
  type TypeDeal = {
    workName: string;
    price: number;
    customer: {
      customerName: string;
      contact_person: string;
      email: string;
      phone: string;
    };
    status: string;
  };

  //initialState для отправки формы создания сделки
  //Пробрасываю columnId статус колонки из newBoard через все компоненты, теперь каждой форме свой статус
  const initialState = {
    workName: "",
    price: 0,
    customer: {
      customerName: "",
      contact_person: "",
      email: "",
      phone: "",
    },
    status: columnId,
  };

  const [formData, setFormData] = useState<TypeDeal>({ ...initialState });
  // console.log(formData);
  //Записываю в price: все значения в преобразованном числовом типе
  formData.price = +formData?.price;

  // Функция для очистки формы после отправки
  function resetForm() {
    Object.assign(formData, initialState);
  }

  //Стейты для валидации
  const [workNameError, setWorkNameError] = useState("");
  const [customerNameError, setCustomerNameError] = useState("");
  const [contactPersonError, setContactPersonError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telError, setTelError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "workName" && value !== " ") {
      validateWorkName(value, setWorkNameError);
    }
  };
  //тк в объекте есть вложенный объект то для него сделал отдельную функцию handleСustomerChange
  //и обязательно разворачиваю сначала весь state ...prev а уже внутри него снова разворачиваю ...prev.customer
  const handleСustomerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      customer: { ...prev.customer, [name]: value },
    }));

    if (name === "customerName" && value !== " ") {
      validateCustomerName(value, setCustomerNameError);
    }
    if (name === "contact_person" && value !== " ") {
      validateContactPerson(value, setContactPersonError);
    }
    if (name === "email" && value !== " ") {
      validateEmail(value, setEmailError);
    }
    if (name === "phone" && value !== " ") {
      validateTel(value, setTelError);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // uuid()- генерирует уникальный id, обязательное требование на appwrite
    //передаю только одну коллекцию, а связанную с ней другую ненадо передавать COLLECTION_CUSTOMERS...
    const createDeal = async () => {
      setIsLoading(true);
      try {
        const response = await DB.createDocument(
          DB_ID,
          COLLECTION_DEALS,
          uuid(),
          formData
        );
        console.log(response);
        const dataDeal = response as unknown as string; //чтоб не ругался TypeScript
        setStatus(dataDeal);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        // navigate("/");
        // location.reload();
        resetForm();
      }
    };
    createDeal();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="show_form">
      {workNameError && workNameError}
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
      {customerNameError && customerNameError}
      <input
        type="text"
        value={formData.customer.customerName}
        name="customerName"
        onChange={handleСustomerChange}
        // onChange={handleChange}
        placeholder="Клиент"
      />
      {contactPersonError && contactPersonError}
      <input
        type="text"
        value={formData.customer.contact_person}
        name="contact_person"
        onChange={handleСustomerChange}
        placeholder="Контактное лицо"
      />
      {emailError && emailError}
      <input
        type="email"
        value={formData.customer.email}
        name="email"
        onChange={handleСustomerChange}
        // onChange={handleChange}
        placeholder="Email"
      />
      {telError && telError}
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

// //Пробрасываю columnId статус колонки из newBoard через все компоненты, теперь каждой форме свой статус
// const [formData, setFormData] = useState<TypeDeal>({
//   workName: "",
//   price: 0,
//   customer: {
//     customerName: "",
//     contact_person: "",
//     email: "",
//     phone: "",
//   },
//   status: columnId,
// });
// // console.log(formData);
// //Записываю в price: все значения в преобразованном числовом типе
// formData.price = +formData?.price;
