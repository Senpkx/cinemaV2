import { Suspense, type FC } from "react";
import { Sidebar } from "./sidebar/sidebar";
import { Header } from "./header/header";
import style from "./layout.module.scss";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.sidebar}>
          <Sidebar />
        </div>
        <div className={style.content}>
          <Suspense fallback={<>loading....</>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Layout;
