import { LeftMenu } from "../components/LeftMenu/LeftMenu";
import "./MainPage.scss";
import { Outlet } from "react-router-dom";

export const MainPage = () => {

  return (
    <div className="container">
      <LeftMenu />
      <section>
        <Outlet />
      </section>
    </div>
  );
};
