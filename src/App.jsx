import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Customer/header/Header";

const App = () => {
  const location = useLocation();
  const isBookingCar = location.pathname === "/BookingCar";

  return (
    <div>
      {isBookingCar ? (
        <div className="w-full h-screen bg-opacity-20 flex justify-center bg-slate-400">
          <div className="w-2/3 h-2/3 translate-y-1/4 bg-white rounded-md">
            <Outlet />
          </div>
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </div>
  );
};

export default App;
