import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideNavBar from "./SideNavBar";
import CommunitesPosts from "./CommunitesPosts";

function Layout({ onSearch }) {
  return (
    <div>
      <Header onSearch={onSearch} />
      <SideNavBar onClick={onSearch} />
      <CommunitesPosts onClick={onSearch}/>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
