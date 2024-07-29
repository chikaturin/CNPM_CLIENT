import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import BookingCar from "../Customer/Booking/BookingCar.jsx";
import Customer from "../Customer.jsx";
import MainHome from "../Customer/home/MainHome.jsx";
import ListMain from "../Customer/listBooking/ListMain.jsx";
import BookingBus from "../Customer/Booking/BookingBus.jsx";
import BookingTrain from "../Customer/Booking/BookingTrain.jsx";
import Login from "../SingUp_Login/LogIn.jsx";
import SignUp from "../SingUp_Login/SignUp.jsx";
import ErrorPage from "./ErrorPage.jsx";

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
    ],
  },
]);

export default router;
