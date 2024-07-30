// router.js
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import BookingCar from "../Customer/Booking/BookingCar.jsx";
import MainHome from "../Customer/home/MainHome.jsx";
import ListMain from "../Customer/listBooking/ListMain.jsx";
import BookingBus from "../Customer/Booking/BookingBus.jsx";
import BookingTrain from "../Customer/Booking/BookingTrain.jsx";
import Login from "../SingUp_Login/LogIn.jsx";
import SignUp from "../SingUp_Login/SignUp.jsx";
import ErrorPage from "./ErrorPage.jsx";
import DatChoCuaToi from "../Customer/DatChoCuaToi/DatChoCuaToi.jsx";
import LichSuDatCho from "../Customer/DatChoCuaToi/LichSuDatCho.jsx";
import CancelTicket from "../Customer/Cancel/CancelTicket.jsx";
import CancelTicketTau from "../Customer/Cancel/CancelTicketTau.jsx";
import CancelTicketBus from "../Customer/Cancel/CancelTicketBus.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "SignUp",
        element: <SignUp />,
      },
      {
        path: "MainHome",
        element: <MainHome />,
      },
      {
        path: "BookingCar",
        element: <BookingCar />,
      },
      {
        path: "ListMain",
        element: <ListMain />,
      },
      {
        path: "BookingBus",
        element: <BookingBus />,
      },
      {
        path: "BookingTrain",
        element: <BookingTrain />,
      },
      {
        path: "/my-booking",
        element: <DatChoCuaToi />,
      },
      {
        path: "/my-booking/history-booking",
        element: <LichSuDatCho />,
      },
      {
        path: "CancelTicketBus",
        element: <CancelTicketBus />,
      },
      {
        path: "CancelTicketTau",
        element: <CancelTicketTau />,
      },
      {
        path: "CancelTicket",
        element: <CancelTicket />,
      },
    ],
  },
]);

export default router;
