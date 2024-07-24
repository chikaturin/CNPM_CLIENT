import React from "react";
import Header from "./Nav-Head/Header";
import Nav from "./Nav-Head/Nav";
import { Outlet } from "react-router-dom";

const Admin = () => {
  const [showNav, setShowNav] = React.useState(true);

  return (
    <div className="h-screen flex flex-col">
      <Header setShowNav={setShowNav} />
      <div className="flex flex-1">
        {showNav && <Nav />}
        <main className={`flex-1 ${showNav ? "ml-64" : "ml-0"} transition-all`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;
