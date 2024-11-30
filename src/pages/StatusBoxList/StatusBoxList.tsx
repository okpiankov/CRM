import { useState } from "react";
import { StatusBox } from "../../components/StatusBox/StatusBox";
import { DealInfo } from "../../components/DealInfo/DealInfo";

export const StatusBoxList = () => {
  const statusName = [
    { name: "Входящие" },
    { name: "На согласовании" },
    { name: "В работе" },
    { name: "Произведено" },
  ];

  const [drawerMenu, setDrawerMenu] = useState(false);

  return (
    //И не надо  через <Outlet /> пробрасывать состояние drawerMenu
    //тк <DealInfo/> решил импортировать в StatusBoxList  ниже по вложенности уже внутри <Outlet />
    <>
      {drawerMenu && (
        <DealInfo drawerMenu={drawerMenu} setDrawerMenu={setDrawerMenu} />
      )}
      <section>
        {statusName.map((item) => (
          <StatusBox name={item.name} setDrawerMenu={setDrawerMenu} />
        ))}
        {/* <StatusBox setDrawerMenu={setDrawerMenu}/> */}
      </section>
    </>
  );
};
