import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import DanhSachSanBay from "../AdminPage/ListSanBay/DanhSachSanBay.jsx";
import CreateDanhSachSanBay from "../AdminPage/ListSanBay/CreateDanhSachSanBay.jsx";
import DanhSachTuyenXe from "../AdminPage/TuyenXe/DanhSachTuyenXe.jsx";
import CreateTuyenXe from "../AdminPage/TuyenXe/CreateTuyenXe.jsx";
import PhuongTien from "../AdminPage/PhuongTien/DanhSachPhuongTien.jsx";
import CreatePhuongTien from "../AdminPage/PhuongTien/CreatePhuongTien.jsx";
import DanhSachTramDung from "../AdminPage/TramDung/DanhSachTramDung.jsx";
import CreateTramDung from "../AdminPage/TramDung/CreateTramDung.jsx";
import ListDetailCar from "../AdminPage/DetailCar/ListDetailCar.jsx";
import CreateDetailCar from "../AdminPage/DetailCar/CreateDetailCar.jsx";
import GetDetailCar from "../AdminPage/DetailCar/GetDetailCar.jsx";
import EditDetailCar from "../AdminPage/DetailCar/UpdateDetail.jsx";
import BookingCar from "../Customer/BookingCar.jsx";
import Customer from "../Customer.jsx";
import Admin from "../Admin.jsx";
import MainHome from "../Customer/home/MainHome.jsx";
import ListBooking from "../Customer/listBooking/ListBooking.jsx";
import ErrorPage from "./ErrorPage.jsx";
import DatChoCuaToi from "../Customer/DatChoCuaToi/DatChoCuaToi.jsx";
import LichSuDatCho from "../Customer/DatChoCuaToi/LichSuDatCho.jsx";
import CancelTicket from "../Customer/CancelTicket.jsx";
import CancelTicketTau from "../Customer/CancelTicketTau.jsx";
import CancelTicketBus from "../Customer/CancelTicketBus.jsx";

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
        path: "admin",
        element: <Admin />,
      },
      {
        path: "DanhSachSanBay",
        element: <DanhSachSanBay />,
      },
      {
        path: "CreateDanhSachSanBay",
        element: <CreateDanhSachSanBay />,
      },
      {
        path: "DanhSachTuyenXe",
        element: <DanhSachTuyenXe />,
      },
      {
        path: "CreateTuyenXe",
        element: <CreateTuyenXe />,
      },
      {
        path: "PhuongTien",
        element: <PhuongTien />,
      },
      {
        path: "CreatePhuongTien",
        element: <CreatePhuongTien />,
      },
      {
        path: "DanhSachTramDung",
        element: <DanhSachTramDung />,
      },
      {
        path: "CreateTramDung",
        element: <CreateTramDung />,
      },
      {
        path: "ListDetailCar",
        element: <ListDetailCar />,
      },
      {
        path: "CreateDetailCar",
        element: <CreateDetailCar />,
      },
      {
        path: "GetDetailCar/:id",
        element: <GetDetailCar />,
      },
      {
        path: "EditDetailCar/:id",
        element: <EditDetailCar />,
      },
      {
        path: "BookingCar",
        element: <BookingCar />,
      },
      {
        path: "MainHome",
        element: <MainHome />,
      },
      {
        path: "ListBooking",
        element: <ListBooking />,
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
        path: "CancelTicket",
        element: <CancelTicket />,
      },
      {
        path: "CancelTicketTau",
        element: <CancelTicketTau />,
      },
      {
        path: "CancelTicketBus",
        element: <CancelTicketBus />,
      },
    ],
  },
]);

export default router;
