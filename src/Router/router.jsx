import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import BookingCar from "../Customer/Booking/BookingCar.jsx";
import Customer from "../Customer.jsx";
import MainHome from "../Customer/home/MainHome.jsx";
import ListMain from "../Customer/listBooking/ListMain.jsx";
import BookingBus from "../Customer/Booking/BookingBus.jsx";
import BookingTrain from "../Customer/Booking/BookingTrain.jsx";

import DatChoCuaToi from "../Customer/CustomerBooking/DatChoCuaToi";
import LichSuDatCho from "../Customer/CustomerBooking/LichSuDatCho";
import ErrorPage from "./ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainHome />,
      },
      {
        path: "Customer",
        element: <Customer />,
      },
      {
        path: "BookingCar",
        element: <BookingCar />,
      },
      {
        path: "MainHome",
        element: <App />,
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
        path: "MyBooking",
        element: <DatChoCuaToi />,
      },
      {
        path: "MyBooking/MyHistoryBooking",
        element: <LichSuDatCho />,
      },
    ],
  },
]);

export default router;
