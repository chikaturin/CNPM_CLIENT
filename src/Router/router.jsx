import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import BookingCar from "../Customer/Booking/BookingCar.jsx";
import Customer from "../Customer.jsx";
import MainHome from "../Customer/home/MainHome.jsx";
import ListMain from "../Customer/listBooking/ListMain.jsx";
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
    ],
  },
]);

export default router;
