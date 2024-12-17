import "./EditCustomer.scss";
import { DB } from "../../../utils/appwrite";
import { COLLECTION_CUSTOMERS, DB_ID } from "../../../utils/app.constants";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { emailRegex, nameRegexp, telRegexp } from "../../service/validate";
import { SubmitHandler, useForm } from "react-hook-form";

export const EditCustomer = () => {
  const [isLoading, setIsLoading] = useState(false);

  //Получаю id из url и передаю его в функцию updateCustomer
  const { id } = useParams();
  // console.log(id);

  type TypeCustomer = {
    customerName: string;
    contact_person: string;
    email: string;
    phone: string;
    from_source: string;
  };

  //Через register подключаюсь к инпутам, не надо указывать value onChange={handleChange} name, что-то похожее как у vue v-model
  //defaultValues -начальное состояние, reset для получения данных из запроса для defaultValues
  // mode: "onChange" - чтобы ошибка валидации отображалась до отправки формы, formState для работы с ошибками при валидации
  const { register, handleSubmit, reset, formState } = useForm<TypeCustomer>({
    mode: "onChange",
    defaultValues: {
      customerName: "",
      contact_person: "",
      email: "",
      phone: "",
      from_source: "",
    },
  });

  //Ошибки работы с валидацией
  const contactPersonError = formState.errors["contact_person"]?.message;
  const customerNameError = formState.errors["customerName"]?.message;
  const fromSourceError = formState.errors["from_source"]?.message;
  const emailError = formState.errors["email"]?.message;
  const tellError = formState.errors["phone"]?.message;

  //Запрос для получения данных по клиенту для начального состояния формы редактирования клиента
  useEffect(() => {
    const getCustomer = async () => {
      setIsLoading(true);
      try {
        if (!id) return;
        const data = await DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, id);
        // console.log(data);
        const dataCustomer = data as unknown as TypeCustomer; //чтоб не ругался TypeScript
        reset(dataCustomer);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getCustomer();
  }, [id, reset]);

  const navigate = useNavigate();
  // const customer_id = "675c86b002c40109885d";

  const onSubmit: SubmitHandler<TypeCustomer> = (data) => {
    // console.log(data);
    //Запрос на обновление данных клиента
    const updateCustomer = async () => {
      setIsLoading(true);
      try {
        if (!id) return;
        const res = await DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, id, {
          email: data.email,
          customerName: data.customerName,
          contact_person: data.contact_person,
          phone: data.phone,
          from_source: data.from_source,
        });
        console.log(res);
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

  //Запрос на удаление клиента
  const deleteCustomer = async () => {
    setIsLoading(true);
    try {
      if (!id) return;
      const data = await DB.deleteDocument(DB_ID, COLLECTION_CUSTOMERS, id);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      navigate("/customersList");
    }
  };

  return (
    <div className="wrapper">
      <span>Редактирование клиента</span>
      <form
        className="formEditCustomer"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* в инпутах не надо указывать value onChange={handleChange} name */}
        {customerNameError && customerNameError}
        <input
          className="inputEditCustomer"
          type="text"
          placeholder="Наименование клиента"
          {...register("customerName", {
            pattern: {
              value: nameRegexp,
              message: "Некорректное имя",
            },
          })}
        />

        {contactPersonError && contactPersonError}
        <input
          className="inputEditCustomer"
          type="text"
          placeholder="Контактное лицо"
          {...register("contact_person", {
            pattern: {
              value: nameRegexp,
              message: "Некорректное имя",
            },
          })}
        />
        {tellError && tellError}
        <input
          className="inputEditCustomer"
          type="text"
          placeholder="Номер телефона"
          {...register("phone", {
            pattern: {
              value: telRegexp,
              message: "Некорректный телефон",
            },
          })}
        />
        {emailError && emailError}
        <input
          className="inputEditCustomer"
          type="email"
          placeholder="Email"
          {...register("email", {
            pattern: {
              value: emailRegex,
              message: "Некорректный email",
            },
          })}
        />
        {fromSourceError && fromSourceError}
        <input
          className="inputEditCustomer"
          type="text"
          placeholder="Откуда пришел"
          {...register("from_source", {
            pattern: {
              value: nameRegexp,
              message: "Некорректные символы ",
            },
          })}
        />
        <button className="buttonEditCustomer">
          {isLoading ? "Сохраняю..." : "Сохранить"}
        </button>
        <button
          onClick={deleteCustomer}
          className="buttonEditCustomer buttonDelete"
        >
          {isLoading ? "Удаление..." : "Удалить клиента"}
        </button>
      </form>
    </div>
  );
};

// //Без react-hook-form
// import "./EditCustomer.scss";
// import { DB } from "../../../utils/appwrite";
// import { COLLECTION_CUSTOMERS, DB_ID } from "../../../utils/app.constants";
// import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   validateContactPerson,
//   validateCustomerName,
//   validateEmail,
//   validateFromSource,
//   validateTel,
// } from "../../service/validate";

// export const EditCustomer = () => {
//   const [isLoading, setIsLoading] = useState(false);

//   //Получаю id из url и передаю его в функцию updateCustomer
//   const { id } = useParams();
//   // console.log(id);

//   type TypeCustomer = {
//     customerName: string;
//     contact_person: string;
//     email: string;
//     phone: string;
//     from_source: string;
//   };

//   const [formData, setFormData] = useState<TypeCustomer>({
//     customerName: "",
//     contact_person: "",
//     email: "",
//     phone: "",
//     from_source: "",
//   });

//   //Стейты для валидации
//   const [customerNameError, setCustomerNameError] = useState("");
//   const [contactPersonError, setContactPersonError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [telError, setTelError] = useState("");
//   const [fromSourceError, setFromSourceError] = useState("");

//   //Запрос для получения данных по клиенту для начального состояния формы редактирования клиента
//   useEffect(() => {
//     const getCustomer = async () => {
//       setIsLoading(true);
//       try {
//         if (!id) return;
//         const data = await DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, id);
//         console.log(data);
//         const dataCustomer = data as unknown as TypeCustomer; //чтоб не ругался TypeScript
//         setFormData(dataCustomer);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     getCustomer();
//   }, [id]);

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     // console.log(event.target.value);
//     const { name, value } = event.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));

//     if (name === "customerName" && value !== " ") {
//       validateCustomerName(value, setCustomerNameError);
//     }
//     if (name === "contact_person" && value !== " ") {
//       validateContactPerson(value, setContactPersonError);
//     }
//     if (name === "email" && value !== " ") {
//       validateEmail(value, setEmailError);
//     }
//     if (name === "phone" && value !== " ") {
//       validateTel(value, setTelError);
//     }
//     if (name === "from_source" && value !== " ") {
//       validateFromSource(value, setFromSourceError);
//     }
//   };
//   const navigate = useNavigate();
//   // const customer_id = "675c86b002c40109885d";

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     //Запрос на обновление данных клиента
//     const updateCustomer = async () => {
//       setIsLoading(true);
//       try {
//         if (!id) return;
//         const data = await DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, id, {
//           email: formData.email,
//           customerName: formData.customerName,
//           contact_person: formData.contact_person,
//           phone: formData.phone,
//           from_source: formData.from_source,
//         });
//         console.log(data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setIsLoading(false);
//         // location.reload();
//         navigate("/customersList");
//       }
//     };
//     updateCustomer();
//   };

//   //Запрос на удаление клиента
//   const deleteCustomer = async () => {
//     setIsLoading(true);
//     try {
//       if (!id) return;
//       const data = await DB.deleteDocument(DB_ID, COLLECTION_CUSTOMERS, id);
//       console.log(data);
//       const dataCustomer = data as unknown as TypeCustomer; //чтоб не ругался TypeScript
//       setFormData(dataCustomer);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//       navigate("/customersList");
//     }
//   };

//   return (
//     <div className="wrapper">
//       <span>Редактирование клиента</span>
//       <form className="formEditCustomer" onSubmit={handleSubmit} noValidate>
//         {customerNameError && customerNameError}
//         <input
//           className="inputEditCustomer"
//           type="text"
//           value={formData.customerName}
//           name="customerName"
//           onChange={handleChange}
//           placeholder="Наименование клиента"
//         />
//         {contactPersonError && contactPersonError}
//         <input
//           className="inputEditCustomer"
//           type="text"
//           value={formData.contact_person}
//           name="contact_person"
//           onChange={handleChange}
//           placeholder="Контактное лицо"
//         />
//         {telError && telError}
//         <input
//           className="inputEditCustomer"
//           type="text"
//           value={formData.phone}
//           name="phone"
//           onChange={handleChange}
//           placeholder="Номер телефона"
//         />
//         {emailError && emailError}
//         <input
//           className="inputEditCustomer"
//           type="email"
//           value={formData.email}
//           name="email"
//           onChange={handleChange}
//           placeholder="Email"
//         />
//         {fromSourceError && fromSourceError}
//         <input
//           className="inputEditCustomer"
//           type="text"
//           value={formData.from_source}
//           name="from_source"
//           onChange={handleChange}
//           placeholder="Откуда пришел"
//         />
//         <button className="buttonEditCustomer">
//           {isLoading ? "Сохраняю..." : "Сохранить"}
//         </button>
//         <button
//           onClick={deleteCustomer}
//           className="buttonEditCustomer buttonDelete"
//         >
//           {isLoading ? "Удаление..." : "Удалить клиента"}
//         </button>
//       </form>
//     </div>
//   );
// };
