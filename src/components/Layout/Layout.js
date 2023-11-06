import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import SideNavBar from "../../containers/SideNavBar/SideNavBar";
import CommunitesPosts from "../../containers/CommunitesPosts/CommunitesPosts";

function Layout({ onSearch }) {
  return (
    <div>
      <Header onSearch={onSearch} />
      <SideNavBar onClick={onSearch} />
      <CommunitesPosts onClick={onSearch} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
