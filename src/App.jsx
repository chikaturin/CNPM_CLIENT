import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Nav-Head/Header";
import Nav from "./Nav-Head/Nav";

const App = () => {
  const [showNav, setShowNav] = React.useState(true);

  return (
    <div className="h-full w-full">
      <Header setShowNav={setShowNav} />
      <div className="flex">
        {showNav && <Nav />}
        <div className="flex-1">
          <Outlet /> {/* Đây là nơi các route con sẽ được hiển thị */}
        </div>
      </div>
    </div>
  );
};

export default App;
