import { createContext, ReactNode, useState } from 'react';


export const ContextDeal = createContext(null);

export const ContextDealID = ({ children, companyName, cardId }) => {
 

  return (
    <ContextDeal.Provider value={{ companyName, cardId }}>
      {children}
    </ContextDeal.Provider>
  );
};
