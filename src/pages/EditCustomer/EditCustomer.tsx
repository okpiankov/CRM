import "./EditCustomer.scss";
import { DB } from "../../../utils/appwrite";
import {
  COLLECTION_CUSTOMERS,
  DB_ID,
} from "../../../utils/app.constants";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditCustomer = () => {
  const [isLoading, setIsLoading] = useState(false);

//Получаю id из url и передаю его в функцию updateCustomer
  const { id } = useParams();
// console.log(id);

  type TypeCustomer = {
    email: string;
    customerName: string;
    contact_person: string;
    phone: string;
    from_source: string;
  };

  //Исключение пустых полей формы перед отправкой???

  const [formData, setFormData] = useState<TypeCustomer>({
    email: "",
    customerName: "",
    contact_person: "",
    phone: "",
    from_source: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  // const customer_id = "675c86b002c40109885d"; 

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updateCustomer = async () => {
      setIsLoading(true);
      try {
        const data = await DB.updateDocument(
          DB_ID,
          COLLECTION_CUSTOMERS,
          id,
          {
            email: formData.email,
            customerName: formData.customerName,
            contact_person: formData.contact_person,
            phone: formData.phone,
            from_source: formData.from_source,
          }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        // location.reload();
        navigate("/customersList");
      }
    };
    updateCustomer();
  };

  return (
    <div className="wrapper">
      <span>Редактирование клиента</span>
      <form className="formEditCustomer" onSubmit={handleSubmit} noValidate >
        <input
          className="inputEditCustomer"
          type="text"
          value={formData.customerName}
          name="customerName"
          onChange={handleChange}
          placeholder="Наименование клиента"
        />
        <input
          className="inputEditCustomer"
          type="text"
          value={formData.contact_person}
          name="contact_person"
          onChange={handleChange}
          placeholder="Контактное лицо"
        />
        <input
          className="inputEditCustomer"
          type="text"
          value={formData.phone}
          name="phone"
          onChange={handleChange}
          placeholder="Номер телефона"
        />
        <input
          className="inputEditCustomer"
          type="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="inputEditCustomer"
          type="text"
          value={formData.from_source}
          name="from_source"
          onChange={handleChange}
          placeholder="Откуда пришел"
        />
        <button className="buttonEditCustomer">Сохранить</button>
      </form>
    </div>
  );
};
