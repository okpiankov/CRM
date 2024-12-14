import "./EditOrder.scss";
import { DB } from "../../../utils/appwrite";
import { COLLECTION_DEALS, DB_ID } from "../../../utils/app.constants";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditOrder = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  //const deal_id = "2d68b99d-f10f-46e4-bd52-fc4cae25a1de";
  //Получаю id из url и передаю его в функцию updateCustomer
  const { id } = useParams();
  // console.log(id);

  type TypeDeal = {
    workName: string;
    price: number;
    // finish_date: string;
  };

  const [formData, setFormData] = useState<TypeDeal>({
    workName: "",
    price: 0,
    // finish_date: "",
  });
  //Записываю в price: все значения в преобразованном числовом типе
  formData.price = +formData?.price;
  // console.log(formData.finish_date)

  //Запрос для получения данных по клиенту для начального состояния формы редактирования клиента
  useEffect(() => {
    const getOrder = async () => {
      setIsLoading(true);
      try {
        const data = await DB.getDocument(DB_ID, COLLECTION_DEALS, id);
        console.log(data);
        const dataDeal = data as unknown as TypeDeal; //чтоб не ругался TypeScript
        setFormData(dataDeal);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getOrder();
  }, []);

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

    const updateDeal = async () => {
      setIsLoading(true);
      try {
        const data = await DB.updateDocument(DB_ID, COLLECTION_DEALS, id, {
          workName: formData.workName,
          price: formData.price,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        // location.reload();
        navigate("/ordersList");
      }
    };
    updateDeal();
  };

  //Запрос на удаление заказа
  const deleteOrder = async () => {
    setIsLoading(true);
    try {
      const data = await DB.deleteDocument(DB_ID, COLLECTION_DEALS, id);
      console.log(data);
      // const dataDeal = data as unknown as TypeDeal; //чтоб не ругался TypeScript
      // setFormData(dataDeal);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      navigate("/ordersList");
    }
  };

  return (
    <div className="wrapper">
      <span>Редактирование заказа</span>
      <form onSubmit={handleSubmit} noValidate>
        {/* <input type="text" placeholder="Наименование клиента" /> */}

        <input
          type="text"
          value={formData.workName}
          name="workName"
          onChange={handleChange}
          placeholder="Наименование работ"
        />
        <div className="lableOrder">Сумма сделки:</div>
        <input // type="number"
          onFocus={(event) => (event.target.type = "number")}
          value={formData.price}
          name="price"
          onChange={handleChange}
          placeholder="Сумма сделки"
          min="1"
          step="1"
        />
        {/* <input
          type="date"
          value={formData.finish_date}
          name="finish_date"
          onChange={handleChange}
          placeholder="Дата завершения работ"
        /> */}
        <button className="buttonEditOrder">
          {isLoading ? "Сохраняю..." : "Сохранить"}
        </button>
        <button onClick={deleteOrder} className="buttonEditOrder buttonDelete">
          {isLoading ? "Удаление..." : "Удалить заказ"}
        </button>
      </form>
    </div>
  );
};
