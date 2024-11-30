import { useState } from "react";
import { StatusPayBox } from "../../components/StatusPayBox/StatusPayBox";
import './PayList.scss'
import { PayInfo } from "../../components/PayInfo/PayInfo";


export const PayList = () => {
    const statusName = [
        // { name: "Подготовка документов" },
        { name: "Счет на оплате" },
        { name: "Аванс" },
        { name: "Оплата с отсрочкой" },
        { name: "Оплачено" },
      ];
    
      const [drawerMenu, setDrawerMenu] = useState(false);
    
      return (
        //И не надо  через <Outlet /> пробрасывать состояние drawerMenu
        //тк <DealInfo/> решил импортировать в StatusBoxList  ниже по вложенности уже внутри <Outlet />
        <>
          {drawerMenu && (
            <PayInfo drawerMenu={drawerMenu} setDrawerMenu={setDrawerMenu} />
          )}
          <section>
            {statusName.map((item) => (
              <StatusPayBox name={item.name} setDrawerMenu={setDrawerMenu} />
            ))}
            {/* <StatusBox setDrawerMenu={setDrawerMenu}/> */}
          </section>
        </>
      );
    };
    