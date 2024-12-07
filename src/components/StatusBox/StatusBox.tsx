import "./StatusBox.scss";
import { CirclePlus, ArrowUp } from "lucide-react";
import { CustomerCard } from "../CustomerCard/CustomerCard";
import { useState } from "react";
import { CreateDeal } from "../CreateDeal/CreateDeal";

export const StatusBox = ({ setDrawerMenu, columnName, columnItems, columnId }) => {
  const [addCard, setAddCard] = useState(false);

  return (
    <div className="statusBox">
      <div className="status">{columnName}</div>
      <div className="addCard">
        {addCard === false ? (
          <CirclePlus onClick={() => setAddCard(true)} className="plus" />
        ) : (
          <ArrowUp onClick={() => setAddCard(false)} className="arrow" />
        )}
      </div>
      {addCard && <CreateDeal columnId={columnId} />}
      {columnItems.map((item) => (
        <CustomerCard
          key={item.id}
          workName={item.workName}
          companyName={item.companyName}
          price={item.price}
          setDrawerMenu={setDrawerMenu}
        />
      ))}
      {/* <CustomerCard setDrawerMenu={setDrawerMenu} /> */}
    </div>
  );
};
