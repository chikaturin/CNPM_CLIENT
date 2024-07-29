  import React from "react";
  import { Outlet, useLocation } from "react-router-dom";
  import Header from "./Customer/header/Header";
  import Footer from "./Customer/footer/Footer";
  const App = () => {
    const location = useLocation();
    const isBookingCar = location.pathname === "/BookingCar";
    const isCancelTicketCar = location.pathname === "/CancelTicket";
    const isCancelTicketTrain = location.pathname === "/CancelTicketTau";
    const isCancelTicketBus = location.pathname === "/CancelTicketBus";

    return (
      <div className="bg-[#F2F3F3]">
        {(isBookingCar  || isCancelTicketCar || isCancelTicketTrain || isCancelTicketBus)?  (
          <div>
            <Header />
            <div className="w-full h-screen bg-opacity-20 flex justify-center bg-slate-400">
              <div className="w-3/4 h-3/4 translate-y-1/4 bg-white rounded-md">
                <Outlet />
              </div>
            </div>
          </div>
        ) : (
          <>
            <Header />
            <Outlet />
            <Footer />
          </>
        )}
      </div>
    );
  };

  export default App;
