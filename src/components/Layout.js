import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout({onSearch}) {
  return (
    <div>
      <Header onSearch={onSearch}/>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
