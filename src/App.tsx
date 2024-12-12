import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
// import { ContextDealID } from "./context";
import { createContext, useState } from "react";

// export const ContextDeal = createContext({
//   id: "",
//   status: "",
//   getContextDeal: () => {},
// });
//Для экспорта createContext вынес выше App() 
export const ContextDeal = createContext({});

function App() {
  const [cardId, setCardId] = useState("");
  const [columnName, setColumnName] = useState("");

  // getContextDeal передаю в самый низовой  компонент через контекст
  //для того чтобы через эту функцию отловить и передать контекст снизу вверх
  const getContextDeal = ( id: string, status: string) => {
    setCardId(id);
    setColumnName(status);
  };
  const value = {
    cardId: cardId,
    columnName: columnName,
    getContextDeal: getContextDeal,
  };

  return (
    <ContextDeal.Provider value={value}>
      <RouterProvider router={router} />
    </ContextDeal.Provider>
  );
}

export default App;
