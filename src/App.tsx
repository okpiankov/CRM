import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
// import { createContext, useState } from "react";

function App() {
  return <RouterProvider router={router} />;
}

export default App;






// // Передача id сделки и статуса через react useContext
// // export const ContextDeal = createContext({
// //   id: "",
// //   status: "",
// //   actually_paid: 0,
// //   getContextDeal: () => {},
// // });
// //Для экспорта createContext вынес выше App()
// export const ContextDeal = createContext({});

// function App() {
//   const [cardId, setCardId] = useState("");
//   const [columnName, setColumnName] = useState("");
//   const [paid, setPaid] = useState(0);

//   // getContextDeal передаю в самый низовой  компонент через контекст
//   //для того чтобы через эту функцию отловить и передать контекст снизу вверх
//   const getContextDeal = ( id: string, status: string, actually_paid: number) => {
//     setCardId(id);
//     setColumnName(status);
//     setPaid(actually_paid);
//   };
//   const value = {
//     cardId: cardId,
//     columnName: columnName,
//     actually_paid: paid,
//     getContextDeal: getContextDeal,
//   };

//   return (
//     <ContextDeal.Provider value={value}>
//       <RouterProvider router={router} />
//     </ContextDeal.Provider>
//   );
// }

// export default App;
